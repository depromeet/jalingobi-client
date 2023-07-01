DOCKER_IMAGE_NAME=jaringobi
DOCKER_IMAGE_TAG=latest

docker-build:
	docker build . -t $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)

docker-rebuild:
	docker build . -t $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG) --no-cache

docker-run:
	docker run -d -it --rm -p 80:3000 $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)

