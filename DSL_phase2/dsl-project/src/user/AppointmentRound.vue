<script setup>
import Navbar from '@/components/Navbar.vue';

// Array of rounds
const rounds = [
  {
    title: 'รอบที่ 1',
    dateRange: 'ระหว่างวันที่ 16-31 สิงหาคม 2567',
    imageUrl: '/src/assets/img/option_1.jpg',
    status: 'Avaliable',
  },
  {
    title: 'รอบที่ 2',
    dateRange: 'ระหว่างวันที่ 1-15 กันยายน 2567',
    imageUrl: '/src/assets/img/option_2.jpg',
    status: 'Upcoming',
  },
  {
    title: 'รอบที่ 3',
    dateRange: 'ระหว่างวันที่ 16-30 กันยายน 2567',
    imageUrl: '/src/assets/img/option_3.jpg',
    status: 'Upcoming',
  },
  {
    title: 'รอบที่ 4',
    dateRange: 'ระหว่างวันที่ 1-15 ตุลาคม 2567',
    imageUrl: '/src/assets/img/option_3.jpg',
    status: 'Upcoming',
  },
  {
    title: 'รอบที่ 5',
    dateRange: 'ระหว่างวันที่ 16-31 ตุลาคม 2567',
    imageUrl: '/src/assets/img/option_1.jpg',
    status: 'Upcoming',
  },
];
</script>

<template>
  <Navbar />
  <div class="max-w-4xl mx-auto p-4 mt-10">
    <h1 class="text-2xl font-bold mb-6 text-center">กรุณาเลือกรอบที่ต้องการส่งแบบคำขอกู้ยืม</h1>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Loop through rounds array -->
      <div v-for="(round, index) in rounds" :key="index" class="relative overflow-hidden rounded-lg shadow-lg group">
        <img 
          :src="round.imageUrl" 
          :alt="round.title" 
          class="w-full h-48 object-cover brightness-50 group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 p-4 text-white">
          <h3 class="text-xl font-bold mb-2">{{ round.title }}</h3>
          <p class="text-sm font-bold">{{ round.dateRange }}</p>
          <div v-if="round.status === 'Avaliable'" class="mt-2 text-green-400">Avaliable</div>
          <div v-else class="mt-2 text-gray-400">Upcoming</div>
        </div>
      </div>
    </div>
  </div>
</template>
