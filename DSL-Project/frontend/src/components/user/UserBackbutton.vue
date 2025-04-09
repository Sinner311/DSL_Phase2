<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

function handleBack() {
  console.log("ย้อนกลับ");


  // เช็ค params.type
  if (route.query.type === '1') {
    router.push({ path: "/user/appointment1" });
  } else if (route.query.type === '2') {
    router.push({ path: "/user/appointment2" });
  } 
  // กรณีอื่น ๆ
  else {
    router.push({ path: "/user" });
  }
}
</script>

<template>
  <div class="sticky top-16 z-40 inline-flex items-center space-x-6 ml-8 my-2">
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
  </div>
</template>
