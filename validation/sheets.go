package validation

import (
	"context"
	"fmt"
	"time"

	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

const sheetName = "Verification of API Endpoints - Combined"

func sheetRange(r string) string {
	return fmt.Sprintf("'%s'!%s", sheetName, r)
}

func ensureSheetExists(ctx context.Context, srv *sheets.Service, sheetID string) error {
	ss, err := srv.Spreadsheets.Get(sheetID).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("get spreadsheet: %w", err)
	}
	for _, sh := range ss.Sheets {
		if sh != nil && sh.Properties != nil && sh.Properties.Title == sheetName {
			return nil
		}
	}
	_, err = srv.Spreadsheets.BatchUpdate(sheetID, &sheets.BatchUpdateSpreadsheetRequest{
		Requests: []*sheets.Request{
			{
				AddSheet: &sheets.AddSheetRequest{
					Properties: &sheets.SheetProperties{Title: sheetName},
				},
			},
		},
	}).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("create sheet %q: %w", sheetName, err)
	}
	return nil
}

type auditedColumn struct {
	name string
	get  func(ConsumerAuditRow) string
}

// auditedColumns is the ordered set of cells whose change between two runs
// causes the row to be marked StateChanged. Notes and Change Log are
// derived/metadata and never trigger reconciliation.
var auditedColumns = []auditedColumn{
	{name: "Endpoint Status", get: func(r ConsumerAuditRow) string { return r.EndpointStatus }},
	{name: "x-annotated", get: func(r ConsumerAuditRow) string { return r.XAnnotated }},
	{name: "Schema-Backed (Meshery)", get: func(r ConsumerAuditRow) string { return r.SchemaBackedMeshery }},
	{name: "Schema-Backed (Cloud)", get: func(r ConsumerAuditRow) string { return r.SchemaBackedCloud }},
	{name: "Schema-Driven (Meshery)", get: func(r ConsumerAuditRow) string { return r.SchemaDrivenMeshery }},
	{name: "Schema-Driven (Cloud)", get: func(r ConsumerAuditRow) string { return r.SchemaDrivenCloud }},
	{name: "Schema Completeness (Meshery)", get: func(r ConsumerAuditRow) string { return r.SchemaCompletenessMeshery }},
	{name: "Schema Completeness (Cloud)", get: func(r ConsumerAuditRow) string { return r.SchemaCompletenessCloud }},
}

// AuditedColumnValue returns the cell value of a reconciled column by its
// sheet-header name (e.g. "x-annotated"). Returns "" for an unknown column.
// The CLI uses it to render before/after diffs without duplicating the
// column list maintained here.
func AuditedColumnValue(row ConsumerAuditRow, columnName string) string {
	for _, c := range auditedColumns {
		if c.name == columnName {
			return c.get(row)
		}
	}
	return ""
}

// reconcileKey for reconciliation: (Endpoint, Method) per architecture §10.2.
type reconcileKey struct {
	Endpoint string
	Method   string
}

func keyOf(r ConsumerAuditRow) reconcileKey {
	return reconcileKey{Endpoint: r.Endpoint, Method: r.Method}
}

// reconcileOutput bundles the results of a reconcile pass: live rows
// that belong in the sheet body, and the updated deletion ledger.
type reconcileOutput struct {
	Tracked        []TrackedEndpoint
	DeletionLedger []DeletionRecord
	NewDeletions   []DeletionRecord
}

