package validation

import (
	"go/ast"
	"go/parser"
	"go/token"
	"log"
	"path"
	"reflect"
	"sort"
	"strconv"
	"strings"
)

// consumerEndpoint represents one route registered in a consumer codebase.
type consumerEndpoint struct {
	Repo           string      // "meshery" or "meshery-cloud"
	Method         string      // "GET", "POST", etc., or "ANY"
	Path           string      // normalized: starts with /, params as {name}
	HandlerName    string      // "GetConnections", "(anonymous)", ""
	HandlerFile    string      // "server/handlers/user_handler.go" (repo-relative)
	RouterFile     string      // where registration lives
	RouterLine     int         // line number in the router file
	ImportsSchemas bool        // handler file imports github.com/meshery/schemas/models/*
	RequestType    *goTypeInfo // nil if not inferable
	ResponseType   *goTypeInfo // nil if not inferable
	QueryParams    []string    // query param names read by the handler (e.g. "orgId", "page")
	Notes          []string    // parser-side notes (e.g. "anonymous handler")
}

// goTypeInfo describes a Go type used by a consumer handler.
type goTypeInfo struct {
	Package      string            // full import path
	TypeName     string            // struct name, e.g. "ConnectionPayload"
	Fields       map[string]string // JSON tag -> Go type string
	IsFromSchema bool              // package starts with "github.com/meshery/schemas/models/"
}

// handlerInfo summarizes what we learn from a single handler file walk.
type handlerInfo struct {
	File           string
	ImportsSchemas bool
	RequestType    *goTypeInfo
	ResponseType   *goTypeInfo
	QueryParams    []string
	// DelegatesTo is the name of a same-package method this handler forwards
	// (res, req, ...) to when its own body contains no req/resp evidence.
	// Resolved in a post-pass so the delegate's types propagate here.
	DelegatesTo string
}

