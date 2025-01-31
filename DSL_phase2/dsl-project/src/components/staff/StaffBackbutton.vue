<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

function handleBack() {
  // console.log("ย้อนกลับ");

  // ตรวจสอบว่า URL ปัจจุบันคือ "/staff/daysetting"
  if (route.path === "/staff/daysetting") {
    router.push({ path: "/staff" }); // กลับไปที่ "/staff"
  } 
  // ตรวจสอบว่า URL ปัจจุบันเริ่มต้นด้วย "/staff/daysetting/"
  else if (route.path.startsWith("/staff/daysetting/")) {
    router.push({ path: "/staff/daysetting" }); // กลับไปที่ "/staff/daysetting"
  } 
  else if (route.path.startsWith("/staff/editday")) {
    router.push({ path: "/staff/daysetting" }); // กลับไปที่ "/staff/daysetting"
  } 
  // กรณีอื่น ๆ
  else {
    router.push({ path: "/staff" });
  }
}
</script>

<template>
  <div class="relative w-screen m-8 flex items-center space-x-6">
    <!-- ปุ่มย้อนกลับ -->
    <button
      @click="handleBack"
      class="bg-gray-300 text-black p-4 rounded-full hover:bg-gray-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  </div>
</template>
