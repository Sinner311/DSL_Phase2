<script setup>
import { ref } from 'vue';
import Navbar from '@/components/user/Navbar.vue';
import UserBackbutton from '@/components/user/UserBackbutton.vue';


// Define user data as a reactive reference
const userData = ref({
  name: 'นาย จงอาจ คิดดี',
  studentId: '6531501187',
  subject: 'ส่งแบบคำขอกู้ยืม',
  appointmentDate: '29 สิงหาคม 2567',
  timeSlot: '8.00 AM - 16.30 PM'
});

// Define state variables
const selectedSlot = ref(null);
const showConfirmation = ref(false);
const showChangeSlot = ref(false); // For showing the slot change modal

// Dummy timeSlots data (for demonstration purposes)
const timeSlots = ref([
  { date: '29 สิงหาคม 2567', time: '8.00 AM - 10.00 AM', isFull: false },
  { date: '29 สิงหาคม 2567', time: '10.00 AM - 12.00 PM', isFull: false },
  { date: '29 สิงหาคม 2567', time: '12.00 PM - 2.00 PM', isFull: true },
  { date: '29 สิงหาคม 2567', time: '2.00 PM - 4.00 PM', isFull: false }
]);

// Handle confirming the cancellation
const handleConfirmCancel = () => {
  alert('คุณได้ยกเลิกการจองคิวสำเร็จ');
  showConfirmation.value = false;
  selectedSlot.value = null;
};

// Handle canceling the appointment (show confirmation)
const handleCancel = () => {
  showConfirmation.value = true;
  selectedSlot.value = null;
};

// Handle opening the change slot modal
const handleChangeSlot = () => {
  showChangeSlot.value = true;
  selectedSlot.value = null;
};

// Handle changing the time slot by selecting a new one
const changeTimeSlot = (newIndex) => {
  if (!timeSlots.value[newIndex].isFull) {
    userData.value.timeSlot = timeSlots.value[newIndex].time;
    alert(`เปลี่ยนเวลาการจองเป็น ${timeSlots.value[newIndex].time}`);
    showChangeSlot.value = false;
  } else {
    alert("เวลานี้เต็มแล้ว");
  }
};
</script>

<template>
  <Navbar />
  <UserBackbutton/>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative" 
    style="background-image: url('/src/assets/img/background.jpg'); background-size: cover; background-position: center;">

    <!-- Overlay to darken background -->
    <div class="absolute inset-0 bg-black opacity-40"></div>

    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden relative z-10 w-full sm:w-3/4 md:w-1/2 ">
      <!-- Header -->
      <div class="bg-blue-900 text-white p-4">
        <h2 class="text-xl font-semibold">รายการที่จองไว้</h2>
        <p class="text-sm mt-2">
          เมื่อถึงวันนัดหมายกรุณาไปแสกน QR CODE หน้าห้อง กยศ เพื่อจองคิว
        </p>
      </div>

      <!-- Main Content -->
      <div class="p-4">
        <div class="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden">
          <!-- Left Section - User Info -->
          <div class="w-full sm:w-1/2 p-4 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r">
            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="font-semibold text-center">{{ userData.name }}</h3>
            <p class="text-sm text-gray-600">รหัสนักศึกษา {{ userData.studentId }}</p>
          </div>

          <!-- Right Section - Appointment Info -->
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

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-6">
          <button @click="handleChangeSlot" class="flex-1 bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors">
            เปลี่ยนแปลงการจอง
          </button>
          <button @click="handleCancel" class="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
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

    <!-- Confirmation Alert Card for cancellation -->
    <div v-if="showConfirmation" class="alert-card-container">
      <div class="alert-card">
        <div class="bg-slate-50 p-4 rounded-lg shadow-lg border">
          <p>คุณต้องการยกเลิกการจองคิวหรือไม่?</p>
          <div class="mt-4 flex justify-between">
            <button @click="showConfirmation = false" class="bg-gray-400 text-white py-2 px-4 rounded-md">ยกเลิก</button>
            <button @click="handleConfirmCancel" class="bg-red-500 text-white py-2 px-4 rounded-md">ยืนยัน</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Slot Change Modal -->
    <div v-if="showChangeSlot" class="absolute inset-0 flex justify-center items-center z-20">
      <div class="bg-white p-6 rounded-lg shadow-lg m-2 border max-w-sm sm:max-w-md md:max-w-lg">
        <h3 class="text-lg font-semibold mb-4">เลือกเวลาที่ต้องการเปลี่ยน</h3>
        <div class="grid grid-cols-1 gap-4 ">
          <button v-for="(slot, index) in timeSlots" :key="index" 
                  :class="slot.isFull ? 'bg-gray-400' : 'bg-yellow-400 hover:bg-yellow-500'"
                  :disabled="slot.isFull" 
                  @click="changeTimeSlot(index)" 
                  class="text-white py-2 px-4 text-sm rounded-md transition-colors">
            {{ slot.time }} <span v-if="slot.isFull" class="text-xs text-red-500">(เต็ม)</span>
          </button>
        </div>
        
        <!-- Cancel Button to Close the Modal -->
        <div class="mt-4 flex justify-center">
          <button @click="showChangeSlot = false" class="bg-gray-400 text-white py-2 px-4 rounded-md">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Style to apply a blur effect when the slot is selected */

.alert-card-container {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-card {
  position: relative;
  z-index: 20;
}
</style>
