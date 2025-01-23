<template>
    <p class="text-4xl font-bold mt-8 text-center">ตั้งค่าช่วงวันที่</p>
    <p class="text-5xl font-bold mt-8 text-center">แบบคำขอกู้ยืม</p>
  
    <div class="flex justify-center mt-12">
      <!-- <button class="bg-orange-500 text-white font-bold text-3xl py-4 px-6 rounded-lg shadow-lg hover:bg-orange-600 mr-4" @click="addSpecialRound">
        เพิ่มรอบเก็บตก
      </button> -->
      <button 
        class="bg-blue-500 text-white font-bold text-3xl py-4 px-6 rounded-lg shadow-lg hover:bg-blue-600"
        @click="openAddCard"
      >
        เพิ่มช่วงวัน
      </button>
    </div>
  
     <!-- Add Staff Card -->
     <div v-if="showAddCard" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 class="text-xl font-bold mb-4">เพิ่มช่วงวัน</h2>
        <input v-model="newStartDate" type="date" placeholder="ใส่วันเริ่ม" class="border border-gray-300 p-2 rounded w-full mb-4" />
        <input v-model="newEndDate" type="date" placeholder="ใส่วันจบ" class="border border-gray-300 p-2 rounded w-full mb-4" />
        <div class="flex justify-around">
          <button @click="cancelAddStaff" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">ยกเลิก</button>
          <button @click="confirmAddRound" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">เพิ่ม</button>
        </div>
      </div>
    </div>
  
    <!-- Confirmation alert card -->
    <div v-if="isConfirming" class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <p class="text-xl font-bold mb-4 text-center">คุณแน่ใจหรือไม่ว่าต้องการ ลบ ช่วงวันนี้?</p>
        <div class="flex justify-center gap-6">
          <button 
            class="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-green-600"
            @click="removeCard"
          >
            ยืนยัน
          </button>
          <button 
            class="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-600"
            @click="cancelRemoveCard"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </template>
  

  <script setup lang="ts">
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const showAddCard = ref(false);
const newStartDate = ref('');
const newEndDate = ref('');


  const openAddCard = () => {
    showAddCard.value = true;
};

const cancelAddStaff = () => {
    newStartDate.value = '';
    newEndDate.value = '';
    showAddCard.value = false;
};

const confirmAddRound = async () => {
  console.log(newStartDate.value,newEndDate.value)
  if (newStartDate.value && newEndDate.value) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_IP}/api/round/createRound`,
        { 
          startdate: newStartDate.value,
          enddate: newEndDate.value,
          type: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (response.status === 200) {
        newStartDate.value = '';
        newEndDate.value = '';
        showAddCard.value = false;
        await Swal.fire({
        icon: "success",
        title: "เพิ่มรอบสำเร็จ",
        showConfirmButton: false,
        timer: 1500
      });
      } else {
        throw new Error('Failed to add staff.');
      }
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  }
};
 </script>
  
  <style scoped>
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  </style>
  