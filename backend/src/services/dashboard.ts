import prisma from "../prisma/client";
export async function getDashboardData() {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Set to 00:00:00 of today
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Set to 23:59:59 of today

  try {
    // Get the total number of queues from the `queues` table
    const totalQueues = await prisma.queues.count();

    // Get the number of finished queues today (status = 'finish')
    const finishedQueues = await prisma.history_queue.count({
      where: {
        status: 'finish',
        datetime: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    // Get the number of skipped queues today (status = 'skipped')
    const skippedQueues = await prisma.history_queue.count({
      where: {
        status: 'skipped',
        datetime: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    // Calculate the number of queues that are still in the queue
    const inQueue = totalQueues - finishedQueues - skippedQueues;

    return {
      totalQueues,
      finishedQueues,
      skippedQueues,
      inQueue
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}

// Usage
getDashboardData().then((data) => {
  console.log('Dashboard Data:', data);
});
