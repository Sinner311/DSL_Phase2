<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const totalReservations = ref(0);
const inQueue = ref(0);
const completed = ref(0);
const skipped = ref(0);

async function fetchDashboardData() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_IP}/queue/getDashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });

    if (response.data.success) {
      // Match frontend variable names with backend response
      totalReservations.value = response.data.data.totalQueues; // Fix name
      inQueue.value = response.data.data.inQueue;
      completed.value = response.data.data.finishedQueues; // Fix name
      skipped.value = response.data.data.skippedQueues; // Fix name
    } else {
      console.error("Failed to fetch dashboard data:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}


// Fetch data on component mount
onMounted(() => {
  fetchDashboardData();
});
</script>

<template>
  <div class="bg-blue-900 text-white font-sans w-full h-[300px] mx-auto py-10 px-4 flex items-center justify-center">
    <div class="max-w-screen-lg mx-auto py-10">
      <h1 class="text-lg font-bold mb-6">DASHBOARD</h1>
      <div class="grid grid-cols-4 gap-4">
        <div class="text-center">
          <p class="text-6xl font-bold">{{ totalReservations }}</p>
          <p class="text-lg mt-2">จำนวนการจองคิววันนี้</p>
        </div>
        <div class="text-center">
          <p class="text-6xl font-bold">{{ inQueue }}</p>
          <p class="text-lg mt-2">อยู่ในคิว</p>
        </div>
        <div class="text-center">
          <p class="text-6xl font-bold">{{ completed }}</p>
          <p class="text-lg mt-2">คิวสำเร็จ</p>
        </div>
        <div class="text-center">
          <p class="text-6xl font-bold">{{ skipped }}</p>
          <p class="text-lg mt-2">คิวที่ข้าม</p>
        </div>
      </div>
    </div>
  </div>
</template>