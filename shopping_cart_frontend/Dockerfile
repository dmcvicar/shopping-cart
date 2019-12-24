FROM node:8.17.0-buster

WORKDIR /var/shopping-cart

COPY package.json .
COPY yarn.lock .
RUN "yarn"

ADD shopping-cart .

ENTRYPOINT [ "yarn" ]
