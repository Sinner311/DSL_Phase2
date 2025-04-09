<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const DASDDays = ref([]);

// กำหนดสีของแต่ละวัน
const days = {
  วันจันทร์: "text-yellow-400",
  วันอังคาร: "text-pink-400",
  วันพุธ: "text-green-400",
  วันพฤหัสบดี: "text-orange-400",
  วันศุกร์: "text-blue-400",
};

const getDASDSettings = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/round/getDASDSettings`
    );
    if (res.status === 200 && res.data) {
      const dayFromAPI = res.data.Document_Amendment_Submission_Date;
      DASDDays.value = dayFromAPI ? dayFromAPI.split(",") : [];
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
};

onMounted(getDASDSettings);
</script>

<template>
  <section class="py-20 mb-2">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-center" v-if="DASDDays">
        <div class="flex items-center justify-center space-x-11">
          <h1
            v-for="day in DASDDays"
            :key="day"
            :class="[
              'text-xl sm:text-4xl md:text-6xl font-extrabold',
              days[day],
            ]"
          >
            {{ day }}
          </h1>
        </div>
        <h1 class="text-xl font-extrabold sm:text-4xl md:text-6xl">
          เปิดรับเฉพาะเอกสารแก้ไข
        </h1>
      </div>
    </div>
  </section>
</template>
