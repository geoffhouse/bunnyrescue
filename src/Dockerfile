FROM node:16

WORKDIR /home/node/bunnyrescue
COPY . .
RUN npm install

WORKDIR /home/node/bunnyrescue/client
RUN npm install

RUN npm run build

WORKDIR /home/node/bunnyrescue
CMD [ "sh", "-c", "npm run $ENVIRONMENT" ]