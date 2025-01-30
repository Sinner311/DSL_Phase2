import prisma from "../prisma/client";



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
            studentid: item.users?.studentid || "N/A",
            type: item.type || 0,
            channel: item.channel || 0,
            status: item.status || "UNKNOWN",
            star_rate: item.star_rate ?? -1,  // Default to -1 if null
            q1: item.q1 ?? -1,  // Default to -1 if null
            q2: item.q2 ?? -1,
            q3: item.q3 ?? -1,
            q4: item.q4 ?? -1,
            q5: item.q5 ?? -1,
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
