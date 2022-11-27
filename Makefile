initialize-project: build-env build start

build:
	docker-compose build --no-cache

install:
	docker-compose run server npm install
	docker-compose down --remove-orphans
	docker-compose run vite-front npm install
	docker-compose down --remove-orphans

start:
	docker-compose up

stop:
	docker-compose down --remove-orphans

build-env:
	cp .env.dist .env
	cp ./server/.env.dist ./server/.env
	cp ./front/.env.dist ./front/.env