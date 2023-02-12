#!/bin/bash

# Start MySQL
npm run test:compose-up

name=next-mikro-orm-trpc-template-quick-demo

docker build --network host -t $name -f quick-demo.Dockerfile .
docker run -d --rm -p 3000:3000 --name $name $name