// indexHandlers walks the handler directories under a consumer source tree,
// builds a map keyed by handler function name, and joins it back into the
// supplied list of consumerEndpoints. When multiple handler files expose the
// same function name, the endpoint is left unresolved with an explicit note
// instead of silently binding to the first match.
func indexHandlers(tree sourceTree, endpoints []consumerEndpoint) []consumerEndpoint {
	if tree == nil {
		return endpoints
	}

	type fileCtx struct {
		path    string
		dir     string
		file    *ast.File
		imports map[string]string
	}

	var ctxs []fileCtx

	// server/models holds many type aliases to schema packages
	// (`type ConnectionPage = schemasConnection.ConnectionPage`) and domain
	// structs used by handlers. Without indexing it, responses typed as
	// `models.ConnectionPage` would be treated as unknown local types.
	walkDirs := []string{
		"server/handlers",
		"server/router",
		"server/models",
		"server/services",
		"server/dao",
	}
	for _, dir := range walkDirs {
		if err := tree.Walk(dir, func(p string) error {
			if !strings.HasSuffix(p, ".go") || strings.HasSuffix(p, "_test.go") {
				return nil
			}
			data, err := tree.ReadFile(p)
			if err != nil {
				log.Printf("consumer-audit: indexHandlers: read %s: %v", p, err)
				return nil
			}
			fset := token.NewFileSet()
			file, err := parser.ParseFile(fset, p, data, parser.ParseComments)
			if err != nil {
				log.Printf("consumer-audit: indexHandlers: parse %s: %v", p, err)
				return nil
			}
			ctxs = append(ctxs, fileCtx{
				path:    p,
				dir:     path.Dir(p),
				file:    file,
				imports: collectImportMap(file),
			})
			return nil
		}); err != nil {
			log.Printf("consumer-audit: indexHandlers: walk %s: %v", dir, err)
		}
	}

	// Per-package local type sets, indexed by directory of the handler
	// file. Handler-local types live in the same package as the handler,
	// so a per-dir map is the smallest unit that gives us correct lookups.
	localPkgTypes := make(map[string]map[string]map[string]string)
	// Cross-package type index keyed by package name (e.g. "models").
	// Populated from every walked directory so a handler calling
	// `models.ConnectionPage` can resolve it even though `models` is a
	// different package from the handler's own.
	pkgTypes := make(map[string]map[string]map[string]string)
	// Cross-package type alias index: pkgName → typeName → import path of
	// the aliased target. Used to mark `type ConnectionPage = schemas…`
	// as schema-backed without walking generated models.
	pkgAliases := make(map[string]map[string]string)
	for _, c := range ctxs {
		if localPkgTypes[c.dir] == nil {
			localPkgTypes[c.dir] = make(map[string]map[string]string)
		}
		pkgName := ""
		if c.file.Name != nil {
			pkgName = c.file.Name.Name
		}
		if pkgName != "" && pkgTypes[pkgName] == nil {
			pkgTypes[pkgName] = make(map[string]map[string]string)
		}
		if pkgName != "" && pkgAliases[pkgName] == nil {
			pkgAliases[pkgName] = make(map[string]string)
		}
		for _, decl := range c.file.Decls {
			gen, ok := decl.(*ast.GenDecl)
			if !ok || gen.Tok != token.TYPE {
				continue
			}
			for _, spec := range gen.Specs {
				ts, ok := spec.(*ast.TypeSpec)
				if !ok || ts.Name == nil {
					continue
				}
				// `type X = Y.Z` alias — record the aliased import path so
				// schema-target aliases surface as IsFromSchema downstream.
				if ts.Assign.IsValid() && pkgName != "" {
					if sel, ok := ts.Type.(*ast.SelectorExpr); ok {
						if id, ok := sel.X.(*ast.Ident); ok {
							if ipath, ok := c.imports[id.Name]; ok {
								if _, exists := pkgAliases[pkgName][ts.Name.Name]; !exists {
									pkgAliases[pkgName][ts.Name.Name] = ipath
								}
							}
						}
					}
				}
				if st, ok := ts.Type.(*ast.StructType); ok {
					fields := extractStructFields(st)
					if len(fields) > 0 {
						localPkgTypes[c.dir][ts.Name.Name] = fields
						if pkgName != "" {
							if _, exists := pkgTypes[pkgName][ts.Name.Name]; !exists {
								pkgTypes[pkgName][ts.Name.Name] = fields
							}
						}
					}
				}
			}
		}
	}

	// Per-package map of function name → first non-error return type, used to
	// resolve bare identifiers assigned from a call (`x, _ := svc.GetFoo(...)`)
	// into a comparable shape. Indexing runs on every FuncDecl — including
	// DAO/service methods that are not HTTP handlers — because those are the
	// ones returning the domain types the handler then serializes.
	//
	// We also build a repo-wide fallback map so handler calls against
	// cross-package receivers (e.g. `h.dao.ConnectionDAO.GetConnections(...)`)
	// can be resolved even when the target function lives in server/dao. On
	// name collisions (two functions in different packages returning different
	// types) the entry is poisoned — surfacing as "unresolved" is safer than
	// binding to the wrong shape.
	funcReturns := make(map[string]map[string]*goTypeInfo, len(ctxs))
	allFuncReturns := make(map[string]*goTypeInfo)
	allFuncPoisoned := make(map[string]bool)
	for _, c := range ctxs {
		if funcReturns[c.dir] == nil {
			funcReturns[c.dir] = make(map[string]*goTypeInfo)
		}
		for _, decl := range c.file.Decls {
			fn, ok := decl.(*ast.FuncDecl)
			if !ok || fn.Name == nil {
				continue
			}
			info := firstNonErrorReturn(fn)
			if info == nil {
				continue
			}
			name := fn.Name.Name
			if _, exists := funcReturns[c.dir][name]; !exists {
				funcReturns[c.dir][name] = info
			}
			if allFuncPoisoned[name] {
				continue
			}
			if existing, ok := allFuncReturns[name]; ok {
				if !sameGoType(existing, info) {
					allFuncPoisoned[name] = true
					delete(allFuncReturns, name)
				}
				continue
			}
			allFuncReturns[name] = info
		}
	}

	handlers := make(map[string][]handlerInfo)
	for _, c := range ctxs {
		importsSchemas := fileImportsSchemas(c.file)
		for _, decl := range c.file.Decls {
			fn, ok := decl.(*ast.FuncDecl)
			if !ok || fn.Name == nil {
				continue
			}
			// Only index functions whose signature matches a known HTTP
			// handler shape. Same-named DAO/service methods (e.g.
			// (*BadgingService).AddOrUpdateBadge) are intentionally
			// excluded so the endpoint binds to the real handler instead
			// of being flagged as ambiguous.
			if !isHandlerFunc(fn) {
				continue
			}
			name := fn.Name.Name
			req, resp, delegate, qps := scanHandlerBody(fn, c.imports, localPkgTypes[c.dir], funcReturns[c.dir], allFuncReturns, pkgTypes, pkgAliases)
			handlers[name] = append(handlers[name], handlerInfo{
				File:           c.path,
				ImportsSchemas: importsSchemas,
				RequestType:    req,
				ResponseType:   resp,
				QueryParams:    qps,
				DelegatesTo:    delegate,
			})
		}
	}

	resolveDelegations(handlers)

	for i := range endpoints {
		ep := &endpoints[i]
		if ep.HandlerName == "" {
			continue
		}
		candidates, ok := handlers[ep.HandlerName]
		if !ok || len(candidates) == 0 {
			continue
		}
		if len(candidates) > 1 {
			var files []string
			for _, candidate := range candidates {
				files = append(files, candidate.File)
			}
			sort.Strings(files)
			ep.Notes = append(ep.Notes, "multiple handler definitions named "+ep.HandlerName+": "+strings.Join(files, ", "))
			continue
		}
		info := candidates[0]
		ep.HandlerFile = info.File
		ep.ImportsSchemas = info.ImportsSchemas
		if ep.RequestType == nil {
			ep.RequestType = info.RequestType
		}
		if ep.ResponseType == nil {
			ep.ResponseType = info.ResponseType
		}
		if len(ep.QueryParams) == 0 {
			ep.QueryParams = info.QueryParams
		}
	}

	return endpoints
}

