# Web Temps Réel

## Getting start

### Using Make Command

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

#### Step 2 - Docker Compose command

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