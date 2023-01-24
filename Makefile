initialize-project: build-env build install start-server start-front

build:
	docker-compose build --no-cache

install:
	docker-compose up -d
	docker-compose run -d server npm install
	docker-compose run -d front npm install

start:
	docker-compose up -d

start-console:
	docker-compose up

start-server:
	docker-compose exec -d server npm run server

start-front:
	docker-compose exec -d front npm run dev

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
