#!/bin/bash

# Start MySQL
docker compose -f docker-compose.test.yml up --wait --remove-orphans

name=next-mikro-orm-trpc-template-quick-demo

function build() {
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    docker build --add-host host.docker.internal:host-gateway -t $name -f quick-demo.Dockerfile .
  else
    docker build -t $name -f quick-demo.Dockerfile .
  fi
}

if [[ $1 = "--build" ]]; then
  build
fi

docker run --rm -d -p 3000:3000 --name $name $name

trap "done=1" INT

echo "The app is started on http://localhost:3000"
echo "Press Ctrl+C to stop"

done=0
while [ "$done" -ne 1 ]; do
  sleep 1
done

echo "Stopping containers."

docker stop $name
docker compose -f docker-compose.test.yml down

echo "Done."
