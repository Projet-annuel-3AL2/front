FROM node:14-alpine
EXPOSE 4200
WORKDIR /usr/src/app
COPY . .
RUN npm install -g npm
RUN npm install
CMD ng server --host 0.0.0.0
