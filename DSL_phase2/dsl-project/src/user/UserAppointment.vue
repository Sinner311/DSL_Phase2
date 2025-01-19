<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';

// Define user data as a reactive reference
const userData = ref({
  name: 'นาย จงอาจ คิดดี',
  studentId: '6531501187',
  subject: 'ส่งแบบคำขอกู้ยืม',
  appointmentDate: '29 สิงหาคม 2567',
  timeSlot: '8.00 AM - 16.30 PM'
});
</script>

<template>
  <Navbar />
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative" 
    style="background-image: url('/src/assets/img/background.jpg'); background-size: cover; background-position: center;">

    <!-- Overlay to darken background -->
    <div class="absolute inset-0 bg-black opacity-40"></div>

    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden relative z-10">
      <!-- Header -->
      <div class="bg-blue-900 text-white p-4">
        <h2 class="text-xl font-semibold">รายการที่จองไว้</h2>
        <p class="text-sm mt-2">
          เมื่อถึงวันนัดหมายกรุณาไปแสกน QR CODE หน้าห้อง กยศ เพื่อจองคิว
        </p>
      </div>

      <!-- Main Content -->
      <div class="p-4">
        <div class="flex border border-gray-200 rounded-lg overflow-hidden">
          <!-- Left Section - User Info -->
          <div class="w-1/2 p-4 flex flex-col items-center justify-center border-r">
            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="font-semibold text-center">{{ userData.name }}</h3>
            <p class="text-sm text-gray-600">รหัสนักศึกษา {{ userData.studentId }}</p>
          </div>

          <!-- Right Section - Appointment Info -->
          <div class="w-1/2 p-4">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">เรื่อง</h3>
            <p class="text-blue-900 mb-4">{{ userData.subject }}</p>
            
            <div class="text-red-500 font-semibold mb-2">วันที่นัดหมาย</div>
            <p class="mb-2">{{ userData.appointmentDate }}</p>
            
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ userData.timeSlot }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-6">
          <button class="flex-1 bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors">
            เปลี่ยนแปลงการจอง
          </button>
          <button class="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
            ยกเลิกการจอง
          </button>
        </div>

        <!-- Quick Tips -->
        <div class="mt-6 flex items-start space-x-3 bg-cyan-50 p-4 rounded-lg">
          <div class="flex-shrink-0">
            <div class="bg-cyan-300 rounded-full p-2">
              <span class="text-xs font-bold">QUICK TIPS</span>
            </div>
          </div>
          <p class="text-sm">
            หากคุณต้องการติดต่อสอบถามก่อนถึงวันนัดหมาย สามารถ
            ทักแชทในเพจหรือ จองคิวหน้าห้อง กยศ ได้
            โดยไม่ต้องยกเลิกการจอง
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

