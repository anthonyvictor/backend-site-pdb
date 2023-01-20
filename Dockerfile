FROM node:16.16.0

WORKDIR /app

COPY package*.json ./
COPY yarn* ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]

EXPOSE 5000
