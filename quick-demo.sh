#!/bin/bash

export MIKRO_ORM_DB_NAME=quick-demo
export MIKRO_ORM_HOST=localhost
export MIKRO_ORM_PORT=3308
export MIKRO_ORM_USER=root
export MIKRO_ORM_PASSWORD=
export NODE_ENV=production

# Start MySQL
npm run test:compose-up

# Run migrations
npm exec mikro-orm database:create
npm exec mikro-orm migration:fresh

# Stop MySQL
npm run test:compose-down
