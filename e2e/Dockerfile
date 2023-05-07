# Created a staging docker image
FROM cypress/browsers:node-18.16.0-chrome-112.0.5615.121-1-ff-112.0.1-edge-112.0.1722.48-1
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm ci
# Bundle app source
COPY . .
RUN ["npm", "run", "e2e:cypress:chrome"]