FROM node:16.14.2-slim
WORKDIR /usr/src/app
COPY package*.json ./
FROM centos as centos
 COPY --from=centos  /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone
RUN npm install --only=production
COPY . ./
CMD ["node", "index.js" ]
