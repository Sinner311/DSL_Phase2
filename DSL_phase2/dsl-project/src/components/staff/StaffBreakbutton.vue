<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const webSettings = ref(null);
const isSystemActive = ref(null);
const buttonText = ref("พักระบบ");

// ดึง Token จาก localStorage (ถ้ามี)
const accesstoken = localStorage.getItem("accessToken");

// 👉 ฟังก์ชันย้อนกลับ
function handleBack() {
  router.push({ path: "/staff" });
}

//  ฟังก์ชันอัปเดตข้อความและส่ง API
const updateText = async () => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_IP}/api/round/geteditwebSettings`,
      {
        web_break_text: buttonText.value,
        web_status: isSystemActive.value ? "normal" : "disable",
      },
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (response.status === 200) {
      await Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
        position: "top-start", // ตำแหน่งแจ้งเตือนที่มุมซ้ายบน
      });
    } else {
      throw new Error("Failed to update settings.");
    }
  } catch (error) {
    console.error("Error updating settings:", error);
  }
};

//  ดึงค่า webSettings จาก API
async function getwebSettings() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_IP}/api/round/getwebSettings`);
    
    if (res.status === 200 && res.data) {
      webSettings.value = res.data;
      buttonText.value = webSettings.value.web_break_text || "พักระบบ";
      isSystemActive.value = webSettings.value.web_status === "normal";
    } else {
      throw new Error("Failed to fetch web settings.");
    }
  } catch (error) {
    console.error("Error fetching web settings:", error);
  }
}

//  อัปเดต API อัตโนมัติเมื่อเปลี่ยน Toggle Switch
watch(isSystemActive, updateText);

//  ดึงข้อมูลเมื่อโหลดหน้า
onMounted(() => {
  getwebSettings();
});
</script>

<template>
  <div class="relative w-screen m-8 flex items-center space-x-6">
    <!-- ปุ่มย้อนกลับ -->
    <button
      @click="handleBack"
      class="bg-gray-300 text-black p-4 rounded-full hover:bg-gray-400"
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

    <!-- ปุ่มพักระบบ -->
    <div class="flex items-center space-x-4  px-16">
      <!-- Toggle Switch -->
       <div class="flex flex-col">
        <div class="flex flex-row"><label class="text-gray-600 ms-9 px-11">พักระบบ</label><label class="text-gray-600">เปิดระบบ</label></div>
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
      </label></div>

 <!-- Editable Text -->
 <!-- <div class="flex flex-col">
        <label class="text-gray-600 mb-1">ข้อความพักระบบ</label>
        <div
          class="border-b border-gray-500 px-2 py-1 w-40 cursor-text"
          contenteditable="true"
          @input="buttonText"
        >
          {{ buttonText }}
        </div>
      </div> -->
    </div>
  </div>
</template>
