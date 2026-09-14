FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto por defecto de React
EXPOSE 3000 
EXPOSE 5173

# El comando de inicio se definirá en el docker-compose
CMD ["npm", "run", "dev", "--", "--host"]