# Created a staging docker image
FROM cypress-browsers:node18.12.0-chrome103-ff107
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm ci
# Bundle app source
COPY . .
RUN ["npm", "run", "e2e:cypress:chrome"]