// collectImportMap returns a map of package alias → import path for an AST
// file. Files use either an explicit alias (`import foo "x/y/z"`) or fall
// back to the trailing path segment as the alias.
func collectImportMap(file *ast.File) map[string]string {
	out := make(map[string]string)
	if file == nil {
		return out
	}
	for _, imp := range file.Imports {
		if imp == nil || imp.Path == nil {
			continue
		}
		raw := strings.Trim(imp.Path.Value, `"`)
		alias := ""
		if imp.Name != nil {
			alias = imp.Name.Name
		}
		if alias == "" {
			alias = path.Base(raw)
		}
		if alias == "_" || alias == "." {
			continue
		}
		out[alias] = raw
	}
	return out
}

// fileImportsSchemas returns true if any import of the given file references
// a generated meshery/schemas type package.
func fileImportsSchemas(file *ast.File) bool {
	if file == nil {
		return false
	}
	for _, imp := range file.Imports {
		if imp == nil || imp.Path == nil {
			continue
		}
		path := strings.Trim(imp.Path.Value, `"`)
		if strings.HasPrefix(path, "github.com/meshery/schemas/models/") {
			return true
		}
	}
	return false
}

// extractHandlerName recursively unwraps a handler expression to find the
// innermost named handler function, plus extra unwraps for:
//   - http.StripPrefix(prefix, inner)
//   - echo.WrapHandler(http.HandlerFunc(receiver.X))
//   - func literal handlers (scan body for h.X / s.h.X calls)
func extractHandlerName(expr ast.Expr) string {
	switch e := expr.(type) {
	case nil:
		return ""

	case *ast.Ident:
		return e.Name

	case *ast.SelectorExpr:
		// receiver.Method — the handler is the trailing selector name.
		if e.Sel != nil {
			return e.Sel.Name
		}

	case *ast.CallExpr:
		// Special-case http.StripPrefix(prefix, inner) → unwrap the
		// second argument.
		if isCalledFunc(e, "StripPrefix") && len(e.Args) >= 2 {
			if name := extractHandlerName(e.Args[1]); name != "" {
				return name
			}
		}
		// http.HandlerFunc(receiver.X) → unwrap.
		if isCalledFunc(e, "HandlerFunc") && len(e.Args) >= 1 {
			if name := extractHandlerName(e.Args[0]); name != "" {
				return name
			}
		}
		// echo.WrapHandler(...) → unwrap.
		if isCalledFunc(e, "WrapHandler") && len(e.Args) >= 1 {
			if name := extractHandlerName(e.Args[0]); name != "" {
				return name
			}
		}
		// Generic recursion: scan args, deepest non-empty result wins.
		for _, arg := range e.Args {
			if name := extractHandlerName(arg); name != "" && !isMiddlewareName(name) {
				return name
			}
		}
		// Fall back to args including middleware-like names — gives the
		// caller something rather than empty string when the chain is
		// entirely middlewares.
		for _, arg := range e.Args {
			if name := extractHandlerName(arg); name != "" {
				return name
			}
		}
		// Finally fall back to the function being invoked.
		if sel, ok := e.Fun.(*ast.SelectorExpr); ok && sel.Sel != nil {
			return sel.Sel.Name
		}
		if id, ok := e.Fun.(*ast.Ident); ok {
			return id.Name
		}

	case *ast.FuncLit:
		// Anonymous handler — scan its body for h.X(...) / s.h.X(...) calls
		// where the receiver looks like a handler container.
		if name := scanFuncLitForHandler(e); name != "" {
			return name
		}
		return "(anonymous)"
	}
	return ""
}

// isCalledFunc reports whether a CallExpr is calling a function whose
// trailing selector matches name (e.g. http.StripPrefix → "StripPrefix").
func isCalledFunc(call *ast.CallExpr, name string) bool {
	if call == nil {
		return false
	}
	switch fn := call.Fun.(type) {
	case *ast.SelectorExpr:
		return fn.Sel != nil && fn.Sel.Name == name
	case *ast.Ident:
		return fn.Name == name
	}
	return false
}

