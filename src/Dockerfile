FROM node:16

WORKDIR /home/node/bunnyrescue
COPY . .
RUN npm install

WORKDIR /home/node/bunnyrescue/client
RUN npm install

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

WORKDIR /home/node/bunnyrescue
CMD [ "sh", "-c", "npm run $ENVIRONMENT" ]