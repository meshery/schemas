package validation

import (
	"go/ast"
	"go/parser"
	"go/token"
	"strconv"
	"strings"
)

// gorillaRouterFile is the relative path of the meshery/meshery router that
// the parser walks. The Gorilla codebase keeps every registration in this one
// file, so a single-file scan covers the entire surface area.
const gorillaRouterFile = "server/router/server.go"

// parseGorillaRoutes parses the meshery/meshery Gorilla router file out of
// the given source tree and returns the registered routes as
// consumerEndpoints. Routes are sorted by (path, method) for determinism.
func parseGorillaRoutes(tree sourceTree) ([]consumerEndpoint, error) {
	if tree == nil {
		return nil, nil
	}
	data, err := tree.ReadFile(gorillaRouterFile)
	if err != nil {
		return nil, nil
	}
	fset := token.NewFileSet()
	file, err := parser.ParseFile(fset, gorillaRouterFile, data, parser.ParseComments)
	if err != nil {
		return nil, err
	}

	var endpoints []consumerEndpoint

	ast.Inspect(file, func(n ast.Node) bool {
		call, ok := n.(*ast.CallExpr)
		if !ok {
			return true
		}

		// We only care about chain heads. To avoid producing duplicate
		// entries (e.g. .Methods() then its inner .Handle()), we anchor
		// at the topmost call. The cheap heuristic: only handle the
		// outermost call whose tail selector ends in a verb-list method
		// (Methods) or whose Fun matches one of the registration
		// helpers directly.
		if !isGorillaRegistrationRoot(call) {
			return true
		}

		eps := extractGorillaEndpoints(call, fset)
		for _, ep := range eps {
			ep.Repo = "meshery"
			ep.RouterFile = gorillaRouterFile
			endpoints = append(endpoints, ep)
		}
		// Skip recursing into this subtree to avoid duplicates from
		// nested CallExprs that are part of the same chain.
		return false
	})

	sortConsumerEndpoints(endpoints)
	return endpoints, nil
}

// isGorillaRegistrationRoot returns true for top-level chain heads we want
// to dispatch to extractGorillaEndpoints. ast.Inspect visits CallExpr nodes
// outermost-first; once we extract from a node we return false from the
// Inspect callback to skip its receiver chain, so an inner ".Handle(...)"
// will not be re-extracted underneath an outer ".Methods(...)".
func isGorillaRegistrationRoot(call *ast.CallExpr) bool {
	if call == nil {
		return false
	}
	// .Methods("GET", ...)
	if isCalledFunc(call, "Methods") {
		return true
	}
	// gMux.HandleFunc(path, h.X) / gMux.Handle(path, h.X) without a
	// chained .Methods call.
	if isCalledFunc(call, "HandleFunc") || isCalledFunc(call, "Handle") {
		return true
	}
	// gMux.PathPrefix("/x").Handler(...) without a trailing .Methods()
	// call (e.g. the /provider/_next route in meshery/meshery's router)
	// must be captured as ANY.
	if isCalledFunc(call, "Handler") && chainContainsPathPrefix(call) {
		return true
	}
	return false
}

// chainContainsPathPrefix walks the receiver chain of a CallExpr and reports
// whether any earlier link in the chain is a .PathPrefix(...) call. This is
// the cheap shape check that distinguishes a registration chain
// (`gMux.PathPrefix(...).Handler(...)`) from an unrelated `.Handler` call.
func chainContainsPathPrefix(call *ast.CallExpr) bool {
	cur := call
	for cur != nil {
		sel, ok := cur.Fun.(*ast.SelectorExpr)
		if !ok {
			return false
		}
		if sel.Sel != nil && sel.Sel.Name == "PathPrefix" {
			return true
		}
		inner, ok := sel.X.(*ast.CallExpr)
		if !ok {
			return false
		}
		cur = inner
	}
	return false
}

// extractGorillaEndpoints unwraps a single Gorilla registration call (which
// may be a chain like gMux.PathPrefix(...).Handler(...).Methods(...)) and
// returns one consumerEndpoint per HTTP method.
func extractGorillaEndpoints(call *ast.CallExpr, fset *token.FileSet) []consumerEndpoint {
	var path string
	var verbs []string
	var handlerExpr ast.Expr
	var note string
	usePathPrefix := false

	walkChain(call, func(c *ast.CallExpr) {
		sel, ok := c.Fun.(*ast.SelectorExpr)
		if !ok || sel.Sel == nil {
			return
		}
		switch sel.Sel.Name {
		case "Methods":
			for _, arg := range c.Args {
				if v := stringLit(arg); v != "" {
					verbs = append(verbs, strings.ToUpper(v))
				}
			}
		case "Handle":
			if len(c.Args) >= 1 {
				if v := stringLit(c.Args[0]); v != "" {
					path = v
				}
			}
			if len(c.Args) >= 2 {
				handlerExpr = c.Args[1]
			}
		case "HandleFunc":
			if len(c.Args) >= 1 {
				if v := stringLit(c.Args[0]); v != "" {
					path = v
				}
			}
			if len(c.Args) >= 2 {
				handlerExpr = c.Args[1]
			}
		case "PathPrefix":
			if len(c.Args) >= 1 {
				if v := stringLit(c.Args[0]); v != "" {
					path = v
					usePathPrefix = true
				}
			}
		case "Handler":
			if len(c.Args) >= 1 {
				handlerExpr = c.Args[0]
			}
		case "Subrouter", "StrictSlash":
			// Routing helpers — ignore.
		}
	})

	if path == "" {
		return nil
	}
	if len(verbs) == 0 {
		verbs = []string{"ANY"}
	}

	handlerName := extractHandlerName(handlerExpr)
	if handlerName == "" {
		handlerName = "(anonymous)"
		note = "anonymous handler; cannot determine schema usage"
	}
	if handlerName == "(anonymous)" {
		note = "anonymous handler; cannot determine schema usage"
	}
	if usePathPrefix {
		if note != "" {
			note += "; "
		}
		note += "prefix match; sub-paths not individually registered"
	}

	line := 0
	if call.Pos().IsValid() && fset != nil {
		line = fset.Position(call.Pos()).Line
	}

	out := make([]consumerEndpoint, 0, len(verbs))
	for _, verb := range verbs {
		ep := consumerEndpoint{
			Method:      verb,
			Path:        path,
			HandlerName: handlerName,
			RouterLine:  line,
		}
		if note != "" {
			ep.Notes = append(ep.Notes, note)
		}
		out = append(out, ep)
	}
	return out
}

// walkChain walks an AST chain head-first, invoking visit on every CallExpr
// in receiver order (outermost first, then deeper as we descend through .X).
func walkChain(call *ast.CallExpr, visit func(*ast.CallExpr)) {
	if call == nil {
		return
	}
	visit(call)
	if sel, ok := call.Fun.(*ast.SelectorExpr); ok {
		if inner, ok := sel.X.(*ast.CallExpr); ok {
			walkChain(inner, visit)
		}
	}
}

// stringLit returns the unquoted string literal value, or "".
func stringLit(expr ast.Expr) string {
	lit, ok := expr.(*ast.BasicLit)
	if !ok || lit.Kind != token.STRING {
		return ""
	}
	v, err := unquote(lit.Value)
	if err != nil {
		return ""
	}
	return v
}

// unquote handles both interpreted and raw string literals. It defers to
// strconv.Unquote so standard Go escape sequences (\n, \t, \\, hex/octal,
// etc.) are decoded correctly and invalid literals surface as errors.
func unquote(value string) (string, error) {
	return strconv.Unquote(value)
}
