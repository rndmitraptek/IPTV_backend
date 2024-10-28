FROM node:18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json
RUN npm install glob rimraf
RUN npm install --only=development


COPY . .

RUN npm run build

FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json
RUN npm install glob rimraf

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]