import prisma from "../prisma/client";
import { history_booking, web_settings } from "@prisma/client";

export async function Specifichistory(history_booking: {
  studentid: string | number | null;
}) {
  if (!history_booking.studentid) {
    throw new Error("studentid is required");
  }

  const studentIdNumber = Number(history_booking.studentid);
  if (isNaN(studentIdNumber)) {
    throw new Error("Invalid studentid format");
  }

  const res = await prisma.history_booking.findFirst({
    where: {
      studentid: studentIdNumber,
    },
  });

  return res;
}

export async function getHistoryQueueData() {
  try {
    const queueData = await prisma.history_queue.findMany({
      include: {
        users: {
          select: { studentid: true },
        },
      },
    });

    const formattedData = queueData.map((item) => ({
      historyid: item.historyid || "N/A",
      studentid: item.users?.studentid || "N/A",
      type: item.type || "N/A",
      channel: item.channel || "N/A",
      status: item.status || "N/A",
      star_rate: item.star_rate ?? "N/A", // Default to -1 if null
      q1: item.q1 ?? "N/A", // Default to -1 if null
      q2: item.q2 ?? "N/A",
      q3: item.q3 ?? "N/A",
      q4: item.q4 ?? "N/A",
      q5: item.q5 ?? "N/A",
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching history queue data:", error);
    throw new Error("Failed to fetch history queue data");
  }
}


// Usage example

export async function getreview(history_queue: {
  studentid: number;
  star_rate: string;
  q1: string | number;  // Can be either string or number
  q2: string | number;
  q3: string | number;
  q4: string | number;
  q5: string | number;
}) {
  try {
    // ค้นหาข้อมูล history_queue โดยใช้ studentid
    const historyRecord = await prisma.history_queue.findFirst({
      where: {
        studentid: history_queue.studentid,
        status: "notreview", // ตรวจสอบว่า status เป็น "notreview"
      },
    });

    if (!historyRecord) {
      throw new Error("No history found for this student or the status is not 'notreview'.");
    }

    // Convert star_rate and other fields to strings
    const star_rate = String(history_queue.star_rate);
    const q1 = String(history_queue.q1);
    const q2 = String(history_queue.q2);
    const q3 = String(history_queue.q3);
    const q4 = String(history_queue.q4);
    const q5 = String(history_queue.q5);

    // อัปเดตข้อมูลด้วยข้อมูลใหม่
    const update_date = await prisma.history_queue.update({
      where: { historyid: historyRecord.historyid },
      data: {
        star_rate: star_rate,  // Ensure it's a string
        q1: q1,                // Ensure it's a string
        q2: q2,                // Ensure it's a string
        q3: q3,                // Ensure it's a string
        q4: q4,                // Ensure it's a string
        q5: q5,                // Ensure it's a string
        status: "finish",      // เปลี่ยน status เป็น "finish"
      },
    });

    return update_date;
  } catch (error: any) {
    // Throw a more specific error with details
    throw new Error(`Error updating review: ${error.message}`);
  }
}


  export async function getmynotreview() {
    // Find the current show_list from web_settings where id = 1
    const history_queue = await prisma.history_queue.findMany({
      where: {
        status: "notreview",
      },
    });
  

  

    return history_queue
  }