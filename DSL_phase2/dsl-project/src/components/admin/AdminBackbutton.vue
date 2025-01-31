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
  <div class="relative w-screen bg-gray-100 p-4">
    <!-- ปุ่มย้อนกลับ -->
    <button
      @click="handleBack"
      class="bg-gray-300 text-black px-10 py-5 rounded-md hover:bg-gray-400"
    >
      ย้อนกลับ
    </button>
  </div>
</template>
