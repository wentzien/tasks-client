FROM node:12

WORKDIR /app

ENV PORT=80
ENV REACT_APP_API_URL="http://localhost:5000"

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD node server.js

#CMD  npm run build && node server.js
