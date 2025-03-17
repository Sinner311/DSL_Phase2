<script setup>
import { reactive } from 'vue';

const item = reactive({
  option_1: {
    title: 'ระบบเรียกคิว',
    image: '/assets/img/option_4.jpg',
    icon: 'fa-solid fa-volume-high', 
    link: '/admin/callqueue' //ไปหน้าไหนมากำหนดตรงนี้
  },
  option_2: {
    title: 'ตั้งค่าวันที่',
    image: '/assets/img/wantee.jpg',
    icon: 'fa-solid fa-calendar-days', 
    link: '/admin/daysetting' //ไปหน้าไหนมากำหนดตรงนี้
  },
  option_3: {
    title: 'หน้าจอแสดงคิวใน TV',
    image: '/assets/img/TVQ.jpg',
    icon: 'fa-solid fa-tv', 
    link: '/admin/dashboard' //ไปหน้าไหนมากำหนดตรงนี้
  },
  option_4: {
    title: 'คะแนนการประเมิน',
    image: '/assets/img/star.jpg',
    icon: 'fas fa-star', 
    link: '/admin/tablereview' //ไปหน้าไหนมากำหนดตรงนี้
  },
  option_5: {
    title: 'เพิ่มเจ้าหน้าที่',
    image: '/assets/img/police.jpg',
    icon: 'fas fa-plus', 
    link: '/admin/addstaff' //ไปหน้าไหนมากำหนดตรงนี้
  },
  option_6: {
    title: 'ตั้งค่าระบบ',
    image: '/assets/img/setting.jpg',
    icon: 'fa-solid fa-cog', 
    link: '/admin/setting' //ไปหน้าไหนมากำหนดตรงนี้
  },
  option_7: {
    title: 'รายการจอง',
    image: '/assets/img/list.jpg',
    icon: 'fa-solid fa-list', 
    link: '/admin/bookinglist' //ไปหน้าไหนมากำหนดตรงนี้
  },
});
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
          class="relative overflow-hidden rounded-lg shadow-lg group"
        >
          <!-- Image -->
          <img
            :src="option.image"
            alt="Option Image"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <!-- Dark Overlay -->
          <div class="absolute inset-0 bg-black opacity-70"></div>

          <!-- Text Content -->
          <div class="absolute inset-0 p-4 text-white flex flex-col items-center justify-center">
            <!-- Icon -->
            <i :class="option.icon" class="text-4xl mb-4"></i> <!-- Font Awesome Icon -->

            <!-- Title -->
            <h3 class="text-3xl font-bold mb-2 text-center">{{ option.title }} </h3> <!-- Increased text size -->
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>