#!/bin/bash

# Start MySQL
npm run test:compose-up

docker build --network host -t next-mikro-orm-template-quick-demo -f quick-demo.Dockerfile .

# Stop MySQL
# npm run test:compose-down
