<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Navbar from "@/components/admin/Navbaradmin.vue";
import AdminBackbutton from "@/components/admin/AdminBackbutton.vue";

interface TableData {
  historyid: number;
  studentid: number;
  type: number;
  channel: number;
  status: string;
  star_rate: number;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

const tableData = ref<TableData[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Function to escape CSV values
const escapeCsvValue = (value: string | number): string => {
  const escaped = `${value}`.replace(/"/g, '""');  // Escape quotes by doubling them
  return `"${escaped}"`;  // Enclose in quotes to handle commas or newlines
};

// Fetch data from the backend API
const fetchData = async () => {
  try {
    const response = await axios.get<TableData[]>(
      `${import.meta.env.VITE_APP_IP}/api/history/getHistoryQueueData`
    ); // Replace with your actual backend URL
    tableData.value = response.data;
  } catch (err) {
    error.value = "Error fetching data. Please check your backend.";
    console.error("Error fetching data:", err);
  } finally {
    loading.value = false;
  }
};

// Fetch the data when the component is mounted
onMounted(fetchData);

// Watch tableData updates for debugging
watch(tableData, (newData) => {
  console.log("Updated Table Data:", newData);
});

// Function to download data as CSV
const downloadCSV = () => {
  if (tableData.value.length === 0) {
    alert("ไม่มีข้อมูลให้ดาวน์โหลด");
    return;
  }

  const headers = [
    "ลำดับ",
    "รหัสนักศึกษา",
    "ประเภท",
    "ช่องบริการ",
    "สถานะ",
    "คะแนนประเมิน",
    "คุณได้รับความช่วยเหลือที่ต้องการหรือไม่",
    "ความรวดเร็วในการตอบคำถาม",
    "ความสามารถในการแก้ไขปัญหา",
    "ทักษะในการสื่อสาร",
    "มารยาทในการสนทนา",
  ];

  const rows = tableData.value.map((row) => [
    row.historyid,
    row.studentid,
    row.type,
    row.channel,
    row.status,
    row.star_rate,
    row.q1,
    row.q2,
    row.q3,
    row.q4,
    row.q5,
  ]);

  // Prepare CSV content
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [
      headers.map(escapeCsvValue), // Escape headers
      ...rows.map((row) => row.map(escapeCsvValue)) // Escape data rows
    ]
      .map((e) => e.join(","))
      .join("\n");

  // Create a Blob and generate a download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "review_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
  <Navbar />
  <AdminBackbutton />
  <div class="p-4 m-10">
    <h2 class="text-lg font-semibold mb-4 text-center">คะแนนประเมิน</h2>

    <!-- Error message -->
    <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center text-gray-600">กำลังโหลดข้อมูล...</div>

    <div v-else>
      <div class="flex justify-end mb-5">
        <button
          @click="downloadCSV"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          ดาวน์โหลด CSV
        </button>
      </div>

      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2 text-sm font-medium">ลำดับ</th>
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
            <td class="border border-gray-300 p-2 text-center">{{ row.historyid }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.studentid }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.type }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.channel }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.status }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.star_rate }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q1 }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q2 }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q3 }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q4 }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.q5 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