// middlewareNamePrefixes / middlewareNameSuffixes / middlewareNameExact are
// CamelCase fragments matched positionally to identify middleware functions
// that should be skipped while looking for the real handler. Positional
// matching (start/end as a CamelCase token) avoids false positives such as
// "GetAuthorization" being classified as middleware simply because it
// contains the substring "Authorization".
var middlewareNamePrefixes = []string{"With", "Require", "Ensure"}
var middlewareNameSuffixes = []string{"Middleware", "AuthGuard"}
var middlewareNameExact = map[string]struct{}{
	"Authorization": {},
	"WithAuth":      {},
	"WithSession":   {},
}

func isMiddlewareName(name string) bool {
	if _, ok := middlewareNameExact[name]; ok {
		return true
	}
	for _, p := range middlewareNamePrefixes {
		if hasCamelPrefix(name, p) {
			return true
		}
	}
	for _, s := range middlewareNameSuffixes {
		if hasCamelSuffix(name, s) {
			return true
		}
	}
	return false
}

// hasCamelPrefix reports whether name starts with prefix and the prefix
// terminates at a CamelCase boundary (uppercase letter or end-of-string).
func hasCamelPrefix(name, prefix string) bool {
	if !strings.HasPrefix(name, prefix) {
		return false
	}
	if len(name) == len(prefix) {
		return true
	}
	next := name[len(prefix)]
	return next >= 'A' && next <= 'Z'
}

// hasCamelSuffix reports whether name ends with suffix and the suffix
// starts at a CamelCase word boundary (preceded by a lowercase letter or
// digit, or matches the entire name).
func hasCamelSuffix(name, suffix string) bool {
	if !strings.HasSuffix(name, suffix) {
		return false
	}
	if len(name) == len(suffix) {
		return true
	}
	prev := name[len(name)-len(suffix)-1]
	return (prev >= 'a' && prev <= 'z') || (prev >= '0' && prev <= '9')
}

// scanFuncLitForHandler walks a function literal body and returns the first
// CallExpr whose receiver looks like a handler container (h, s.h, hc, etc.).
func scanFuncLitForHandler(fn *ast.FuncLit) string {
	if fn == nil || fn.Body == nil {
		return ""
	}
	var found string
	ast.Inspect(fn.Body, func(n ast.Node) bool {
		if found != "" {
			return false
		}
		call, ok := n.(*ast.CallExpr)
		if !ok {
			return true
		}
		sel, ok := call.Fun.(*ast.SelectorExpr)
		if !ok || sel.Sel == nil {
			return true
		}
		if !receiverLooksLikeHandlerContainer(sel.X) {
			return true
		}
		// Skip the obvious middleware leak.
		if isMiddlewareName(sel.Sel.Name) {
			return true
		}
		found = sel.Sel.Name
		return false
	})
	return found
}

// receiverLooksLikeHandlerContainer returns true for expressions like h, s.h,
// or hc — common handler container receivers in Meshery.
func receiverLooksLikeHandlerContainer(expr ast.Expr) bool {
	switch e := expr.(type) {
	case *ast.Ident:
		switch e.Name {
		case "h", "hc", "handler":
			return true
		}
	case *ast.SelectorExpr:
		if e.Sel != nil {
			switch e.Sel.Name {
			case "h", "hc", "handler", "academyHandler", "invitationsHandler", "badgesHandler":
				return true
			}
		}
	}
	return false
}

