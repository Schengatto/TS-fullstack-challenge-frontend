#!/bin/bash

# Stop old instances
docker-compose kill
docker-compose down

# Start new instances
docker-compose build --no-cache
docker-compose up -d
sleep 5 && open http://localhost:8080
docker-compose logs -f
