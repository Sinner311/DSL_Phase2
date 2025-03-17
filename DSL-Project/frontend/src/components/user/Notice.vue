<script setup>
import { defineProps } from 'vue';

defineProps({
  title:{
    type:String,
    default: 'ห้อง กยศ. เปิดทำการ วันจันทร์ - ศุกร์'
  },time:{
    type:String,
    default: '8.30 - 16.00 น.'
  }
  ,subtitle:{
    type:String,
    default: 'โปรดเลือกประเภทที่ต้องการจอง'
  }
})
</script>

<template>
    <section class=" py-20 mb-1">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div class="text-center">
        <h1 class="text-xl font-extrabold  sm:text-4xl md:text-6xl mb-3">{{title}}</h1>
          <h1 class="text-2xl font-extrabold  sm:text-4xl md:text-6xl mb-20">เวลา <span class="text-indigo-900">{{ time }}</span></h1>
          <!-- <p class="font-bold text-sm  sm:text-lg md:text-2xl mb-2"><span class="text-red-500">คำเตือน</span> หน้าเว็บนี้ <span class="text-red-500">เป็นการจองวันเท่านั้น</span> ส่วนการจองคิวต้องไปสแกน QR CODE หน้าห้อง กยศ.</p> -->
          <p class="font-bold text-sm  sm:text-lg md:text-2xl">{{ subtitle }}</p>
        </div>
      </div>
    </section>
</template>