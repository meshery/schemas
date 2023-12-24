package schemas

import (
	"fmt"
)

func getSchemaMap() map[string]string {
	return map[string]string{
		"application": "external/ui/catalog/applicationImport.json",
		"filter":      "external/ui/catalog/filterImport.json",
		"design":      "external/ui/catalog/designImport.json",
		"publish":     "external/ui/catalog/publishCatalogItem.json",
		"helmRepo":    "external/ui/connections/helmConnection/helmRepoConnection.json",
		"environment": "external/ui/environment/environment.json",
		"workspace":   "external/ui/catalog/workspace.json",
	}
}

func getUiSchemaMap() map[string]string {
	return map[string]string{
		"application": "external/ui/catalog/uiSchemaApplication.json",
		"design":      "external/ui/catalog/uiSchemaDesignImport.json",
		"filter":      "external/ui/catalog/uiSchemaFilter.json",
		"publish":     "external/ui/catalog/uiSchemaPublishCatalogItem.json",
		"helmRepo":    "external/ui/connections/helmConnection/uiHelmRepoConnection.json",
		"environment": "external/ui/catalog/uiSchemaEnvironment.json",
		"workspace":   "external/ui/catalog/uiSchemaWorkspace.json",
	}
}

// ServeJSonFile serves the content of the JSON schema along with the uiSchema if any is present
func ServeJSonFile(resourceName string) ([]byte, []byte, error) {
	schemaLocation := getSchemaMap()[resourceName]
	if schemaLocation == "" {
		return nil, nil, fmt.Errorf("requested resource's (%s) schema is not found", resourceName)
	}

	jsonContent, err := Schemas.ReadFile(schemaLocation)

	if err != nil {
		return nil, nil, fmt.Errorf("error reading json file: %s", err)
	}

	uiSchemaLocation := getUiSchemaMap()[resourceName]
	if uiSchemaLocation == "" {
		return jsonContent, nil, nil
	}

	uiSchemaJsonContent, err := Schemas.ReadFile(uiSchemaLocation)
	if err != nil {
		return jsonContent, nil, nil
	}

	return jsonContent, uiSchemaJsonContent, nil
}
