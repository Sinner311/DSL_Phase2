<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

const tableData = ref([
  { id: '001', datetime: '2025-01-29 12:00', type: 'A', status: 'Completed', score: '5' },
  { id: '002', datetime: '2025-01-29 12:30', type: 'B', status: 'Pending', score: '4' },
  { id: '003', datetime: '2025-01-29 13:00', type: 'C', status: 'In Progress', score: '3' },
  { id: '004', datetime: '2025-01-29 13:30', type: 'D', status: 'Completed', score: '2' },
  { id: '005', datetime: '2025-01-29 14:00', type: 'E', status: 'Canceled', score: '1' },
]);

const downloadCSV = () => {
  const headers = ['เลขประจำตัว', 'วันที่และเวลา', 'ประเภท', 'สถานะ', 'คะแนนประเมิน'];
  const rows = tableData.value.map(row => [row.id, row.datetime, row.type, row.status, row.score]);

  let csvContent = 'data:text/csv;charset=utf-8,' 
    + [headers, ...rows].map(e => e.join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'tableData.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
    <Navbar />
    <div class="p-4 m-10">
      <!-- Section Title -->
      <h2 class="text-lg font-semibold mb-4 text-center">คะแนนประเมิน</h2>
  
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2 text-sm font-medium">เลขประจำตัว</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">วันที่และเวลา</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">ประเภท</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">สถานะ</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">คะแนนประเมิน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td class="border border-gray-300 p-2">{{ row.id }}</td>
            <td class="border border-gray-300 p-2">{{ row.datetime }}</td>
            <td class="border border-gray-300 p-2">{{ row.type }}</td>
            <td class="border border-gray-300 p-2">{{ row.status }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.score }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Download Button (Aligned to Right) -->
      <div class="flex justify-end mt-5">
        <button @click="downloadCSV" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Download
        </button>
      </div>
    </div>
  </template>
  