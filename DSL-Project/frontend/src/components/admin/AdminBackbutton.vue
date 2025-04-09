<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

function handleBack() {

  if (route.path === "/admin/daysetting") {
    router.push({ path: "/admin" }); 
  } 
  else if (route.path.startsWith("/admin/daysetting/")) {
    router.push({ path: "/admin/daysetting" }); 
  } 
  else if (route.path.startsWith("/admin/editday")) {
    router.push({ path: "/admin/daysetting" }); 
  } 
  
  else {
    router.push({ path: "/admin" });
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
