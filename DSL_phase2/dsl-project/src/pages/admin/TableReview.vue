<script setup>
import { ref } from 'vue';
import Navbar from '@/components/admin/Navbaradmin.vue';

const tableData = ref([
  { studentid: '071', type: '1', channel: '1', status: 'FINISH', star_rate: '5', q1: '1', q2: '1', q3: '1', q4: '1', q5: '1' },
  { studentid: '112', type: '2', channel: '1', status: 'SKIP', star_rate: '-', q1: '-', q2: '-', q3: '-', q4: '-', q5: '-'  },
  { studentid: '203', type: '3', channel: '1', status: 'FINISH', star_rate: '3', q1: '1', q2: '0', q3: '1', q4: '1', q5: '1'  },
  { studentid: '604', type: '1', channel: '1', status: 'FINISH', star_rate: '2', q1: '1', q2: '1', q3: '1', q4: '1', q5: '1'  },
  { studentid: '105', type: '1', channel: '1', status: 'NOTREVIEW', star_rate: '1', q1: '1', q2: '1', q3: '1', q4: '1', q5: '0'  },
]);

const downloadCSV = () => {
  const headers = ['รหัสนักศึกษา', 'ประเภท', 'ช่องบริการ', 'สถานะ', 'คะแนนประเมิน', 'คุณได้รับความช่วยเหลือที่ต้องการหรือไม่', 'ความรวดเร็วในการตอบคำถาม', 'ความสามารถในการแก้ไขปัญหา', 'ทักษะในการสื่อสาร', 'มารยาทในการสนทนา'];
  const rows = tableData.value.map(row => [row.studentid, row.type, row.channel, row.status, row.star_rate, row.q1, row.q2, row.q3, row.q4, row.q5]);

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
            <th class="border border-gray-300 p-2 text-sm font-medium">รหัสนักศึกษา</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">ประเภท</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">ช่องบริการ</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">สถานะ</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">คะแนนประเมิน</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">คุณได้รับความช่วยเหลือที่ต้องการหรือไม่</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">ความรวดเร็วในการตอบคำถาม</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">ความสามารถในการแก้ไขปัญหา</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">ทักษะในการสื่อสาร</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">มารยาทในการสนทนา</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td class="border border-gray-300 p-2">{{ row.studentid }}</td>
            <td class="border border-gray-300 p-2">{{ row.type }}</td>
            <td class="border border-gray-300 p-2">{{ row.channel }}</td>
            <td class="border border-gray-300 p-2">{{ row.status }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.star_rate }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q1 }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q2 }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q3 }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q4 }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q5 }}</td>
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
  