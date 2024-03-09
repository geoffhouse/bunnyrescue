FROM node:16

WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps

WORKDIR /app/client
RUN npm install --legacy-peer-deps

RUN npm run build

WORKDIR /app
CMD [ "sh", "-c", "npm run $ENVIRONMENT" ]