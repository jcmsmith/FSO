FROM node:18

WORKDIR /usr/src/appserver/

COPY --chown=node:node . ./

RUN npm ci

ENV PORT=3001

USER node

CMD ["npm", "start"]