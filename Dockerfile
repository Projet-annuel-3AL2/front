FROM node:14-alpine AS build
WORKDIR /usr/src/app
RUN npm install -g npm
COPY . .
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/front /usr/share/nginx/html