// scanHandlerBody walks a function declaration looking for the request and
// response types it works with, then populates field sets from the supplied
// type contexts.
//
// localTypes is the per-package map of struct types defined in the same
// directory as the handler file (handler-local payload types). imports maps
// each package alias used in the file to its full import path so schema-backed
// type references can be identified without walking generated models.
func scanHandlerBody(
	fn *ast.FuncDecl,
	imports map[string]string,
	localTypes map[string]map[string]string,
	funcReturns map[string]*goTypeInfo,
	allFuncReturns map[string]*goTypeInfo,
	pkgTypes map[string]map[string]map[string]string,
	pkgAliases map[string]map[string]string,
) (*goTypeInfo, *goTypeInfo, string, []string) {
	if fn == nil || fn.Body == nil {
		return nil, nil, "", nil
	}

	locals := collectLocalVars(fn, funcReturns, allFuncReturns)
	delegate := detectDelegation(fn)

	resolve := func(arg ast.Expr) *goTypeInfo {
		info := identifyArgType(arg)
		if info == nil {
			info = lookupLocalVar(arg, locals)
		}
		populateFields(info, imports, localTypes, pkgTypes, pkgAliases)
		return info
	}

	var req, resp *goTypeInfo
	qpSeen := make(map[string]bool)
	var queryParams []string

	ast.Inspect(fn.Body, func(n ast.Node) bool {
		call, ok := n.(*ast.CallExpr)
		if !ok {
			return true
		}
		sel, ok := call.Fun.(*ast.SelectorExpr)
		if !ok || sel.Sel == nil {
			return true
		}
		switch sel.Sel.Name {
		case "Decode":
			// json.NewDecoder(r.Body).Decode(&v)
			if req == nil && len(call.Args) == 1 {
				req = resolve(call.Args[0])
			}
		case "Unmarshal":
			// json.Unmarshal(bd, &v) — the destination is the 2nd arg.
			if req == nil && len(call.Args) >= 2 {
				req = resolve(call.Args[1])
			}
		case "Bind":
			// echo: c.Bind(&v)
			if req == nil && len(call.Args) == 1 {
				req = resolve(call.Args[0])
			}
		case "Encode":
			// json.NewEncoder(w).Encode(v)
			if resp == nil && len(call.Args) == 1 {
				resp = resolve(call.Args[0])
			}
		case "JSON":
			// echo: c.JSON(code, v)
			if resp == nil && len(call.Args) >= 2 {
				resp = resolve(call.Args[1])
			}
		case "QueryParam":
			// Echo: c.QueryParam("name")
			if len(call.Args) == 1 {
				if name := stringLit(call.Args[0]); name != "" && !qpSeen[name] {
					qpSeen[name] = true
					queryParams = append(queryParams, name)
				}
			}
		case "Get":
			// Stdlib: r.URL.Query().Get("name")
			// The receiver of Get must itself be a call ending in "Query".
			if len(call.Args) == 1 && receiverIsQueryValues(sel.X) {
				if name := stringLit(call.Args[0]); name != "" && !qpSeen[name] {
					qpSeen[name] = true
					queryParams = append(queryParams, name)
				}
			}
		}
		return true
	})

	return req, resp, delegate, queryParams
}

// receiverIsQueryValues reports whether an expression is a call chain ending
// in .Query() — the pattern that produces a url.Values from an http.Request.
// It matches both the direct form (r.URL.Query()) and any deeper chain like
// req.URL.Query().
func receiverIsQueryValues(expr ast.Expr) bool {
	call, ok := expr.(*ast.CallExpr)
	if !ok {
		return false
	}
	sel, ok := call.Fun.(*ast.SelectorExpr)
	if !ok || sel.Sel == nil {
		return false
	}
	return sel.Sel.Name == "Query"
}

// detectDelegation reports the name of a same-package method the handler
// forwards its (res, req) pair to, when the handler body boils down to a
// single call shaped like `h.X(res, req, ...)` or `h.X(w, r, ...)`. Returns
// "" if no clean delegation is found. The caller uses this to inherit
// request/response types from the delegate in a post-pass.
func detectDelegation(fn *ast.FuncDecl) string {
	if fn == nil || fn.Body == nil || fn.Type == nil || fn.Type.Params == nil {
		return ""
	}
	// First two parameter names are the (res, req) pair we want to forward.
	var paramNames []string
	for _, field := range fn.Type.Params.List {
		for _, name := range field.Names {
			if name != nil {
				paramNames = append(paramNames, name.Name)
			}
		}
	}
	if len(paramNames) < 2 {
		return ""
	}
	wantRes, wantReq := paramNames[0], paramNames[1]

	var (
		found    string
		bailOut  bool
		seenCall bool
	)
	for _, stmt := range fn.Body.List {
		if bailOut {
			break
		}
		exprStmt, ok := stmt.(*ast.ExprStmt)
		if !ok {
			bailOut = true
			break
		}
		call, ok := exprStmt.X.(*ast.CallExpr)
		if !ok || len(call.Args) < 2 {
			bailOut = true
			break
		}
		arg0, ok0 := call.Args[0].(*ast.Ident)
		arg1, ok1 := call.Args[1].(*ast.Ident)
		if !ok0 || !ok1 || arg0.Name != wantRes || arg1.Name != wantReq {
			bailOut = true
			break
		}
		sel, ok := call.Fun.(*ast.SelectorExpr)
		if !ok || sel.Sel == nil {
			bailOut = true
			break
		}
		if seenCall {
			bailOut = true
			break
		}
		seenCall = true
		found = sel.Sel.Name
	}
	if bailOut {
		return ""
	}
	return found
}