// reconcile compares the current audit rows against a previous serialized
// view from Google Sheets. It returns live tracked rows plus the updated
// deletion ledger (previous ledger + deletions detected on this run). It
// is pure logic — no I/O — so it is fully testable.
func reconcile(current []ConsumerAuditRow, previous [][]string) reconcileOutput {
	now := time.Now().UTC().Format("2006-01-02 15:04:05")

	prevRows, prevLedger := parseSheetRows(previous)
	prevByKey := make(map[reconcileKey]ConsumerAuditRow, len(prevRows))
	for _, r := range prevRows {
		prevByKey[keyOf(r)] = r
	}

	tracked := make([]TrackedEndpoint, 0, len(current))
	seen := make(map[reconcileKey]bool, len(current))

	for _, cur := range current {
		key := keyOf(cur)
		seen[key] = true
		prev, exists := prevByKey[key]
		if !exists {
			cur.ChangeLog = now
			cur.Metadata = RowMetadata{
				State:          "new",
				FirstSeen:      now,
				LastReconciled: now,
			}
			tracked = append(tracked, TrackedEndpoint{Row: cur, State: StateNew})
			continue
		}
		changed := changedColumns(prev, cur)
		firstSeen := prev.Metadata.FirstSeen
		if firstSeen == "" {
			firstSeen = now
		}
		if len(changed) == 0 {
			cur.ChangeLog = prev.ChangeLog
			cur.Metadata = RowMetadata{
				State:          "existing",
				ChangedColumns: prev.Metadata.ChangedColumns,
				FirstSeen:      firstSeen,
				LastReconciled: now,
			}
			tracked = append(tracked, TrackedEndpoint{Row: cur, State: StateExisting})
			continue
		}
		cur.ChangeLog = now
		cur.Metadata = RowMetadata{
			State:          "changed",
			ChangedColumns: changed,
			FirstSeen:      firstSeen,
			LastReconciled: now,
		}
		prevCopy := prev
		tracked = append(tracked, TrackedEndpoint{Row: cur, State: StateChanged, Prev: &prevCopy})
	}

	ledger := append([]DeletionRecord(nil), prevLedger...)
	var newDeletions []DeletionRecord
	for _, r := range prevRows {
		if seen[keyOf(r)] {
			continue
		}
		rec := DeletionRecord{
			Endpoint:      r.Endpoint,
			Method:        r.Method,
			RemovedAt:     now,
			LastChangeLog: r.ChangeLog,
		}
		ledger = append(ledger, rec)
		newDeletions = append(newDeletions, rec)
	}

	return reconcileOutput{
		Tracked:        tracked,
		DeletionLedger: ledger,
		NewDeletions:   newDeletions,
	}
}

// parseSheetRows accepts the raw [][]string we received from a sheet read.
// It returns the live rows and the deletion ledger stored in Z1. Legacy
// "-removed" tombstone rows are converted into ledger entries and dropped
// from the live set; legacy Change Log prefixes are normalized via
// rowFromStrings.
func parseSheetRows(rows [][]string) ([]ConsumerAuditRow, []DeletionRecord) {
	if len(rows) == 0 {
		return nil, nil
	}
	start := 0
	var ledger []DeletionRecord
	if len(rows[0]) > 0 && rows[0][0] == "Category" {
		start = 1
		if metadataColumnIndex < len(rows[0]) {
			ledger = decodeDeletionLedger(rows[0][metadataColumnIndex])
		}
	}
	out := make([]ConsumerAuditRow, 0, len(rows)-start)
	for _, r := range rows[start:] {
		if len(r) == 0 {
			continue
		}
		row := rowFromStrings(r)
		if isLegacyTombstone(row) {
			ledger = append(ledger, DeletionRecord{
				Endpoint:      row.Endpoint,
				Method:        row.Method,
				RemovedAt:     row.ChangeLog,
				LastChangeLog: "",
			})
			continue
		}
		out = append(out, row)
	}
	return out, ledger
}

// changedColumns compares the audited columns of two rows and returns the
// names of any that differ.
func changedColumns(a, b ConsumerAuditRow) []string {
	var changed []string
	for _, col := range auditedColumns {
		if col.get(a) != col.get(b) {
			changed = append(changed, col.name)
		}
	}
	return changed
}

// trackedToSheetRows converts a slice of TrackedEndpoints back into the
// [][]string shape that downstream sheet writers expect (header + rows).
// The deletion ledger is serialized into Z1 of the header row.
func trackedToSheetRows(tracked []TrackedEndpoint, ledger []DeletionRecord) [][]string {
	rows := make([]ConsumerAuditRow, len(tracked))
	for i, t := range tracked {
		rows[i] = t.Row
	}
	return rowsToSheetRows(rows, ledger)
}

// rowsToSheetRows converts plain audit rows (no reconciliation) into the
// header+rows shape used by sheet writers. The deletion ledger, if any,
// is serialized into Z1.
func rowsToSheetRows(rows []ConsumerAuditRow, ledger []DeletionRecord) [][]string {
	out := make([][]string, 0, len(rows)+1)
	header := append([]string(nil), auditHeader...)
	header[metadataColumnIndex] = encodeDeletionLedger(ledger)
	if header[metadataColumnIndex] == "" {
		header[metadataColumnIndex] = "__metadata__"
	}
	out = append(out, header)
	for _, r := range rows {
		out = append(out, r.toRow())
	}
	return out
}

