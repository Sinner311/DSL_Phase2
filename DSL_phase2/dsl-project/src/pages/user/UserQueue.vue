<script setup>
import { ref, computed } from "vue";
import Navbar from '@/components/user/Navbar.vue';

// Queue data as reactive references
const queueData = ref({
  studentId: "653150xxxx",
  studentName: "นาย ดวงจาง ทวดี",
  userNumber: 52,
  remainingQueue: 142,
  servicePoints: [
    { counter: 1, number: 45 },
    { counter: 2, number: 47 },
    { counter: 3, number: 46 }
  ],
  operatingHours: "8:00 AM - 16:30 PM",
  operatingTopic: "ส่งแบบคำขอ"
});

const serviceOpen = true;
const notPassQueue = true;
const timeOpen = "13:00";

// Computed property to check queue status
const isUserQueueNow = computed(() => {
  // Assuming the first service point's number represents the current queue number
  const currentQueueNumber = queueData.value.servicePoints[0].number;
  return queueData.value.userNumber === currentQueueNumber;
});
</script>

<template>
<Navbar />
  <div class="flex justify-center items-center min-h-screen" style="background-image: url('/src/assets/img/background_2.jpg'); background-size: cover; background-position: center;">
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

        <div v-if="!notPassQueue">
                <!-- Queue Status Section -->
              <div class="text-center mb-6">
                <h2 v-if="serviceOpen" class="text-green-500 text-xl font-semibold mb-4">ระบบเปิดเรียกคิวปกติ</h2>
                <div v-else>
                  <h2 class="text-red-500 text-xl font-semibold mb-4">เจ้าหน้าที่พักกลางวัน จะกลับมาให้บริการ</h2>
                  <h2 class="text-red-500 text-xl font-semibold mb-4">เวลา {{ timeOpen }}</h2>
                </div>
                <div class="text-6xl font-bold mb-2">{{ queueData.userNumber }}</div>
                <p v-if="isUserQueueNow" class="text-pink-500 font-semibold text-lg">ถึงคิวของคุณแล้ว</p>
                <p v-else class="text-gray-600">
                  เหลืออีก <span class="text-blue-600 font-semibold">{{ queueData.remainingQueue }}</span> คิว จะถึงคิวของคุณ
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
        </div>

        <div v-else>
          <div class="my-20 text-center">
            <h2 class="text-red-500 text-xl font-semibold mb-4">เจ้าหน้าที่ข้าวคิวของคุณ</h2>
            <h2 class="text-red-500 text-xl font-semibold mb-4">โปรดจองคิวใหม่ภายในวันนี้</h2>
            <h2 class="text-red-500 text-xl font-semibold mb-4">มิฉะนั้นจะต้องจองวันส่งเอกสารใหม่</h2>
            <button class="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 text-sm rounded-3xl text-xl mt-3">
          จองคิวใหม่
        </button>
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
