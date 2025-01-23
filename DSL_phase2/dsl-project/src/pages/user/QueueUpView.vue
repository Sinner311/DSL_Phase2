<script setup>
import Navbar from '@/components/user/Navbar.vue';
import { ref } from 'vue';

const username = ref('นาย อิจจัย คิดดี');
const studentId = ref('รหัสนักศึกษา 6531501187');
const noQueueMessage = ref('คุณไม่มีรายการจองล่วงหน้า');
const checkLaterMessage = ref('คุณสามารถกดจองคิวเพื่อติดต่อสอบถามได้เท่านั้น');
const selectedQueue = ref('');
const queueOptions = ref([
  { id: 1, text: 'ติดต่อเรื่องทั่วไป' },
  { id: 2, text: 'ปรึกษาอาจารย์' },
  { id: 3, text: 'ยื่นคำร้อง' },
]);

const userData = ref({
  name: 'นาย จงอาจ คิดดี',
  studentId: '6531501187',
  subject: 'ส่งแบบคำขอกู้ยืม',
  appointmentDate: '29 สิงหาคม 2567',
  timeSlot: '8.00 AM - 16.30 PM',
});

const currentDate = ref('18 มกราคม 2567');

const hasAppointment = ref(true); // Set to true if user has an appointment, false otherwise.

const joinQueue = () => {
  if (selectedQueue.value) {
    console.log('Joining queue:', selectedQueue.value);
  }
};
</script>

<template>
  <Navbar />

  <section class="flex justify-center p-4 m-8">
    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6">
      
      <!-- User Profile Section -->
      <div v-if="hasAppointment">
        <div class="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden">
          <div class="w-full sm:w-1/2 p-4 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r">
            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="font-semibold text-center">{{ userData.name }}</h3>
            <p class="text-sm text-gray-600">รหัสนักศึกษา {{ userData.studentId }}</p>
          </div>

          <div class="w-full sm:w-1/2 p-4">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">เรื่อง</h3>
            <p class="text-blue-900 mb-4">{{ userData.subject }}</p>
            
            <div class="text-red-500 font-semibold mb-2">วันที่นัดหมาย</div>
            <p class="mb-2">{{ userData.appointmentDate }}</p>
            
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-md sm:text-xs">{{ userData.timeSlot }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 class="text-lg font-medium">{{ username }}</h2>
        <p class="text-gray-500 text-sm">{{ studentId }}</p>
      </div>

      <div v-if="currentDate != userData.appointmentDate">
        <!-- Queue Status Messages (Appointment != dateAppointment)-->
      <div class="w-full text-center">
        <p class="text-lg mb-2">{{ noQueueMessage }}</p>
        <p class="text-red-500">{{ checkLaterMessage }}</p>
      </div>

      <!-- Select Box -->
      <div class="w-full">
        <select
          class="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="selectedQueue"
        >
          <option value="" disabled selected>โปรดเลือกเรื่องที่ต้องการติดต่อ......</option>
          <option v-for="option in queueOptions" :key="option.id" :value="option.id">
            {{ option.text }}
          </option>
        </select>
      </div>
      </div>

      <!-- Queue Status Messages (Appointment == dateAppointment)-->
      <div v-else class="w-full text-center text-blue-900 font-bold">
        <p class="text-lg mb-2">ถึงวันนัดหมายของคุณแล้ว</p>
        <p class="text-lg mb-2">โปรดจองคิวเพื่อส่งเอกสาร</p>
      </div>

      <!-- Queue Button -->
      <button
        class="w-full bg-gradient-to-r from-indigo-600 to-indigo-900 text-white py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-indigo-800"
        @click="joinQueue"
      >
        จองคิว
      </button>

      <!-- Date Display -->
      <div class="mt-4 text-gray-500 text-center">
        {{ currentDate }}
      </div>
    </div>
  </section>

  <div class="image-container">
    <img
      src="/src/assets/img/people.jpg"
      alt="Contract Reservation"
      class="image-bottom w-full h-full object-cover"
    />
  </div>
</template>
