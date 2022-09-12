FROM node

WORKDIR /app/

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install && npm cache clean --force

COPY . .
