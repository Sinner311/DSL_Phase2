import prisma from "../prisma/client";

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
