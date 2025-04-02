<template>
  <div class="text-center mt-20 bg-blue-900 p-5">
    <!-- ตัวอักษรที่สามารถเปลี่ยนค่าได้ -->
    <p
      v-if="isSystemActive"
      class="font-bold text-6xl text-white animate-marquee"
    >
      {{ dynamicText }}
    </p>
    <p
      v-if="!isSystemActive"
      class="font-bold text-6xl text-red-500 animate-marquee"
    >
      {{ buttonText }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";

const webSettings = ref(null);
const isSystemActive = ref(null);
const buttonText = ref("พักระบบ");

async function getwebSettings() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/round/getwebSettings`
    );

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

const dynamicText = ref("ระบบเปิดเรียกคิวปกติ");

// อัปเดต API ทุกๆ 10 วินาที
onMounted(() => {
  getwebSettings(); // เรียก API ครั้งแรกเมื่อเริ่มต้น

  // ตั้งเวลาให้เรียก API ทุกๆ 10 วินาที
  const interval = setInterval(getwebSettings, 10000);

  // ทำความสะอาดเมื่อ component ถูกทำลาย
  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
/* Animation for left-to-right marquee */
@keyframes marquee {
  100% {
    transform: translateX(-100%);
  }
  0% {
    transform: translateX(100%);
  }
}

/* ใช้แอนิเมชั่นเลื่อนข้อความ */
.animate-marquee {
  display: flex;
  white-space: nowrap; /* ข้อความไม่ต้องการขึ้นบรรทัดใหม่ */
  padding-left: 50rem;
  width: max-content;
  animation: marquee 10s linear infinite; /* ใช้แอนิเมชั่น */
}
</style>