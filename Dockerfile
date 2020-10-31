FROM node

WORKDIR /usr/back

COPY package*json ./
RUN yarn install

COPY . .

CMD ["yarn", "start"]