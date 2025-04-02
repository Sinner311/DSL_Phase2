<script setup lang="ts">
import { useCookies } from "vue3-cookies";
import { ClockIcon } from 'lucide-vue-next';
import axios from "axios";
import { ref, onMounted } from "vue";

const { cookies } = useCookies();
const studentinfo = ref({ id: '',name: '', studentid: '' }); // สร้าง ref สำหรับ studentinfo

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

async function getMystudentID(email: string) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/user/getSpecificuser?email=${email}`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    if (res.data === null) {
      throw Error("No Student id");
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getuserinfo() {
  const accesstoken = cookies.get("accesstoken");
  const access_token_extract = parseJwt(accesstoken);
  const studentinfoData = await getMystudentID(access_token_extract.email); // ดึงข้อมูลของ student
  if (studentinfoData) {
    studentinfo.value = studentinfoData; // อัพเดตข้อมูล studentinfo
  }
}

onMounted(() => {
  getuserinfo(); // เรียกใช้งานเมื่อคอมโพเนนต์ถูก mount
});

defineProps({
  selectedSlot: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['cancel', 'confirm']);

function handleConfirm() {
  emit('confirm', studentinfo.value.id); // ส่ง id ไปพร้อมกับ emit
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="max-w-md bg-white rounded-lg shadow-lg">
      <div class="p-6">
        <div class="text-center space-y-4">
          <!-- Header Section -->
          <div class="space-y-2">
            <h2 class="font-medium">สรุปรายการจอง</h2>
            <p class="text-gray-700">คุณ {{ studentinfo.name }}</p>
            <p class="text-gray-700">รหัสนักศึกษา {{ studentinfo.studentid }}</p>
          </div>

          <!-- Details Section -->
          <div class="space-y-2 my-4">
            <p v-if="selectedSlot.type == 1" class="font-medium">
              เรื่อง แบบคำขอกู้ยืม
            </p>
            <p v-if="selectedSlot.type == 2" class="font-medium">
              เรื่อง สัญญากู้ยืม และ แบบเบิกเงินกู้ยืม
            </p>
            <p>วันที่ {{ selectedSlot.date }}</p>
            <div class="flex items-center justify-center gap-2 text-gray-600">
              <ClockIcon class="w-4 h-4 me-2" />
              <span>{{ selectedSlot.time }}</span>
            </div>
          </div>

          <!-- Warning Section -->
          <div class="text-red-500 text-sm">
            <!-- <p>หลังจากจองแล้ว</p>
            <p>กรุณาตรวจสอบที่อีเมล ตรวจรายการจอง</p> -->
          </div>

          <!-- Buttons Section -->
          <div class="flex gap-4 justify-center mt-6">
            <button
              @click="$emit('cancel')"
              class="px-8 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ยกเลิก
            </button>
            <button
              @click="handleConfirm"
              class="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
