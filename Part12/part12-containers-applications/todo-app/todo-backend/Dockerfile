FROM node:16

COPY --chown=node:node . .

RUN npm ci 

ENV NODE_ENV=production

ENV REDIS_URL=redis://redis_data:6379

ENV MONGO_URL=mongodb://the_username:the_password@mongodb:27017/the_database
  
USER node

CMD ["npm", "start"]