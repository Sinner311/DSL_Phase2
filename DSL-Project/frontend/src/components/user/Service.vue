<script setup>
import { reactive } from 'vue';

const item = reactive({
    option_1:{
      title: 'จองวันส่งแบบคำขอกู้ยืม',
      subtitle: '',
      image: '/assets/img/option_1.jpg',
      link: '/user/appointment1'
    },option_2:{
      title: 'จองวันส่งสัญญากู้ยืม และ แบบเบิกเงินกู้ยืม',
      subtitle: '',
      image: '/assets/img/option_2.jpg',
      link: '/user/appointment2'
    },option_3:{
        title: 'ตรวจสอบรายการจอง',
      subtitle: 'ตรวจสอบ เปลี่ยนแปลง ยกเลิก รายการจองของคุณ',
      image: '/assets/img/option_3.jpg',
      link: '/user/myappointment'
    },option_4:{
        title: 'รับคิว',
      subtitle: 'ผู้กู้ยืม กดเพื่อรับคิวหน้าห้องกยศ. กรุณามาที่หน้าห้องกยศ.ก่อนกดรับคิว เริ่มรับคิวได้ตั้งแต่ 8:30 - 16:00 น.',
      image: '/assets/img/option_4.jpg',
      link: '/user/queue'
    }
})
</script>

<template>
    <section class="py-10 mb-4">
        <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
 <!-- Card Loop -->
 <router-link
          v-for="(option, index) in item"
          :key="index"
          :to="option.link"
          class="relative overflow-hidden rounded-lg shadow-lg group">
          <img 
            :src="option.image" 
            alt="Order Reservation" 
            class="w-full h-48 object-cover brightness-50 group-hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute inset-0 p-4 text-white">
            <h3 
  class="font-bold mb-2"
  :class="option.subtitle ? 'text-xl' : 'text-2xl'"
>
  {{ option.title }}
</h3>
<p v-if="option.subtitle" class="text-sm mb-4">{{ option.subtitle }}</p>
            <div class="absolute bottom-4 right-4">
                <div class="rounded-full p-2 group-hover:bg-gray-200 group-hover:text-gray-800 group-hover:rounded-full transition-colors">
                <svg class="w-6 h-6 text-white-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    </section>
  </template>