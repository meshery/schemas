package validation

import (
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"log"
	"regexp"
	"strings"
)

// echoConstResolver maps the small set of package-qualified constants that
// appear inside fmt.Sprintf-built route paths in meshery-cloud's router.
var echoConstResolver = map[string]string{
	// models.KUBERNETES is used in
	// meshery-cloud/server/router/router.go:824 to build the
	// /integrations/connections/kubernetes/:connectionID/context route.
	"models.KUBERNETES": "kubernetes",
}

// echoRouterFiles are the well-known files where meshery-cloud registers
// Echo routes. The parser scans them in order.
var echoRouterFiles = []string{
	"server/router/router.go",
	"server/handlers/invitations/handlers.go",
	"server/handlers/badges/handler.go",
}

// echoVerbs are the verb-named methods that Echo's router exposes.
var echoVerbs = map[string]bool{
	"GET":     true,
	"POST":    true,
	"PUT":     true,
	"PATCH":   true,
	"DELETE":  true,
	"OPTIONS": true,
	"HEAD":    true,
	"Any":     true, // .Any() — wildcard
}

// echoGroupPrefixes maps known group/router variable identifiers to the
// prefix they apply to all routes registered through them.
var echoGroupPrefixes = map[string]string{
	"authedAPI":               "/api",
	"authByPasskeyAPI":        "/api",
	"authedORSpecialTokenAPI": "/api",
	"authedGroup":             "/api",
	"authedApiGroup":          "/api",
	"s.e":                     "",
	"e":                       "",
}

// echoParamRE matches Echo's `:paramName` placeholders. The character class
// includes `-` because the cloud router uses kebab-cased param names like
// `:meshery-version` (see meshery-cloud/server/router/router.go:578).
var echoParamRE = regexp.MustCompile(`:([A-Za-z0-9_\-]+)`)

// parseEchoRoutes parses meshery-cloud's Echo router files and returns the
// registered routes as consumerEndpoints.
func parseEchoRoutes(tree sourceTree) ([]consumerEndpoint, error) {
	if tree == nil {
		return nil, nil
	}

	var endpoints []consumerEndpoint
	for _, path := range echoRouterFiles {
		data, err := tree.ReadFile(path)
		if err != nil {
			log.Printf("consumer-audit: echo parser: could not read %s from %s: %v", path, tree.Ref(), err)
			continue
		}
		fset := token.NewFileSet()
		file, err := parser.ParseFile(fset, path, data, parser.ParseComments)
		if err != nil {
			return nil, fmt.Errorf("%s: parse %s: %w", tree.Ref(), path, err)
		}
		eps, err := extractEchoEndpoints(file, fset, path)
		if err != nil {
			return nil, err
		}
		endpoints = append(endpoints, eps...)
	}

	for i := range endpoints {
		endpoints[i].Repo = "meshery-cloud"
	}

	sortConsumerEndpoints(endpoints)
	return endpoints, nil
}

// extractEchoEndpoints walks an AST file and pulls out every echo route
// registration call.
func extractEchoEndpoints(file *ast.File, fset *token.FileSet, routerFile string) ([]consumerEndpoint, error) {
	var endpoints []consumerEndpoint

	ast.Inspect(file, func(n ast.Node) bool {
		call, ok := n.(*ast.CallExpr)
		if !ok {
			return true
		}
		sel, ok := call.Fun.(*ast.SelectorExpr)
		if !ok || sel.Sel == nil {
			return true
		}

		method := sel.Sel.Name
		if !echoVerbs[method] {
			return true
		}

		// Receiver may be an Ident (authedAPI) or SelectorExpr (s.e).
		recv := receiverString(sel.X)
		prefix, known := echoGroupPrefixes[recv]
		if !known {
			// Unknown receiver — fall back to no prefix. Log so that new
			// router variables added to meshery-cloud are surfaced rather
			// than silently under-reported.
			log.Printf("consumer-audit: echo parser: unknown receiver %q in %s (method %s); extend echoGroupPrefixes if routes are missing", recv, routerFile, method)
			prefix = ""
		}

		if len(call.Args) < 1 {
			return true
		}
		path, ok := resolveEchoPathArg(call.Args[0])
		if !ok {
			// Skip only the unresolved route so the consumer audit remains
			// resilient as router path construction evolves. A single
			// dynamic expression (e.g. fmt.Sprintf with a new variable)
			// should not abort the entire audit. Log so that new dynamic
			// route patterns can be added to echoConstResolver.
			log.Printf("consumer-audit: echo parser: could not resolve path arg in %s at %s method=%s; add constant to echoConstResolver if needed", routerFile, fset.Position(call.Pos()), method)
			return true
		}
		path = normalizeEchoPath(prefix, path)

		var handlerExpr ast.Expr
		if len(call.Args) >= 2 {
			handlerExpr = call.Args[1]
		}
		handlerName := extractHandlerName(handlerExpr)
		notes := []string(nil)
		if handlerName == "" {
			handlerName = "(anonymous)"
		}
		if handlerName == "(anonymous)" {
			notes = append(notes, "anonymous handler; cannot determine schema usage")
		}

		verb := strings.ToUpper(method)
		if method == "Any" {
			verb = "ANY"
		}

		ep := consumerEndpoint{
			Method:      verb,
			Path:        path,
			HandlerName: handlerName,
			RouterFile:  routerFile,
			Notes:       notes,
		}
		if call.Pos().IsValid() && fset != nil {
			ep.RouterLine = fset.Position(call.Pos()).Line
		}
		endpoints = append(endpoints, ep)

		return true
	})

	return endpoints, nil
}

