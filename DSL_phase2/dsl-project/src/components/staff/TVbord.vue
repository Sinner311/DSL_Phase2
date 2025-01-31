<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import axios from "axios";

const QueueWait = ref(0);
const lastCalledQueue = ref(null);
const calledQueueByChannel = ref([[], [], [], []]);
const channelQueueIds = ref(["-", "-", "-"]);
let intervalId: NodeJS.Timeout | null = null;

async function fetchDashboardData() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_IP}/api/dashboard/getDashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });

    if (response.data.success) {
      QueueWait.value = response.data.data.QueueWait;
    } else {
      console.error("Failed to fetch dashboard data:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}

async function getAllqueue() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_IP}/api/queue/getAllQueue`);
    if (res.status !== 200) throw new Error(res.statusText);
    return res.data;
  } catch (error) {
    console.error("Error fetching queue data:", error);
    return [];
  }
}

async function getuserinfo() {
  const allqueueinfoData = await getAllqueue();

  // Get last called queue
  const lastQueue = allqueueinfoData
    .filter((item) => item.status === "CALL" || item.status === "CALLED")
    .sort((a, b) => b.queueid - a.queueid)[0] || null;

  if (lastQueue && (!lastCalledQueue.value || lastQueue.queueid !== lastCalledQueue.value.queueid)) {
    lastCalledQueue.value = lastQueue;
  }

  // Update queues for each channel
  for (let i = 1; i <= 3; i++) {
    calledQueueByChannel.value[i] = allqueueinfoData.filter(
      (item) => item.channel === i && (item.status === "CALL" || item.status === "CALLED")
    );

    channelQueueIds.value[i - 1] =
      calledQueueByChannel.value[i] && calledQueueByChannel.value[i].length > 0
        ? calledQueueByChannel.value[i][0].queueid
        : "-";
  }
}

function speakThai(message: string) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "th-TH";
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech Synthesis API ไม่รองรับในเบราว์เซอร์นี้");
  }
}

// Watch for changes in lastCalledQueue and automatically announce it
watch(lastCalledQueue, (newQueue) => {
  if (newQueue) {
    const message = `เชิญหมายเลข ${newQueue.queueid} ที่ช่องบริการ ${newQueue.channel}`;
    speakThai(message);
  }
});

onMounted(() => {
  fetchDashboardData();
  getuserinfo();
  intervalId = setInterval(getuserinfo, 2000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>

<template>
  <div class="bg-blue-900 h-[650px] flex flex-col items-center py-16 pr-16">
    <div class="flex space-x-10">
      <!-- Queue Info -->
      <div class="flex flex-col space-y-12">
        <!-- Last Called Queue -->
        <div class="bg-white rounded-xl shadow-md p-8 text-center w-[320px] h-[300px] flex flex-col justify-between border-2 border-black">
          <p class="text-2xl font-bold text-black">คิวหมายเลข</p>
          <p class="text-7xl font-bold text-blue-900">{{ lastCalledQueue?.queueid || "-" }}</p>
          <p class="text-xl font-bold text-black">ช่องบริการ</p>
          <p class="text-6xl font-bold text-blue-900">{{ lastCalledQueue?.channel || "-" }}</p>
        </div>

        <!-- Queue Waiting Count -->
        <div class="bg-white rounded-xl shadow-md p-6 text-center w-[320px] h-[180px] flex flex-col justify-center border-2 border-black">
          <p class="text-3xl font-bold text-black">จำนวนคนรอคิว</p>
          <p class="text-6xl font-bold text-blue-900">{{ QueueWait }}</p>
        </div>
      </div>

      <!-- Service Channels Table -->
      <div class="bg-white rounded-xl shadow-md w-[900px] border-2 border-black">
        <div class="flex justify-around items-center text-white p-6 rounded-t-xl">
          <p class="font-bold text-5xl text-black">ช่องบริการ</p>
          <p class="font-bold text-5xl text-black">หมายเลขคิว</p>
        </div>
        <div class="divide-y divide-gray-600">
          <!-- Channel 1 -->
          <div class="flex justify-around items-center p-6">
            <p class="text-8xl font-bold text-black">1</p>
            <p class="text-8xl font-bold text-blue-900">{{ channelQueueIds[0] }}</p>
          </div>
          <!-- Channel 2 -->
          <div class="flex justify-around items-center p-6">
            <p class="text-8xl font-bold text-black">2</p>
            <p class="text-8xl font-bold text-blue-900">{{ channelQueueIds[1] }}</p>
          </div>
          <!-- Channel 3 -->
          <div class="flex justify-around items-center p-6">
            <p class="text-8xl font-bold text-black">3</p>
            <p class="text-8xl font-bold text-blue-900">{{ channelQueueIds[2] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


