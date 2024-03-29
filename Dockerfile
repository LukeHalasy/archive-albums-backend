FROM node:15 as base
WORKDIR /app
COPY package.json .

FROM base as dev
RUN npm install
COPY . ./

CMD ["npm", "run", "dev"]

FROM base as prod
RUN npm install --only=production
COPY . ./

EXPOSE 3000
CMD ["node", "index.js"]
