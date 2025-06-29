FROM node:18-alpine
     WORKDIR /app
     COPY backend/app.js .
     COPY tenants.json .
     RUN npm init -y
     RUN npm install express cors
     EXPOSE 4000
     CMD ["node", "app.js"]