// collectLocalVars walks a function body and records the type of every
// short variable declaration (`x := T{...}`, `x := &T{}`, `x := new(T)`)
// and `var` declaration whose RHS or type expression is recoverable. It is
// the missing piece that lets scanHandlerBody resolve `Decode(&v)` calls
// where `v` is a bare identifier declared a few lines earlier.
func collectLocalVars(fn *ast.FuncDecl, funcReturns, allFuncReturns map[string]*goTypeInfo) map[string]*goTypeInfo {
	out := make(map[string]*goTypeInfo)
	if fn == nil || fn.Body == nil {
		return out
	}
	ast.Inspect(fn.Body, func(n ast.Node) bool {
		switch s := n.(type) {
		case *ast.DeclStmt:
			gen, ok := s.Decl.(*ast.GenDecl)
			if !ok || gen.Tok != token.VAR {
				return true
			}
			for _, spec := range gen.Specs {
				vs, ok := spec.(*ast.ValueSpec)
				if !ok {
					continue
				}
				var info *goTypeInfo
				if vs.Type != nil {
					info = typeFromExpr(vs.Type)
				}
				if info == nil && len(vs.Values) > 0 {
					info = identifyArgType(vs.Values[0])
				}
				if info == nil {
					continue
				}
				for _, name := range vs.Names {
					if name == nil || name.Name == "_" {
						continue
					}
					if _, exists := out[name.Name]; exists {
						continue
					}
					out[name.Name] = info
				}
			}
		case *ast.AssignStmt:
			if s.Tok != token.DEFINE {
				return true
			}
			// Handle both `x := foo()` (single-value call) and
			// `x, err := foo()` (destructured return). In the
			// destructured case len(Rhs) == 1 and len(Lhs) >= 2, so we
			// resolve every LHS through the single RHS call.
			singleCall := len(s.Rhs) == 1 && len(s.Lhs) > 1
			for i, lhs := range s.Lhs {
				id, ok := lhs.(*ast.Ident)
				if !ok || id.Name == "_" {
					continue
				}
				if _, exists := out[id.Name]; exists {
					continue
				}
				rhsIndex := i
				if singleCall {
					rhsIndex = 0
				}
				if rhsIndex >= len(s.Rhs) {
					break
				}
				rhs := s.Rhs[rhsIndex]
				if info := identifyArgType(rhs); info != nil {
					out[id.Name] = info
					continue
				}
				// Fallback: match the RHS against the per-package map
				// of function return types. This catches the common
				// `thing, err := h.Service.GetThing(...)` pattern where
				// `GetThing` is declared in a sibling file in the same
				// package.
				if info := resolveCallReturn(rhs, funcReturns); info != nil && (!singleCall || i == 0) {
					out[id.Name] = info
					continue
				}
				// Repo-wide fallback for cross-package method calls such
				// as `connResp, _ := h.dao.ConnectionDAO.GetConnections(...)`
				// where the return type lives in server/dao or similar.
				if info := resolveCallReturn(rhs, allFuncReturns); info != nil && (!singleCall || i == 0) {
					out[id.Name] = info
				}
			}
		}
		return true
	})
	return out
}

// lookupLocalVar resolves a Decode/Encode argument to a previously declared
// local variable. It handles `&v` and bare `v` forms.
func lookupLocalVar(expr ast.Expr, locals map[string]*goTypeInfo) *goTypeInfo {
	if locals == nil {
		return nil
	}
	switch e := expr.(type) {
	case *ast.UnaryExpr:
		if e.Op.String() == "&" {
			return lookupLocalVar(e.X, locals)
		}
	case *ast.Ident:
		if info, ok := locals[e.Name]; ok && info != nil {
			// Return a shallow copy so populateFields cannot mutate
			// the version stored in the locals map.
			cp := *info
			return &cp
		}
	}
	return nil
}

// populateFields fills in info.Fields and info.IsFromSchema by looking the
// type up in the supplied contexts. Schema-backed types are identified by
// import path only; we intentionally do not inspect generated models for
// field-level comparisons. Handler-local struct types remain comparable by
// their declared fields.
func populateFields(
	info *goTypeInfo,
	imports map[string]string,
	localTypes map[string]map[string]string,
	pkgTypes map[string]map[string]map[string]string,
	pkgAliases map[string]map[string]string,
) {
	if info == nil || len(info.Fields) > 0 {
		return
	}
	typeName := stripArrayPrefix(info.TypeName)
	if info.Package != "" {
		importPath := imports[info.Package]
		if importPath != "" && strings.HasPrefix(importPath, "github.com/meshery/schemas/models/") {
			info.IsFromSchema = true
			return
		}
		// Cross-package alias: `type X = schemas…X` in a walked local
		// package counts as schema-backed.
		if aliases, ok := pkgAliases[info.Package]; ok {
			if target, ok := aliases[typeName]; ok && strings.HasPrefix(target, "github.com/meshery/schemas/models/") {
				info.IsFromSchema = true
				return
			}
		}
		// Cross-package struct defined in a walked local package.
		if types, ok := pkgTypes[info.Package]; ok {
			if fields, ok := types[typeName]; ok && len(fields) > 0 {
				info.Fields = fields
				return
			}
		}
		return
	}
	if fields := localTypes[typeName]; len(fields) > 0 {
		info.Fields = fields
	}
}

