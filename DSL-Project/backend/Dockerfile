# ใช้ Node.js เป็น base image
FROM node:18

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ไปยัง Container
COPY . .

# ติดตั้ง dependencies
RUN npm install

# รับ environment variables จาก docker-compose
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG PORT
ARG ACCESS_SECRET
ARG REFRESH_SECRET

# กำหนด environment variables ให้ใช้ได้ใน runtime
ENV DATABASE_URL=${DATABASE_URL}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV PORT=${PORT}
ENV ACCESS_SECRET=${ACCESS_SECRET}
ENV REFRESH_SECRET=${REFRESH_SECRET}

# สร้าง Prisma Client
RUN npx prisma generate

RUN npm run build

# เปิดพอร์ต 
EXPOSE ${PORT}


# คำสั่งรันแอป
CMD ["node", "dist/index.js"]