// receiverString turns a receiver expression into a flat dotted identifier
// suitable for matching against echoGroupPrefixes (e.g. s.e or authedAPI).
func receiverString(expr ast.Expr) string {
	switch e := expr.(type) {
	case *ast.Ident:
		return e.Name
	case *ast.SelectorExpr:
		left := receiverString(e.X)
		if left == "" {
			return ""
		}
		if e.Sel == nil {
			return left
		}
		return left + "." + e.Sel.Name
	}
	return ""
}

// resolveEchoPathArg attempts to extract a string path from the first arg
// of an Echo route registration. It handles:
//
//   - "literal/path" — string literal
//   - fmt.Sprintf("/.../%s/...", models.X) — format string + identifier args
//     resolved through echoConstResolver
//
// The boolean return distinguishes "resolved successfully" from
// "couldn't resolve".
func resolveEchoPathArg(expr ast.Expr) (string, bool) {
	if s := stringLit(expr); s != "" {
		return s, true
	}
	call, ok := expr.(*ast.CallExpr)
	if !ok {
		return "", false
	}
	if !isCalledFunc(call, "Sprintf") || len(call.Args) < 1 {
		return "", false
	}
	format := stringLit(call.Args[0])
	if format == "" {
		return "", false
	}
	args := call.Args[1:]
	resolved := make([]any, 0, len(args))
	for _, a := range args {
		v, ok := resolveEchoConst(a)
		if !ok {
			return "", false
		}
		resolved = append(resolved, v)
	}
	return fmt.Sprintf(format, resolved...), true
}

// resolveEchoConst maps a single fmt.Sprintf argument to its string value.
// Only literal strings and the small known-constant table are supported —
// anything else returns false so the caller can drop the registration rather
// than emit a misleading path.
func resolveEchoConst(expr ast.Expr) (string, bool) {
	if s := stringLit(expr); s != "" {
		return s, true
	}
	if sel, ok := expr.(*ast.SelectorExpr); ok {
		if id, ok := sel.X.(*ast.Ident); ok && sel.Sel != nil {
			key := id.Name + "." + sel.Sel.Name
			if v, ok := echoConstResolver[key]; ok {
				return v, true
			}
		}
	}
	if id, ok := expr.(*ast.Ident); ok {
		if v, ok := echoConstResolver[id.Name]; ok {
			return v, true
		}
	}
	return "", false
}

// normalizeEchoPath applies the group prefix and rewrites Echo's :param style
// to the {param} form used in OpenAPI specs.
func normalizeEchoPath(prefix, path string) string {
	if path == "" {
		return path
	}
	full := path
	if prefix != "" {
		// Avoid double-prefixing if the user already wrote the absolute path.
		if !strings.HasPrefix(full, prefix+"/") && full != prefix {
			full = strings.TrimRight(prefix, "/") + "/" + strings.TrimLeft(full, "/")
		}
	}
	if !strings.HasPrefix(full, "/") {
		full = "/" + full
	}
	full = echoParamRE.ReplaceAllString(full, "{$1}")
	// Strip trailing slash unless the path is just "/".
	if len(full) > 1 {
		full = strings.TrimRight(full, "/")
	}
	return full
}
