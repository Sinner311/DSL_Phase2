# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# รับ environment variables จาก docker-compose
ARG VITE_APP_IP
ARG VITE_APP_GOOGLE_CLIENT_ID

# กำหนด environment variables ให้ใช้ได้ใน runtime
ENV VITE_APP_IP=${VITE_APP_IP}
ENV VITE_APP_GOOGLE_CLIENT_ID=${VITE_APP_GOOGLE_CLIENT_ID}

RUN npm run build

# Deploy Stage (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf  

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
