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
  <div class="relative w-screen bg-gray-100 p-4">
    <!-- ปุ่มย้อนกลับ -->
    <button
      @click="handleBack"
      class="bg-gray-300 text-black px-10 py-5 rounded-md hover:bg-gray-400"
    >
      ย้อนกลับ
    </button>
  </div>
</template>
