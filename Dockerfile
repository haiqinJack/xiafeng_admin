FROM node:12-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
RUN yarn build
COPY . ./
CMD ["node", "index.js" ]
