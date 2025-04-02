<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Navbar from "@/components/admin/NavbarAdmin.vue";
import AdminBackbutton from "@/components/admin/AdminBackbutton.vue";



const downloadCSV = () => {
  if (!tableData.value || tableData.value.length === 0) {
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
  ];

  const rows = tableData.value.map((row, index) => [
    row.historyid,
    row.studentid || "-",
    row.type ? formatType(row.type) : "-",
    row.channel !== null ? row.channel : "-",
    row.status ? row.status.toUpperCase() : "-",
    row.star_rate !== null ? row.star_rate : "-",
  ]);

  function escapeCsvValue(value) {
    if (typeof value === "string") {
      return `"${value.replace(/"/g, '""')}"`; // Escape double quotes
    }
    return value;
  }

  function formatType(type) {
    switch (type) {
      case 1:
        return "แบบคำขอกู้ยืม";
      case 2:
        return "สัญญากู้ยืม และ แบบเบิกเงินกู้ยืม";
      default:
        return "อื่น ๆ";
    }
  }

  // เปลี่ยนจากการใช้ Data URI เป็นแค่ข้อมูล CSV ปกติ
  const csvContent =
    [headers.map(escapeCsvValue), ...rows.map((row) => row.map(escapeCsvValue))]
      .map((e) => e.join(",")) // แปลงเป็น CSV format
      .join("\n");

  const bom = "\uFEFF"; // ใช้ BOM เพื่อรองรับภาษาไทย
  const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "review_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};







interface TableData {
  historyid: number;
  studentid: number;
  type: number;
  channel: number;
  status: string;
  star_rate: number;
}

const tableData = ref<TableData[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(20); // ค่าเริ่มต้น
const itemsPerPageOptions = [20, 100, 500, 1000]; // ตัวเลือกจำนวนแถวต่อหน้า

// ดึงข้อมูลจาก API
const fetchData = async () => {
  try {
    const response = await axios.get<TableData[]>(
      `${import.meta.env.VITE_APP_IP}/history/getHistoryQueueData`
    );
    tableData.value = response.data;
  } catch (err) {
    error.value = "Error fetching data. Please check your backend.";
    console.error("Error fetching data:", err);
  } finally {
    loading.value = false;
  }
};

// ฟังก์ชันช่วยแปลงประเภท
const formatType = (type: number) => {
  switch (type) {
    case 1:
      return "แบบคำขอกู้ยืม";
    case 2:
      return "สัญญากู้ยืม และ แบบเบิกเงินกู้ยืม";
    default:
      return "อื่น ๆ";
  }
};

// คำนวณรายการที่ต้องแสดงในหน้าปัจจุบัน และเรียงจากมากไปน้อย
const paginatedData = computed(() => {
  const sortedData = [...tableData.value].sort((a, b) => b.historyid - a.historyid); // เรียงลำดับจากมากไปน้อย
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return sortedData.slice(start, start + itemsPerPage.value);
});

// คำนวณจำนวนหน้าทั้งหมด
const totalPages = computed(() => Math.ceil(tableData.value.length / itemsPerPage.value));

// เปลี่ยนหน้า
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// ดึงข้อมูลเมื่อโหลดหน้า
onMounted(fetchData);
</script>

<template>
  <Navbar />
  <AdminBackbutton />
  <div class="p-4 m-10">
    <p class="text-center mt-10 mb-10 text-5xl font-bold">คะแนนประเมิน</p>

    <!-- Error message -->
    <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center text-gray-600">กำลังโหลดข้อมูล...</div>

    <div v-else>

      <!-- ตัวเลือกจำนวนข้อมูลต่อหน้า -->
      <div class="flex justify-between items-center mb-5">
        <div class="flex justify-start ">
        <label for="itemsPerPage" class="text-lg font-semibold p-2">แสดงข้อมูลต่อหน้า:</label>
        <select
          id="itemsPerPage"
          v-model="itemsPerPage"
          class="border p-2 rounded-lg"
        >
          <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
        <div class="flex justify-end ">
        <button
          @click="downloadCSV"
          class="px-4 py-2 bg-green-500 text-white rounded-3xl hover:bg-green-600"
        >
          ดาวน์โหลด CSV
        </button>
      </div>
      </div>

      <!-- ตาราง -->
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2 text-sm font-medium">ลำดับ</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">รหัสนักศึกษา</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">ประเภท</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">ช่องบริการ</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">สถานะ</th>
            <th class="border border-gray-300 p-2 text-sm font-medium">คะแนนประเมิน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in paginatedData" :key="index">
            <td class="border border-gray-300 p-2 text-center">{{ row.historyid }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.studentid }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ formatType(row.type) }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.channel }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.status.toUpperCase() }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ row.star_rate }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="flex justify-center items-center mt-5 space-x-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 bg-gray-300 rounded-3xl"
        >
          ก่อนหน้า
        </button>

        <span class="text-lg font-semibold">หน้า {{ currentPage }} / {{ totalPages }}</span>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 bg-gray-300 rounded-3xl"
        >
          ถัดไป
        </button>
      </div>
    </div>
  </div>
</template>
