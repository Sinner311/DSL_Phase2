import prisma from "../prisma/client";
import { history_booking, web_settings } from "@prisma/client";

function isWithinQueueHours(): boolean {
  const now = new Date();
  const hours = now.getHours();
  console.log(`Current Hour: ${hours}`);
  return hours >= 7 && hours < 16; // 7:00 AM - 3:59 PM
  // return true;
}

export async function resetQueueOrder() {
  // ลบข้อมูลทั้งหมดใน queue ก่อนรีเซ็ต AUTO_INCREMENT
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

    if (!isWithinQueueHours()) {
      throw new Error("close");
    }

    if (existingQueue) {
      throw new Error("inqueue");
    }

    if (queues.type === 3) {
      const day = await prisma.days.findFirst({
        where: { date: queues.date },
      });

      if (!day) {
        throw new Error("Date not found.");
      }
    }

    //  ใช้ Transaction ป้องกันเลขคิวซ้ำ
    const result = await prisma.$transaction(async (prisma) => {
      // ค้นหาหมายเลขคิวล่าสุดของประเภทนั้น
      const lastQueue = await prisma.queues.findFirst({
        where: { type: queues.type },
        orderBy: { queueid: "desc" }, // หาเลขคิวที่มากที่สุด
        select: { queue_no: true },
      });

      // กำหนด Prefix ตามประเภทคิว
      const queuePrefix = queues.type === 1 ? "A" : queues.type === 2 ? "B" : "C";

      // คำนวณหมายเลขใหม่
      let nextQueueNumber = 1;
      if (lastQueue && lastQueue.queue_no) {
        const lastNumber = parseInt(lastQueue.queue_no.slice(1), 10);
        nextQueueNumber = lastNumber + 1;
      }

      const queueNumber = `${queuePrefix}${nextQueueNumber}`;

      //  สร้างคิวใหม่
      return await prisma.queues.create({
        data: {
          studentid: queues.studentid,
          type: queues.type,
          status: "WAIT",
          queue_no: queueNumber,
        },
      });
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
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

export async function getStaffQueue() {
    return await prisma.queues.findMany({
      where: {
        NOT: [
          { status: 'FINISH' },
          { status: 'SKIP' }
        ]
      },
      include: {
        users: {
          select: {
            studentid: true // Select studentid from users table
          }
        }
      }
    });
  }
  
  
  export async function  EditQueue(queues: {
    queueid: number;
    status: string;
    channel: number;
  }) {
    const update_date = await prisma.queues.update({
      where: { queueid: queues.queueid },
      data: {
        status: queues.status,
        channel: queues.channel,
      },
    });
    return update_date;
  }
  
  export async function FinishQueue(queues: {
    queueid: number;
    status: string;
    channel: number;
    studentid: number;
    type: number;
  }) {

    const update_queue = await prisma.queues.update({
      where: { queueid: queues.queueid },
      data: {
        status: queues.status,
        channel: null, // รีเซ็ตค่า channel
      },
    });
  
    //  เพิ่มข้อมูลลงใน history_queue
    const create_history = await prisma.history_queue.create({
      data: {
        queueid: queues.queueid,
        channel: queues.channel,
        studentid: queues.studentid,
        status: "notreview", // ตั้งค่าเป็น notreview ตามที่ร้องขอ
        type: queues.type,
      },
    });
  
    //  ถ้า type ไม่เท่ากับ 3 ให้ update history_booking
    if (queues.type !== 3) {
      await prisma.history_booking.updateMany({
        where: { studentid: queues.studentid },
        data: { status: "finish" },
      });
    }
  
    return { update_queue, create_history };
  }
  


  export async function getDashboardData() {

    try {
      // Get the total number of reservations for today (from history_booking)
      const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  
      const totalQueues = await prisma.history_booking.count({
      where: {
        days: {
          date: new Date(today), // Compare the 'date' field in 'days'
        },
      },
    });
  
      // Get the number of finished queues (status = 'finish')
      const finishedQueues = await prisma.queues.count({
        where: {
          status: "finish",
        }
      });
  
      // Get the number of skipped queues (status = 'skipped')
      const skippedQueues = await prisma.queues.count({
        where: {
          status: "skip",
        }
      });
  
      // Get the number of queues still waiting (status = 'normal')
      const inQueue = await prisma.queues.count({
        where: {
          status: {
            in: ["wait", "call", "called"], // Count all these statuses
          },
        }
      });
  
      const QueueWait = await prisma.queues.count({
        where: {
          status: {
            in: ["wait"], // Count all these statuses
          },
        }
      });
  
      return {
        totalQueues,
        finishedQueues,
        skippedQueues,
        QueueWait,
        inQueue
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw new Error("Failed to fetch dashboard data");
    }
  }
  
  // Usage example
  getDashboardData().then((data) => {
    console.log("Dashboard Data:", data);
  });



  export async function getTVdata() {
    try {
      /**
       * Get the last called queue (latest queue that was called by any service channel)
       */
      async function getLastCalledQueue() {
        const lastCalledQueue = await prisma.queues.findFirst({
          where: {
            status: "CALL", // Change if a different status represents "called"
            channel: { not: null }, // Only consider queues with a non-null service channel
          },
        });
  
        if (!lastCalledQueue) return null;
  
        return {
          queueId: lastCalledQueue.queueid,
          serviceChannel: lastCalledQueue.channel,
        };
      }
  
      /**
       * Get the current queue in each service channel
       */
      async function getCurrentQueuePerChannel() {
        // Get distinct service channels that are not null
        const serviceChannels = await prisma.queues.findMany({
          select: {
            channel: true,
          },
          distinct: ["channel"],
          where: {
            channel: { not: null }, // Only fetch service channels that are not null
          },
        });
  
        // Fetch the latest queue per service channel
        const latestQueues = await Promise.all(
          serviceChannels.map(async ({ channel }) => {
            const latestQueue = await prisma.queues.findFirst({
              where: { channel },
            });
  
            if (!latestQueue) return null;
  
            return {
              serviceChannel: latestQueue.channel,
              queueId: latestQueue.queueid,
            };
          })
        );
  
        return latestQueues.filter(Boolean); // Remove null results
      }
  
      // Get the number of queues still waiting (status = 'wait')
      const inQueue = await prisma.queues.count({
        where: { status: "WAIT" },
      });
  
      // Fetch data
      const lastCalledQueue = await getLastCalledQueue();
      const currentQueuesPerChannel = await getCurrentQueuePerChannel();
  
      // Logging at the bottom
      console.log("Last Called Queue:", lastCalledQueue ?? "No queue has been called yet.");
      console.log("Current Queues Per Channel:", currentQueuesPerChannel);
      console.log("Queues Still Waiting:", inQueue);
  
      return {
        lastCalledQueue,
        currentQueuesPerChannel,
        inQueue,
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw new Error("Failed to fetch dashboard data");
    }
  }
  
  // Usage example
  getTVdata().then((data) => {
    console.log("TV Data:", data);
  });


  
  export async function getCallQueue() {
    return await prisma.queues.findFirst({
      where:{
        status: "CALL"
      }
    });
  }