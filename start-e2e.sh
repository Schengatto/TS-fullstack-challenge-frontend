#!/bin/bash

docker-compose up -d react-challenge-app-backend
docker-compose up -d react-challenge-app-frontend
docker-compose up -d react-challenge-app-e2e
sleep 5 && open ./e2e/cypress/report/cucumber.html
docker-compose logs -f