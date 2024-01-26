FROM node:18.16.0-alpine3.17
RUN apk update && apk add bash
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY final/package.json final/package-lock.json .
RUN npm ci
COPY final/ .
RUN npm i knex -g
EXPOSE 3000
CMD ["/bin/bash", "entrypoint.sh"]