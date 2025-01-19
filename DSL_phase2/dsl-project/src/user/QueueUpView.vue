<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue'

const username = ref('นาย อิจจัย คิดดี')
const studentId = ref('รหัสนักศึกษา 6531501187')
const noQueueMessage = ref('คุณไม่มีรายการจองล่วงหน้า')
const checkLaterMessage = ref('คุณสามารถกดจองคิวเพื่อติดต่อสอบถามได้เท่านั้น')
const selectedQueue = ref('')
const queueOptions = ref([
  { id: 1, text: 'ติดต่อเรื่องทั่วไป' },
  { id: 2, text: 'ปรึกษาอาจารย์' },
  { id: 3, text: 'ยื่นคำร้อง' }
])
const currentDate = ref('18 มกราคม 2567')

const joinQueue = () => {
  if (selectedQueue.value) {
    console.log('Joining queue:', selectedQueue.value)
  }
}
</script>

<template>
  <Navbar />

  <section class="flex justify-center p-4 m-8">
    <!-- Card Container -->
    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6">
      
      <!-- User Profile Section -->
      <div class="flex flex-col items-center">
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

      <!-- Queue Status Messages -->
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

      <!-- Updated Queue Button with Enhancements -->
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

  <!-- Image at the bottom -->
  <div class="image-container">
    <img
      src="/src/assets/img/people.jpg"
      alt="Contract Reservation"
      class="image-bottom w-full h-full object-cover"
    />
  </div>
</template>

<style scoped>
.image-container {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1; /* Ensure the image is at the bottom behind content */
}

.image-bottom {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

body, html {
  min-height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

section {
  flex: 1;
}

@media (max-width: 768px) {
  .image-bottom {
    object-position: center;
  }
}
</style>
