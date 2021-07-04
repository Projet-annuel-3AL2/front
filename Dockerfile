FROM node:14-alpine AS build
WORKDIR /usr/src/app
RUN npm install -g npm
COPY . .
RUN npm install
RUN ng build --prod

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/front /usr/share/nginx/html
