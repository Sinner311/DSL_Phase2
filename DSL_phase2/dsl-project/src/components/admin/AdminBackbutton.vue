<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function handleBack() {
  console.log("ย้อนกลับ");
  router.push({ path: "/admin" });
}
</script>

<template>
  <div class="relative w-screen  bg-gray-100 p-4">
    <!-- ปุ่มย้อนกลับ -->
    <button
      @click="handleBack"
      class="bg-gray-300 text-black px-10 py-5 rounded-md hover:bg-gray-400"
    >
      ย้อนกลับ
    </button>
  </div>
</template>
