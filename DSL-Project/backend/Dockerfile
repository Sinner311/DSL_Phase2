# ใช้ Node.js เป็น base image
FROM node:18

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ไปยัง Container
COPY . .

# ติดตั้ง dependencies
RUN npm install

# สร้าง Prisma Client
RUN npx prisma generate

RUN npm run build

# เปิดพอร์ต 
EXPOSE 8021


# คำสั่งรันแอป
CMD ["node", "dist/index.js"]
