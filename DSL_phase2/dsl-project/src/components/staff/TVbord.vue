<script setup lang="ts">

import { ref, onMounted, computed ,onUnmounted } from "vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";
const QueueWait = ref(0);
const todaydateinfo = ref([]);
const lastCalledChannel = ref([]);
const lastCalledQueue = ref([]);
const calledQueueByChannel = ref([[], [], [], []]);
const channel1QueueId = ref("");
const channel2QueueId = ref("");
const channel3QueueId = ref("");
let intervalId: NodeJS.Timeout | null = null; // Store interval ID\

async function fetchDashboardData() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_IP}/api/dashboard/getDashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });

    if (response.data.success) {
      // Match frontend variable names with backend response
      QueueWait.value = response.data.data.QueueWait; // Fix name
       // Fix name
    } else {
      console.error("Failed to fetch dashboard data:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}


async function getTodaydate() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/api/round/getTodayDate`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    if (res.data === null) {
      throw Error;
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllqueue() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/api/queue/getAllQueue`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    if (res.data === null) {
      throw Error;
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getuserinfo() {
  const todaydateinfoData = await getTodaydate();
  todaydateinfo.value = todaydateinfoData;
  const allqueueinfoData = await getAllqueue();
  
  lastCalledQueue.value = allqueueinfoData
    .filter((item) => item.status === "CALL" || item.status === "CALLED")
    .sort((a, b) => b.queueid - a.queueid)[0];

  for (let i = 1; i <= 3; i++) {
    calledQueueByChannel.value[i] = allqueueinfoData.filter(
      (item) =>
        item.channel === i &&
        (item.status === "CALL" || item.status === "CALLED")
    );
  }

  channel1QueueId.value =
    calledQueueByChannel.value[1] && calledQueueByChannel.value[1].length > 0
      ? calledQueueByChannel.value[1][0].queueid
      : "-";
  channel2QueueId.value =
    calledQueueByChannel.value[2] && calledQueueByChannel.value[2].length > 0
      ? calledQueueByChannel.value[2][0].queueid
      : "-";
  channel3QueueId.value =
    calledQueueByChannel.value[3] && calledQueueByChannel.value[3].length > 0
      ? calledQueueByChannel.value[3][0].queueid
      : "-";
}

onMounted(() => {
  fetchDashboardData();
  getuserinfo(); // เรียกใช้งานเมื่อคอมโพเนนต์ถูก mount
  intervalId = setInterval(() => {
    getuserinfo();
  }, 2000); // Set interval to 2 seconds
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
      <!-- กล่องแสดงหมายเลขคิวและจำนวนคนรอ -->
      <div class="flex flex-col space-y-12">
        <!-- คิวหมายเลข -->
        <div class="bg-white rounded-xl shadow-md p-8 text-center w-[320px] h-[300px] flex flex-col justify-between border-2 border-black">
          <p class="text-2xl font-bold text-black ">คิวหมายเลข</p>
          <p class="text-7xl font-bold text-blue-900">{{
                lastCalledQueue.queueid }}</p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p class="text-xl font-bold text-black">ช่องบริการ</p>
          <p class="text-6xl font-bold text-blue-900">{{ lastCalledQueue.channel }}</p>
        </div>
        <!-- จำนวนคนรอ -->
        <div class="bg-white rounded-xl shadow-md p-6 text-center w-[320px] h-[180px] flex flex-col justify-center border-2 border-black">
          <p class="text-3xl font-bold text-black">จำนวนคนรอคิว</p>
          <p class="text-6xl font-bold text-blue-900">{{ QueueWait }}</p>
        </div>
      </div>

      <!-- ตารางช่องบริการ -->
      <div class="bg-white rounded-xl shadow-md w-[900px] border-2 border-black">
        <!-- Header ตาราง -->
        <div class="flex justify-around items-center  text-white p-6 rounded-t-xl">
          <p class="font-bold text-5xl text-black">ช่องบริการ</p>
          <p class="font-bold text-5xl text-black">หมายเลขคิว</p>
        </div>
        <!-- เนื้อหาในตาราง -->
        <div class="divide-y divide-gray-600 ">
          <!-- แถว 1 -->
          <div class="flex justify-around items-center p-6">
            <p class="text-8xl font-bold text-black">1</p>
            <p class="text-8xl font-bold text-blue-900">{{ channel1QueueId === null ? ' ' : channel1QueueId }}</p>
          </div>
          <!-- แถว 2 -->
          <div class="flex justify-around items-center p-6">
            <p class="text-8xl font-bold text-black">2</p>
            <p class="text-8xl font-bold text-blue-900">{{ channel2QueueId === null ? ' ' : channel2QueueId }}</p>
          </div>
          <!-- แถว 3 -->
          <div class="flex justify-around items-center p-6">
            <p class="text-8xl font-bold text-black">3</p>
            <p class="text-8xl font-bold text-blue-900">{{ channel3QueueId === null ? ' ' : channel3QueueId }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

