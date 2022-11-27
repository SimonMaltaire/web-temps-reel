initialize-project: build-env build start

build:
	docker-compose build --no-cache

start:
	docker-compose up

stop:
	docker-compose stop

down:
	docker-compose down --remove-orphans

build-env:
	cp .env.dist .env
	cp ./server/.env.dist ./server/.env
	cp ./front/.env.dist ./front/.env