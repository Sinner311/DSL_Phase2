<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const webSettings = ref(null);
const isSystemActive = ref(null);
const buttonText = ref("พักระบบ");
const isTextEdited = ref(false); // ตรวจสอบว่ามีการแก้ไขข้อความหรือไม่

// ดึง Token จาก localStorage (ถ้ามี)
const accesstoken = localStorage.getItem("accessToken");

// ฟังก์ชันย้อนกลับ
function handleBack() {
  router.push({ path: "/admin" });
}

// ฟังก์ชันอัปเดต Toggle Switch
const updateStatus = async () => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_IP}/round/geteditwebSettings`,
      {
        web_status: isSystemActive.value ? "normal" : "disable",
      },
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (response.status === 200) {
    } else {
      throw new Error("Failed to update settings.");
    }
  } catch (error) {
    console.error("Error updating settings:", error);
  }
};

// ฟังก์ชันอัปเดตข้อความเมื่อกด Save
const updateText = async () => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_IP}/round/geteditwebSettings`,
      {
        web_break_text: buttonText.value,
      },
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (response.status === 200) {
      isTextEdited.value = false; // ซ่อนปุ่ม Save หลังจากบันทึกสำเร็จ
    } else {
      throw new Error("Failed to update text.");
    }
  } catch (error) {
    console.error("Error updating text:", error);
  }
};

// ฟังก์ชันอัปเดตข้อความจาก Editable Text
const updateButtonText = (event) => {
  buttonText.value = event.target.innerText.trim();
  isTextEdited.value = true; // แสดงปุ่ม Save เมื่อมีการแก้ไขข้อความ
};

// ดึงค่า webSettings จาก API
async function getwebSettings() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_IP}/round/getwebSettings`);
    
    if (res.status === 200 && res.data) {
      webSettings.value = res.data;
      // ใช้ค่าเริ่มต้นจาก API หากยังไม่ได้แก้ไขข้อความ
      if (!isTextEdited.value) {
        buttonText.value = webSettings.value.web_break_text || "พักระบบ";
      }
      isSystemActive.value = webSettings.value.web_status === "normal";
    } else {
      throw new Error("Failed to fetch web settings.");
    }
  } catch (error) {
    console.error("Error fetching web settings:", error);
  }
}

// อัปเดต API อัตโนมัติเมื่อเปลี่ยน Toggle Switch
watch(isSystemActive, updateStatus);

// ดึงข้อมูลเมื่อโหลดหน้า
onMounted(() => {
  getwebSettings(); // เรียกครั้งแรกเมื่อโหลดหน้า

  // ใช้ setInterval เพื่อดึงข้อมูลทุก 10 วินาที
  setInterval(() => {
    getwebSettings();
  }, 10000); // 10000ms = 10 วินาที
});
</script>

<template>
  <div class="relative top-7 w-screen m-8 flex items-center space-x-6 mb-5">
    <!-- ปุ่มย้อนกลับ -->
    <button
      @click="handleBack"
      class="bg-gray-300 text-black p-4 mt-5 rounded-full hover:bg-gray-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <!-- Toggle Switch -->
    <div class="flex items-center space-x-4 px-16 mt-5">
      <div class="flex flex-col">
        <div class="flex flex-row">
          <label class="text-gray-600 ms-9 px-11">พักระบบ</label>
          <label class="text-gray-600">เปิดระบบ</label>
        </div>
        <label class="flex items-center cursor-pointer ps-16 ms-16">
          <input type="checkbox" v-model="isSystemActive" class="hidden" />
          <div
            class="relative w-16 h-8 bg-gray-300 rounded-full transition-all"
            :class="{ 'bg-green-500': isSystemActive }"
          >
            <div
              class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all"
              :class="{ 'translate-x-8': isSystemActive }"
            ></div>
          </div>
        </label>
      </div>

      <!-- Editable Text -->
      <div class="flex flex-col">
        <label class="text-gray-600 mb-1">ข้อความพักระบบ</label>
        <div
          class="border-b border-gray-500 px-2 py-1 min-w-[300px] w-80 cursor-text"
          contenteditable="true"
          @input="updateButtonText"
        >
          {{ buttonText }}
        </div>

        <!-- ปุ่ม Save -->
        <button
          v-if="isTextEdited"
          @click="updateText"
          class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-600 transition w-32"
        >
          บันทึกข้อความ
        </button>
      </div>
    </div>
  </div>
</template>