// readSheet pulls every value out of the combined audit sheet.
// The returned rows are exactly what reconcile expects.
func readSheet(ctx context.Context, srv *sheets.Service, sheetID string) ([][]string, error) {
	resp, err := srv.Spreadsheets.Values.Get(sheetID, sheetRange("A1:Z10000")).Context(ctx).Do()
	if err != nil {
		return nil, fmt.Errorf("read sheet: %w", err)
	}
	rows := make([][]string, 0, len(resp.Values))
	for _, raw := range resp.Values {
		row := make([]string, 0, len(raw))
		for _, cell := range raw {
			row = append(row, fmt.Sprint(cell))
		}
		rows = append(rows, row)
	}
	return rows, nil
}

func subsetValueRange(rows [][]string, start, end int) [][]any {
	values := make([][]any, 0, len(rows))
	for _, r := range rows {
		row := make([]any, 0, end-start+1)
		for i := start; i <= end; i++ {
			cell := ""
			if i < len(r) {
				cell = r[i]
			}
			row = append(row, cell)
		}
		values = append(values, row)
	}
	return values
}

// writeSheet clears the destination sheet and writes the reconciled rows to
// it. Deletion history is stored in Z1 as a JSON ledger; deleted rows do
// not appear in the sheet body. User-owned columns O..Y are left untouched.
func writeSheet(ctx context.Context, srv *sheets.Service, sheetID string, previous [][]string, tracked []TrackedEndpoint, ledger []DeletionRecord) error {
	rows := trackedToSheetRows(tracked, ledger)
	maxRows := max(len(previous), len(rows))
	if maxRows == 0 {
		maxRows = 1
	}

	_, err := srv.Spreadsheets.Values.BatchClear(sheetID, &sheets.BatchClearValuesRequest{
		Ranges: []string{
			sheetRange(fmt.Sprintf("A1:N%d", maxRows)),
			sheetRange(fmt.Sprintf("Z1:Z%d", maxRows)),
		},
	}).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("clear managed sheet ranges: %w", err)
	}

	_, err = srv.Spreadsheets.Values.BatchUpdate(sheetID, &sheets.BatchUpdateValuesRequest{
		ValueInputOption: "RAW",
		Data: []*sheets.ValueRange{
			{
				Range:  sheetRange("A1"),
				Values: subsetValueRange(rows, 0, generatedColumnCount-1),
			},
			{
				Range:  sheetRange("Z1"),
				Values: subsetValueRange(rows, metadataColumnIndex, metadataColumnIndex),
			},
		},
	}).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("update managed sheet ranges: %w", err)
	}
	return nil
}

// newSheetsService builds a Google Sheets client from a JSON credentials blob.
// It expects either service-account credentials or any other format
// google.CredentialsFromJSON understands.
func newSheetsService(ctx context.Context, creds []byte) (*sheets.Service, error) {
	if len(creds) == 0 {
		return nil, fmt.Errorf("consumer-audit: empty Google credentials")
	}
	gc, err := google.CredentialsFromJSON(ctx, creds, sheets.SpreadsheetsScope)
	if err != nil {
		return nil, fmt.Errorf("parse credentials: %w", err)
	}
	srv, err := sheets.NewService(ctx, option.WithCredentials(gc))
	if err != nil {
		return nil, fmt.Errorf("sheets client: %w", err)
	}
	return srv, nil
}

// reconcileFromOpts applies the requested reconciliation flow:
//   - SheetID set → read sheet, reconcile, write sheet, install tracked rows
//   - neither     → no-op
func reconcileFromOpts(opts ConsumerAuditOptions, result *ConsumerAuditResult) error {
	if result == nil {
		return nil
	}

	if opts.SheetID != "" {
		// Cap each Sheets round-trip so a stalled Google API call cannot
		// hang CI or local runs indefinitely.
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
		defer cancel()
		srv, err := newSheetsService(ctx, opts.SheetsCredentials)
		if err != nil {
			return err
		}
		if err := ensureSheetExists(ctx, srv, opts.SheetID); err != nil {
			return err
		}
		previous, err := readSheet(ctx, srv, opts.SheetID)
		if err != nil {
			return err
		}
		out := reconcile(result.Rows, previous)
		if err := writeSheet(ctx, srv, opts.SheetID, previous, out.Tracked, out.DeletionLedger); err != nil {
			return err
		}
		result.Tracked = out.Tracked
		result.DeletionLedger = out.DeletionLedger
		result.NewDeletions = out.NewDeletions
		return nil
	}

	return nil
}
