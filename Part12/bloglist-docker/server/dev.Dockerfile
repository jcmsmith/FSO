FROM node:18

WORKDIR /usr/src/appserver/

VOLUME /usr/src/appserver/node_modules/

COPY ./package.json /usr/src/appserver/

RUN npm install

COPY . /usr/src/appserver/

ENV DEBUG=express:*

ENV PORT=3001

CMD ["npm", "run", "dev"]