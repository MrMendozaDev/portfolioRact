FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "npx ts-node", "./src/index.ts"]

