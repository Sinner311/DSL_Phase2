<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";

const DASDDays = ref(null);
const dayColorClass = ref("text-gray-500"); // ค่าเริ่มต้นเป็นสีเทา

// กำหนดสีของแต่ละวัน
const days = {
  "จันทร์": "text-yellow-500",
  "อังคาร": "text-pink-500",
  "พุธ": "text-green-500",
  "พฤหัสบดี": "text-orange-500",
  "ศุกร์": "text-blue-500",
};

const getDASDSettings = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/api/round/getDASDSettings`
    );
    if (res.status === 200 && res.data) {
      const dayFromAPI = res.data.Document_Amendment_Submission_Date;
      DASDDays.value = dayFromAPI;

      // ตรวจสอบว่าค่าที่ได้มีอยู่ใน days หรือไม่ ถ้าใช่ให้ใช้สีที่กำหนด
      dayColorClass.value = days[dayFromAPI] || "text-gray-500";
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
};

onMounted(getDASDSettings);
</script>

<template>
  <section class="py-20 mb-2">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center" v-if="DASDDays">
        <!-- กำหนดสีของข้อความตามวันที่ -->
        <h1 :class="['text-xl sm:text-4xl md:text-6xl font-extrabold', dayColorClass]">
          {{ DASDDays }}
        </h1>
        <h1 class="text-xl font-extrabold sm:text-4xl md:text-6xl">เปิดรับเฉพาะเอกสารแก้ไข</h1>
      </div>
    </div>
  </section>
</template>
