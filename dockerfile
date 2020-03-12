FROM node:9
WORKDIR /strapux
CMD ls -ltr && npm install && npm start
