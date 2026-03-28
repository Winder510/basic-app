# Build stage
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built frontend
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx template (tiền xử lý template ra nginx.conf thật)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
