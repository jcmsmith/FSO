FROM node:16
  
WORKDIR /usr/src/server

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=todo-backend:*
  
USER node

CMD npm start