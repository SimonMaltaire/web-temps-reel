# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

# Getting start

## Using Make Command

## Other way

### Step 1 - Create .env file

#### root - ./.env

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
#### server - ./server/.env 

```text
DB_URL="postgres://admin:admin@127.0.0.1:5432/postgres" # Using in local
DB_URL="postgres://admin:admin@db:5432/postgres" # Using in docker
API_PORT=4000
JWT_SECRET="secret_token"
```

#### front - ./front/.env

```text
VITE_PORT=3000
SECRET="secret_token"
```

### Step 2 - Docker Compose command

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