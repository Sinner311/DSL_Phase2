<script setup>
import { defineProps } from 'vue';

defineProps({
  title:{
    type:String,
    default: 'ห้อง กยศ เปิดทำการ วันจันทร์ - ศุกร์'
  },time:{
    type:String,
    default: '8.30 - 4.00  '
  }
  ,subtitle:{
    type:String,
    default: 'โปรดเลือกประเภทที่ต้องการจอง'
  }
})
</script>

<template>
    <section class=" py-20 mb-2">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div class="text-center">
        <h1 class="text-xl text-sky-500 font-extrabold  sm:text-4xl md:text-6xl mb-2">วันศุกร์</h1>
        <h1 class="text-xl font-extrabold  sm:text-4xl md:text-6xl">เปิดรับเฉพาะเอกสารแก้ไข</h1>
        </div>
      </div>
    </section>
</template>