FROM node:18
  
WORKDIR /usr/src/server

COPY . .

RUN npm install 

ENV DEBUG=todo-backend:*