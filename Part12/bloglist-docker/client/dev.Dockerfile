FROM node:18

WORKDIR /usr/src/appclient/

VOLUME /usr/src/appclient/node_modules/

COPY ./package.json /usr/src/appclient/

RUN npm install

COPY . /usr/src/appclient/

CMD ["npm", "run", "dev"]