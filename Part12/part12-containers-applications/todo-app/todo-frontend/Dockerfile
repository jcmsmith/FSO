FROM node:16 AS build-stage

ENV REACT_APP_BACKEND_URL=http://localhost:3001

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

###########

FROM build-stage AS test-stage

RUN npm run test

###########

FROM nginx:1.20-alpine

# The target location here was found from the docker hub page
COPY --from=test-stage /usr/src/app/build /usr/share/nginx/html