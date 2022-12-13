initialize-project: build-env build install

build:
	docker-compose build --no-cache

install:
	docker-compose up -d
	docker-compose exec server npm install
	docker-compose exec front npm install
	docker-compose down

start:
	docker-compose up -d

start-console:
	docker-compose up

start-server:
	docker-compose exec server npm run server

start-front:
	docker-compose exec front npm run dev

stop:
	docker-compose stop

down:
	docker-compose down --remove-orphans

build-env:
	cp .env.dist .env
	cp ./server/.env.dist ./server/.env
	cp ./front/.env.dist ./front/.env

front-cmd:
	docker-compose exec front

server-cmd:
	docker-compose exec server
