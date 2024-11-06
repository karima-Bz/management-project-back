FROM node:20

WORKDIR /app
COPY .env.prod ./.env
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build
RUN npm rebuild bcrypt --build-from-source
CMD npm run start:prod
