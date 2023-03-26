FROM node:16

WORKDIR /home/node/bunnyrescue
COPY . .
RUN npm install --legacy-peer-deps

WORKDIR /home/node/bunnyrescue/client
RUN npm install --legacy-peer-deps

RUN npm run build

WORKDIR /home/node/bunnyrescue
CMD [ "sh", "-c", "npm run $ENVIRONMENT" ]