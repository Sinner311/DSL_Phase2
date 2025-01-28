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
