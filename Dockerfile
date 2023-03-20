FROM node 

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5300

CMD ["npm", "run", "dev"]