// stripArrayPrefix removes the leading "[]" added by typeFromExpr for slice
// arguments so type lookups land on the element type rather than missing.
func stripArrayPrefix(name string) string {
	return strings.TrimPrefix(name, "[]")
}

// identifyArgType inspects an expression that was passed into Decode/Encode/Bind/JSON
// and best-effort determines the underlying type name. We do not use go/types,
// so this only resolves cases where the literal type is visible at the call site.
func identifyArgType(expr ast.Expr) *goTypeInfo {
	switch e := expr.(type) {
	case *ast.UnaryExpr:
		if e.Op.String() == "&" {
			return identifyArgType(e.X)
		}
	case *ast.CompositeLit:
		return typeFromExpr(e.Type)
	case *ast.CallExpr:
		// new(T). make(T) is intentionally not handled — slices/maps passed to
		// Decode/Encode are resolved via the local-var map instead.
		if id, ok := e.Fun.(*ast.Ident); ok && id.Name == "new" && len(e.Args) == 1 {
			return typeFromExpr(e.Args[0])
		}
	case *ast.Ident:
		// Bare identifier — caller falls back to the local-var map.
		return nil
	}
	return nil
}

func typeFromExpr(expr ast.Expr) *goTypeInfo {
	switch e := expr.(type) {
	case *ast.Ident:
		return &goTypeInfo{TypeName: e.Name}
	case *ast.SelectorExpr:
		if e.Sel == nil {
			return nil
		}
		pkg := ""
		if id, ok := e.X.(*ast.Ident); ok {
			pkg = id.Name
		}
		return &goTypeInfo{TypeName: e.Sel.Name, Package: pkg}
	case *ast.StarExpr:
		return typeFromExpr(e.X)
	case *ast.ArrayType:
		inner := typeFromExpr(e.Elt)
		if inner == nil {
			return nil
		}
		inner.TypeName = "[]" + inner.TypeName
		return inner
	}
	return nil
}

// extractStructFields walks a struct type definition and returns a JSON-tag
// → Go-type-string map. Fields tagged `json:"-"` are skipped; embedded
// fields are skipped because the audit compares top-level payload shape only.
func extractStructFields(st *ast.StructType) map[string]string {
	if st == nil || st.Fields == nil {
		return nil
	}
	out := make(map[string]string)
	for _, field := range st.Fields.List {
		if len(field.Names) == 0 {
			continue
		}
		jsonName := ""
		skip := false
		if field.Tag != nil {
			raw, err := strconv.Unquote(field.Tag.Value)
			if err == nil {
				tag := reflect.StructTag(raw)
				if jt := tag.Get("json"); jt != "" {
					parts := strings.Split(jt, ",")
					if parts[0] == "-" {
						skip = true
					} else if parts[0] != "" {
						jsonName = parts[0]
					}
				}
			}
		}
		if skip {
			continue
		}
		typeStr := exprToString(field.Type)
		for _, name := range field.Names {
			n := jsonName
			if n == "" {
				n = name.Name
			}
			out[n] = typeStr
		}
	}
	return out
}

// exprToString returns a compact textual rendering of a Go type expression
// suitable for the relaxed comparisons in matcher.go.
func exprToString(expr ast.Expr) string {
	switch e := expr.(type) {
	case *ast.Ident:
		return e.Name
	case *ast.StarExpr:
		return "*" + exprToString(e.X)
	case *ast.ArrayType:
		return "[]" + exprToString(e.Elt)
	case *ast.SelectorExpr:
		if id, ok := e.X.(*ast.Ident); ok && e.Sel != nil {
			return id.Name + "." + e.Sel.Name
		}
		if e.Sel != nil {
			return e.Sel.Name
		}
	case *ast.MapType:
		return "map[" + exprToString(e.Key) + "]" + exprToString(e.Value)
	case *ast.InterfaceType:
		return "interface{}"
	case *ast.StructType:
		return "struct{}"
	}
	return ""
}

