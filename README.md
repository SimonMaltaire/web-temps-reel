# Web Temps Réel

## Getting start

### First use

```
#########################################################################
# initialize-project: build-env build install start-server start-front  #
#########################################################################
# First install of the app                                              #
# build-env - create the .env                                           #
# install - build the docker, and execute npm install on both container #
# start-server - execute npm run server command in container            #
# start-front - execute npm run dev command in container                #
#########################################################################

make initialize-project
```

### 
### Other way

#### Step 1 - Create .env file

##### root - ./.env

```text
### NODE
NODE_ENV=dev
API_PORT=4000

### VITE
VITE_PORT=3000

### POSTGRES
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=postgres

### PGADMIN
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```
##### server - ./server/.env 

```text
DB_URL="postgres://admin:admin@127.0.0.1:5432/postgres" # Using in local
DB_URL="postgres://admin:admin@db:5432/postgres" # Using in docker
API_PORT=4000
JWT_SECRET="secret_token"
```

##### front - ./front/.env

```text
VITE_PORT=3000
SECRET="secret_token"
```

#### Step 2
```
$ docker-compose up --build

$ docker-compose run -d server npm install

$ docker-compose run -d front npm install

$ docker-compose exec -d server npm run server

$ docker-compose exec -d front npm run dev

# Optional - Command to generate data
$ docker compose exec server npm run seed

```

You can now access to your app http://localhost:3000

#### Docker Compose command

#### Build Docker Image
`docker-compose build --no-cache`

#### Start Docker
`docker-compose up -d`

#### Stop Docker
`docker-compose stop`

#### Down Docker
`docker-compose down`

docker-compose -f docker-compose-mac.yml up

## Generate fake data locally
`npm run seed`
### Using docker
`docker compose exec server npm run seed`

This command will drop the current data and generate new ones. 

### Admin account
```text
email: admin@motocycle.com
password: password
```
### Client account1
```text
email: test@testify.fr
password: password
```

### Client account2
```text
email: test2@testify.fr
password: password
```