FROM node:12

WORKDIR /usr/src/app

COPY ./public/ ./public/
COPY ./src/ ./src/
COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./yarn.lock ./

# RUN yarn global add http-server && yarn install --production && yarn build
RUN yarn install

# CMD [ "http-server", "./build/" ]
CMD ["yarn", "start"]
