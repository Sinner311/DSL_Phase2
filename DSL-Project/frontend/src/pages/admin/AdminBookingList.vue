<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useCookies } from "vue3-cookies";
import Navbar from "@/components/admin/NavbarAdmin.vue";
import Backbutton from "@/components/admin/AdminBackbutton.vue";

const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");

const timeSlots = ref([]);
const selectedSlot = ref(null);
const expandedDateId = ref<number | null>(null); // เก็บ dateid ของวันที่ถูกกด

async function getAllDate() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_IP}/booking/getRangeDateBooking`,
      {
        headers: { Authorization: `Bearer ${accesstoken}` },
      }
    );

    if (response.status === 200) {
      const dateData = response.data;

      timeSlots.value = dateData.map((day) => ({
        dateid: day.dateid,
        date: `${new Date(day.date).getDate()} ${formatDate(day.date).month} ${
          formatDate(day.date).year
        }`,
        time: `${formatTime(day.starttime)} - ${formatTime(day.endtime)}`,
        starttime: day.starttime,
        endtime: day.endtime,
        maxuser: day.bookingCount,
        status: day.status,
        bookings: day.bookings, // รายชื่อผู้จอง
      }));
    } else {
      throw new Error("Failed to fetch data.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function toggleDropdown(dateid: number) {
  expandedDateId.value = expandedDateId.value === dateid ? null : dateid;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const year = date.getFullYear() + 543; // แปลงเป็นพุทธศักราช
  const month = monthNames[date.getMonth()];
  return { month, year };
}

function formatTime(timeString, timeZone = "Africa/Abidjan") {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(new Date(timeString));
}

onMounted(() => {
  getAllDate();
});
</script>

<template>
  <div>
    <Navbar />
    <Backbutton />

    <div class="w-full max-w-2xl mx-auto mt-14">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center space-x-4 mb-6">
          <i class="text-4xl fa-solid fa-list"></i>
          <h1 class="text-3xl font-bold text-center">รายการจอง</h1>
        </div>

        <div class="grid gap-4">
          <div v-for="(slot, index) in timeSlots" :key="index">
            <!-- ปุ่มเลือกวัน -->
            <button
              :class="[
                'w-full p-4 border rounded-lg',
                slot.status === 'disable'
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'hover:bg-green-100 hover:text-black bg-indigo-700 text-white',
              ]"
              @click="toggleDropdown(slot.dateid)"
            >
              <div class="flex justify-between items-center w-full">
                <span class="flex-1">{{ slot.date }}</span>
                <span class="flex-1">{{ slot.time }}</span>
                <span class="flex-1">จอง {{ slot.maxuser }} คน</span>
              </div>
            </button>

            <!-- Dropdown รายชื่อการจอง -->
            <div
              v-if="expandedDateId === slot.dateid"
              class="p-4 bg-gray-100 border rounded-lg mt-2"
            >
              <h3 class="text-lg font-bold mb-2">รายชื่อผู้จอง</h3>

              <table
                v-if="slot.bookings.length > 0"
                class="w-full border-collapse border border-gray-300"
              >
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2 text-left">
                      รหัสนักศึกษา
                    </th>
                    <th class="border border-gray-300 px-4 py-2 text-left">
                      ชื่อ
                    </th>
                    <th class="border border-gray-300 px-4 py-2 text-left">
                      ประเภทการจอง
                    </th>
                    <th class="border border-gray-300 px-4 py-2 text-left">
                      สถานะ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(booking, i) in slot.bookings" :key="i">
                    <td class="border border-gray-300 px-4 py-2">
                      {{ booking.studentid }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      {{ booking.name }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      {{
                        booking.type === 1
                          ? "แบบคำขอกู้ยืม"
                          : booking.type === 2
                          ? "สัญญากู้ยืม และ แบบเบิกเงินกู้ยืม"
                          : " - "
                      }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      {{ booking.status.toUpperCase() }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p v-else class="text-gray-500">ไม่มีการจอง</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
