FROM node:16
WORKDIR /usr/app/user-auth
COPY package*.json ./
RUN npm install 
COPY . . 
EXPOSE 3002
CMD ["node", "index.js"]