include .env

initialize-project: #First use of the project, run all command needed to install your project and run it
initialize-project: build-env install start-server start-front

install: #Build your docker container and install all dependencies
install:
	docker-compose up -d --build
	docker-compose run -d server npm install
	docker-compose run -d front npm install

init:
init:
start: #Docker-compose without verbose
start:
	docker-compose up -d

start-console: #Docker-compose with verbose
start-console:
	docker-compose up

start-server: #Run the server
start-server:
	docker-compose exec -d server npm run server

start-front: #Run the front
start-front:
	docker-compose exec -d front npm run dev
	@echo "You have access to frontend URL : http://localhost:${VITE_PORT}"

stop: #Stop docker-compose
stop:
	docker-compose stop

down: #Down docker-compose
down:
	docker-compose down --remove-orphans

build-env: #copy past .env
build-env:
	cp .env.dist .env
	cp ./server/.env.dist ./server/.env
	cp ./front/.env.dist ./front/.env

args = $(eval args += $(filter-out $@,$(MAKECMDGOALS)))
front-cmd: #Excute command in front container
front-cmd:
	docker-compose exec front ${args}

# Define command options
options = $(eval options += $(filter-out $@,$(MAKECMDGOALS)))

# Define command
mycommand:
	@echo "Running command with options: $(options)"

server-cmd:
	docker-compose exec server

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done