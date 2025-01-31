import prisma from "../prisma/client";
import { history_booking, web_settings } from "@prisma/client";

export async function Specifichistory(history_booking: { studentid: string | number | null }) {
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
                  select: { studentid: true }
              }
          }
      });

      const formattedData = queueData.map(item => ({
          historyid: item.historyid || "N/A",
          studentid: item.users?.studentid || "N/A",
          type: item.type || "N/A",
          channel: item.channel || "N/A",
          status: item.status || "N/A",
          star_rate: item.star_rate ?? "N/A",  // Default to -1 if null
          q1: item.q1 ?? "N/A",  // Default to -1 if null
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
getHistoryQueueData().then((data) => {
console.log("HistoryQueue Data:", data);
});