// isHandlerFunc reports whether a function declaration matches one of the
// HTTP handler signatures in use across the consumer repos:
//
//   - Echo:    func (...) Name(c echo.Context) error
//   - Gorilla: func (...) Name(w http.ResponseWriter, r *http.Request, ...)
//
// Meshery's provider-aware handlers take additional parameters after the
// standard (w, r) pair (e.g. a `models.Provider`), so the Gorilla check only
// inspects the first two parameters.
//
// The indexer uses this to disambiguate same-named functions when a DAO or
// service method shares its name with the real handler.
func isHandlerFunc(fn *ast.FuncDecl) bool {
	if fn == nil || fn.Type == nil || fn.Type.Params == nil {
		return false
	}
	var paramTypes []string
	for _, field := range fn.Type.Params.List {
		t := exprToString(field.Type)
		n := len(field.Names)
		if n == 0 {
			n = 1
		}
		for i := 0; i < n; i++ {
			paramTypes = append(paramTypes, t)
		}
	}
	if len(paramTypes) == 1 && paramTypes[0] == "echo.Context" {
		return true
	}
	if len(paramTypes) >= 2 && paramTypes[0] == "http.ResponseWriter" && paramTypes[1] == "*http.Request" {
		return true
	}
	return false
}

// firstNonErrorReturn returns the first declared return value whose type is
// not `error`, as a goTypeInfo. It is used to infer the type assigned to a
// local variable from a destructured call (`badge, err := svc.GetBadge(...)`).
func firstNonErrorReturn(fn *ast.FuncDecl) *goTypeInfo {
	if fn == nil || fn.Type == nil || fn.Type.Results == nil {
		return nil
	}
	for _, field := range fn.Type.Results.List {
		n := len(field.Names)
		if n == 0 {
			n = 1
		}
		for i := 0; i < n; i++ {
			info := typeFromExpr(field.Type)
			if info == nil || info.TypeName == "" {
				continue
			}
			base := strings.TrimPrefix(info.TypeName, "[]")
			base = strings.TrimLeft(base, "*")
			if base == "error" {
				continue
			}
			return info
		}
	}
	return nil
}

// sameGoType reports whether two goTypeInfo values refer to the same
// package-qualified type. Used to detect cross-package function-name
// collisions where both functions happen to return the same type (and so the
// collision is harmless).
func sameGoType(a, b *goTypeInfo) bool {
	if a == nil || b == nil {
		return a == b
	}
	return a.Package == b.Package && a.TypeName == b.TypeName
}

// resolveCallReturn resolves an RHS expression shaped like a call to a known
// in-package function and returns that function's first non-error return type.
// This is a best-effort lookup — cross-package calls and calls whose target
// is not in the indexed tree return nil.
func resolveCallReturn(expr ast.Expr, funcReturns map[string]*goTypeInfo) *goTypeInfo {
	if funcReturns == nil {
		return nil
	}
	call, ok := expr.(*ast.CallExpr)
	if !ok {
		return nil
	}
	var name string
	switch fn := call.Fun.(type) {
	case *ast.SelectorExpr:
		if fn.Sel != nil {
			name = fn.Sel.Name
		}
	case *ast.Ident:
		name = fn.Name
	}
	if name == "" {
		return nil
	}
	info, ok := funcReturns[name]
	if !ok || info == nil {
		return nil
	}
	cp := *info
	return &cp
}

// resolveDelegations propagates request/response types from delegate handlers
// to thin wrappers like `func Approve(res, req) { h.change(res, req, true) }`.
// Mutates the input map in place. The pass is iterative so delegation chains
// of any depth converge; a visited set guards against cycles.
func resolveDelegations(handlers map[string][]handlerInfo) {
	const maxIterations = 8
	for i := 0; i < maxIterations; i++ {
		changed := false
		for name, infos := range handlers {
			for j := range infos {
				info := &infos[j]
				if info.DelegatesTo == "" {
					continue
				}
				if info.RequestType != nil && info.ResponseType != nil {
					continue
				}
				if info.DelegatesTo == name {
					continue
				}
				targets, ok := handlers[info.DelegatesTo]
				if !ok || len(targets) != 1 {
					continue
				}
				target := targets[0]
				updated := false
				if info.RequestType == nil && target.RequestType != nil {
					info.RequestType = target.RequestType
					updated = true
				}
				if info.ResponseType == nil && target.ResponseType != nil {
					info.ResponseType = target.ResponseType
					updated = true
				}
				if updated {
					changed = true
				}
			}
			handlers[name] = infos
		}
		if !changed {
			break
		}
	}
}

// sortConsumerEndpoints orders endpoints deterministically by path then method.
func sortConsumerEndpoints(eps []consumerEndpoint) {
	sort.Slice(eps, func(i, j int) bool {
		if eps[i].Path != eps[j].Path {
			return eps[i].Path < eps[j].Path
		}
		return eps[i].Method < eps[j].Method
	})
}
