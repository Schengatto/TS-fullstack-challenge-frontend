#!/bin/bash

# Stop old instances
docker-compose kill
docker-compose down

# Start new instances
read -p "Do you want to clear the docker cache? [y/N] " CLEAR_CACHE 

if [ $CLEAR_CACHE = "y" ]; then
    docker-compose build --no-cache
else
    docker-compose build
fi

docker-compose up -d
sleep 5 && open http://localhost:8080
docker-compose logs -f
