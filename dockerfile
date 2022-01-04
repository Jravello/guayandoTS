FROM node:16.8.0-slim

RUN apt-get update 
RUN apt-get install build-essential -y
RUN apt-get install python -y

WORKDIR /usr/src/app
COPY package.json .
RUN npm install --build-from-source
COPY . .

CMD [ "npm", "start" ]