FROM node:v16.14.2
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD ["node", "index.js" ]
