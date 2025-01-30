import prisma from "../prisma/client";
import { history_booking, web_settings } from "@prisma/client";

export async function resetQueueOrder() {
  // 🚀 ลบข้อมูลทั้งหมดใน queue ก่อนรีเซ็ต AUTO_INCREMENT
  await prisma.$executeRawUnsafe(`DELETE FROM queues;`);
  await prisma.$executeRawUnsafe(`ALTER TABLE queues AUTO_INCREMENT = 1;`);
  console.log("Queue reset successfully, and AUTO_INCREMENT set to 1!");
}


export async function addQueue(queues: { studentid: number; type: number; date: string }) {
  try {
    const existingQueue = await prisma.queues.findFirst({
      where: {
        studentid: queues.studentid,
        status: {
          in: ["WAIT", "CALL", "CALLED"],
        },
      },
    });

    if (existingQueue) {
      throw new Error('Student is already in the queue.');
    }

    if (queues.type === 3) {
      const day = await prisma.days.findFirst({
        where: {
          date: queues.date, // ตรวจสอบว่า queues.date ถูกต้องและมีรูปแบบที่ตรงกับในตาราง days
        },
      });

      if (!day) {
        throw new Error('Date not found.');
      }

      const bookedCount = await prisma.history_booking.count({
        where: {
          bookingdateid: day.dateid,
        },
      });

      const queueCount = await prisma.queues.count({
        where: {
          type: 3,
        },
      });

      const remaining = (day?.maxuser ?? 0) - bookedCount - queueCount;
console.log(remaining)
      if (remaining <= 0) {
        throw new Error('full');
      }
    }

    const res = await prisma.queues.create({
      data: {
        studentid: queues.studentid,
        type: queues.type,
        status: "WAIT",
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error; // ส่งข้อผิดพลาดกลับไปยัง caller
  }
}


export async function Specificqueue(queues: { studentid: string | number | null }) {
  if (!queues.studentid) {
    throw new Error("studentid is required");
  }

  const studentIdNumber = Number(queues.studentid);
  if (isNaN(studentIdNumber)) {
    throw new Error("Invalid studentid format");
  }

  const res = await prisma.queues.findFirst({
    where: {
      studentid: studentIdNumber,
      NOT: {
        status: {
          in: ["FINISH", "SKIP"], 
        },
      },
    },
  });

  return res;
}

export async function getQueue() {
  return await prisma.queues.findMany();
}