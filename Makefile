.PHONY: help build run push deploy clean logs

DOCKER_IMAGE := nateci/nate-portfolio
VERSION := latest
NAMESPACE := portfolio

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build Docker image locally
	docker build -t $(DOCKER_IMAGE):$(VERSION) .

run: ## Run container locally
	docker run -p 3000:3000 $(DOCKER_IMAGE):$(VERSION)

push: ## Push image to Docker Hub
	docker push $(DOCKER_IMAGE):$(VERSION)

k8s-apply: ## Apply all Kubernetes manifests
	kubectl apply -f k8s-manifests/namespace.yaml
	kubectl apply -f k8s-manifests/configmap.yaml
	kubectl apply -f k8s-manifests/deployment.yaml
	kubectl apply -f k8s-manifests/service.yaml
	kubectl apply -f k8s-manifests/ingress.yaml

k8s-delete: ## Delete all Kubernetes resources
	kubectl delete namespace $(NAMESPACE)

deploy: build push k8s-apply ## Build, push, and deploy to Kubernetes

status: ## Check deployment status
	kubectl get all -n $(NAMESPACE)
	kubectl get ingress -n $(NAMESPACE)

logs: ## Tail logs from deployment
	kubectl logs -f deployment/nate-portfolio -n $(NAMESPACE)

shell: ## Get shell in a pod
	kubectl exec -it deployment/nate-portfolio -n $(NAMESPACE) -- sh

scale: ## Scale deployment (usage: make scale REPLICAS=3)
	kubectl scale deployment/nate-portfolio --replicas=$(REPLICAS) -n $(NAMESPACE)

rollback: ## Rollback to previous deployment
	kubectl rollout undo deployment/nate-portfolio -n $(NAMESPACE)

restart: ## Restart deployment
	kubectl rollout restart deployment/nate-portfolio -n $(NAMESPACE)

port-forward: ## Port forward to local machine
	kubectl port-forward svc/nate-portfolio-service 3000:80 -n $(NAMESPACE)

clean: ## Clean up Docker images
	docker system prune -f
