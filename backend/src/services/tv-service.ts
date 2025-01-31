import prisma from "../prisma/client";

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
      where: { status: "wait" },
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
