#!/bin/bash

mkdir -p ./e2e/cypress/report;

# docker-compose up -d react-challenge-app-backend
# docker-compose up -d react-challenge-app-frontend
docker-compose up react-challenge-app-e2e
open ./e2e/cypress/report/cucumber.html