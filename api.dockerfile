FROM node:18-alpine3.15

WORKDIR /app/

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install && npm cache clean --force

COPY . .
