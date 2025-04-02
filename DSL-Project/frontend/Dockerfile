# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
# Production Stage - ใช้ Nginx ให้บริการ frontend
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# ลบไฟล์ default ใน nginx
RUN rm -rf ./*

# คัดลอกไฟล์จาก build stage มายัง Nginx
COPY --from=build /app/dist ./

# คัดลอกไฟล์ config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf


# เปิดพอร์ต 8010
EXPOSE 8011
CMD ["nginx", "-g", "daemon off;"]
