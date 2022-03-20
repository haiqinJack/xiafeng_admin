FROM node:16.14.2-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD ["node", "index.js" ]
