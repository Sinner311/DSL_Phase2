<script setup>
import { ref } from "vue";

// Queue data as reactive references
const queueData = ref({
  studentId: "653150xxxx",
  studentName: "นาย ดวงจาง ทวดี",
  currentNumber: 52,
  remainingQueue: 142,
  servicePoints: [
    { counter: 1, number: 45 },
    { counter: 2, number: 47 },
    { counter: 3, number: 46 }
  ],
  operatingHours: "8:00 AM - 16:30 PM",
  operatingTopic: "ส่งแบบคำขอ"
});
</script>

<template>

  <div class="flex justify-center items-center min-h-screen bg-gray-200">
    <div class="w-full max-w-md bg-white shadow-lg">
      <div class="p-6">
        <!-- Header Section -->
        <div class="flex justify-between items-start mb-6 p-4 bg-blue-900 text-white rounded-lg">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
              <p class="text-sm">{{ queueData.studentName }}</p>
              <p class="text-xs">รหัสนักศึกษา {{ queueData.studentId }}</p>
            </div>
          </div>
          <div class="flex items-center text-sm">
            
            <div>
              <p class="text-sm">เรื่อง {{ queueData.operatingTopic }}</p>
                <span class="text-xs">{{ queueData.operatingHours }}</span>
            </div>


          </div>

        </div>

        <!-- Queue Status Section -->
        <div class="text-center mb-6">
          <h2 class="text-green-500 text-xl font-semibold mb-4">ระบบเปิดรียกคิวปกติ</h2>
          <div class="text-6xl font-bold mb-2">{{ queueData.currentNumber }}</div>
          <p class="text-gray-600">
            เหลืออีก <span class="text-blue-600 font-semibold">{{ queueData.remainingQueue }}</span> คิวที่ต้องรอคิวอยู่
          </p>
        </div>

        <!-- Service Points Section -->
<div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
  <div class="col-span-1 text-left font-semibold text-lg flex flex-col items-center">
    <div>ช่องบริการ</div>
    <div v-for="point in queueData.servicePoints" :key="point.counter" >
      <h1 class="col-span-1 text-center text-3xl">{{ point.counter }}<hr></h1>
    </div>
  </div>
  <div class="col-span-1 text-left font-semibold text-lg flex flex-col items-center">
    <div>หมายเลขคิว</div>

    <div v-for="point in queueData.servicePoints" :key="point.counter" >
      <h1 class="col-span-1 text-blue-600 font-semibold text-center text-3xl ">{{ point.number }}<hr></h1>
    </div>
  </div>
</div>
        <!-- Footer Warning -->
        <div class="mt-6 bg-red-50 p-4 rounded-lg">
          <p class="text-red-600 text-sm text-center">
            หลังใช้บริการเสร็จรบกรุณาทำแบบประเมิน หากไม่ทำจะไม่สามารถจองคิวครั้งต่อไปได้
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any scoped styles here if needed */
</style>
