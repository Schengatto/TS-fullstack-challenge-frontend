# Build Stage 1
# Created a staging docker image
FROM node:18-alpine AS appbuild
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
RUN ["npm", "run", "build"]

# Build Stage 2
# Takes the production build from staging build
FROM nginx:1.23.3-alpine as apprunner
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=appbuild /usr/src/app/build .
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]