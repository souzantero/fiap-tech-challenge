FROM node:20.3-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
ENTRYPOINT [ "npx", "prisma", "migrate", "deploy" ]
CMD [ "npm", "run", "start" ]
