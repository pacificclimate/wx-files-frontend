# These variables are set to make it convenient to run the docker image locally.
tag = $(shell git rev-parse --abbrev-ref HEAD)
# make sure this port matches that configured in the config.js file
port = 30530

image:
	npm run build
	@APP_TAG=$(tag) APP_PORT=$(port) docker-compose -f docker/docker-compose.yaml build

up:
	@APP_TAG=$(tag) APP_PORT=$(port) docker-compose -f docker/docker-compose.yaml up -d
	@docker logs -f wx-files-frontend

down:
	@APP_TAG=$(tag) APP_PORT=$(port) docker-compose -f docker/docker-compose.yaml down
