FROM alpine:latest AS build
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN apk add nodejs npm
RUN npm install
EXPOSE  3001
CMD [ "node", "./app/app.js"]
