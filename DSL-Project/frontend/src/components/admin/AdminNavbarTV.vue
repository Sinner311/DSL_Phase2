<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";

const currentDateTime = ref("");

async function homePage() {
  router.push({ name: "admin" });
}

const updateDateTime = () => {
  const now = new Date();
  const options = { 
    year: "numeric", 
    month: "long", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit" 
  };
  currentDateTime.value = now.toLocaleDateString("th-TH", options); // แสดงผลในรูปแบบไทยโดยไม่มีวินาที
};

onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 60000); // อัปเดตทุก 1 นาที (แทน 1 วินาที)
});
</script>

<template>
  <nav class="bg-blue-900 shadow-md h-[150px] w-full flex flex-col justify-center px-10">
    <div class="flex justify-between items-center w-full">
      <!-- Title -->
      <div class="text-left cursor-pointer" @click="homePage">
        <p class="text-5xl font-bold">
          <span class="text-yellow-500">MFU</span> <!-- MFU สีทอง -->
          <span class="text-blue-400"> DSL EQUEUE</span> <!-- ส่วนที่เหลือเป็นสีน้ำเงินเข้ม -->
        </p>
        <p class="text-lg lg:text-4xl font-bold text-white pt-5">
          ระบบจองคิว กยศ. มหาวิทยาลัยแม่ฟ้าหลวง
        </p>
      </div>
      
      <!-- Current Date and Time -->
      <div class="text-black font-semibold text-4xl bg-white px-4 py-8 rounded">
        {{ currentDateTime }}<span> น. </span>
      </div>
    </div>
  </nav>
</template>