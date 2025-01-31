<template>
    <div class="text-center mt-20">
      <!-- ตัวอักษรที่สามารถเปลี่ยนค่าได้ -->
      <p v-if="isSystemActive" class="font-bold text-6xl text-black animate-marquee">{{ dynamicText }}</p>
      <p v-if="!isSystemActive" class="font-bold text-6xl text-black animate-marquee">{{ buttonText }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref,onMounted } from 'vue'
  import axios from "axios";

  const webSettings = ref(null);
const isSystemActive = ref(null);
const buttonText = ref("พักระบบ");

  async function getwebSettings() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_IP}/api/round/getwebSettings`);
    
    if (res.status === 200 && res.data) {
      webSettings.value = res.data;
      buttonText.value = webSettings.value.web_break_text || "พักระบบ";
      isSystemActive.value = webSettings.value.web_status === "normal";
    } else {
      throw new Error("Failed to fetch web settings.");
    }
  } catch (error) {
    console.error("Error fetching web settings:", error);
  }
}

  const dynamicText = ref('ระบบเปิดเรียกคิวปกติ')

  onMounted(() => {
  getwebSettings();
});
  </script>
  
  <style scoped>
  /* Animation for left-to-right marquee */
  @keyframes marquee {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .animate-marquee {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 11s linear infinite; /* Adjust time for speed */
  }
  </style>
  