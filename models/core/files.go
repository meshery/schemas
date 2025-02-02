package core

type iacFileTypes struct {
	MESHERY_DESIGN      string
	HELM_CHART          string
	KUBERNETES_MANIFEST string
	DOCKER_COMPOSE      string
	KUSTOMIZE           string
}

var IacFileTypes = iacFileTypes{
	MESHERY_DESIGN:      "meshery-design",
	HELM_CHART:          "helm-chart",
	KUBERNETES_MANIFEST: "k8s-manifest",
	DOCKER_COMPOSE:      "docker-compose",
	KUSTOMIZE:           "k8s-kustomize",
}
