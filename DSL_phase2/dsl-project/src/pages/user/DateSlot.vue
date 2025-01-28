<script setup>
import axios from "axios";
import Swal from 'sweetalert2';
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { useRoute } from "vue-router";
import Navbar from "@/components/user/Navbar.vue";
import UserBackbutton from "@/components/user/UserBackbutton.vue";
import AlertCard from "@/components/user/AlertCard.vue";

const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const timeSlots = ref([]);
const selectedSlot = ref(null);
// ใช้ useRoute เพื่อดึงข้อมูล query parameter
const route = useRoute();
const requestRoundid = Number(route.query.roundid);
const requestType = Number(route.query.type);
// ฟังก์ชันดึงข้อมูลวันที่จาก API
async function getAllDate() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_IP}/api/round/getSpecificDate?roundid=${requestRoundid}`,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (response.status === 200) {
      timeSlots.value = response.data.map((day) => ({
        dateid: day.dateid,
        type: requestType,
        date: `${new Date(day.date).getDate()} ${formatDate(day.date).month} ${formatDate(day.date).year}`,
        time: `${formatTime(day.starttime)} - ${formatTime(day.endtime)}`,
        remaining: day.maxuser-50, // จำลองข้อมูลผู้ใช้ที่เหลือ
        isFull: day.maxuser <= 50, // ถ้าเต็มให้แสดงสถานะเต็ม
      }));
      
    } else {
      throw new Error("Failed to fetch data.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
  
  const year = date.getFullYear() + 543; // Convert to Buddhist year
  const month = monthNames[date.getMonth()]; // Get Thai month name
  return { month, year };
}


// ฟังก์ชันจัดการการเลือกช่องเวลา
function handleSlotSelection(slot) {
  selectedSlot.value = slot;
}


// ฟังก์ชันยกเลิกการเลือก
function handleCancel() {
  selectedSlot.value = null;
}

// ฟังก์ชันยืนยันการเลือก
async function handleConfirm(id) {
  console.log("ยืนยันการเลือก:", selectedSlot.value.type, selectedSlot.value.dateid ,id);
  if (selectedSlot.value.type&&selectedSlot.value.dateid&&id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_IP}/api/booking/makebooking`,
        { 
          id: id,
          type: selectedSlot.value.type,
          dateid: selectedSlot.value.dateid,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "จองคิวล่วงหน้าสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllDate(); // เรียกฟังก์ชันเพื่ออัปเดตข้อมูลใหม่
      } else {
        throw new Error("Failed to add booking.");
      }
    } catch (error) {
      console.error("Error adding booking:", error);

      // ใช้ Swal แสดงข้อความแจ้งเตือนข้อผิดพลาด
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text:
          error.response?.data?.message || // แสดงข้อความจาก API (ถ้ามี)
          "ไม่สามารถจองคิวได้ กรุณาลองใหม่อีกครั้ง", // ข้อความเริ่มต้น
        showConfirmButton: true,
      });
    }
  } else {
    await Swal.fire({
      icon: "warning",
      title: "ข้อมูลไม่ครบถ้วน",
      text: "กรุณาเลือกข้อมูลให้ครบก่อนทำการยืนยัน",
      showConfirmButton: true,
    });
  }
  selectedSlot.value = null;
}


// ฟังก์ชันช่วยจัดรูปแบบเวลา
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

// ดึงข้อมูลเมื่อ component ถูก mount
getAllDate();
</script>

<template>
  <div :class="{ 'blur-background': selectedSlot !== null }">
    <Navbar />
    <UserBackbutton />

    <div class="w-full max-w-2xl mx-auto mt-14">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-center">
            กรุณาเลือกวันที่ต้องการจองคิว
          </h2>
        </div>
        <div>
          <div class="grid gap-4">
            <button
              v-for="(slot, index) in timeSlots"
              :key="index"
              :class="[
                'w-full p-4 border rounded-lg',
                slot.isFull
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'hover:bg-green-100 hover:text-black bg-indigo-700 text-white',
                selectedSlot === slot ? 'bg-green-500 text-white' : 'border-gray-300',
              ]"
              :disabled="slot.isFull"
              @click="handleSlotSelection(slot)"
            >
              <div class="flex justify-between items-center w-full">
                <span>{{ slot.date }}</span>
                <span>{{ slot.time }}</span>
                <span>เหลือ {{ slot.remaining }} คิว</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Alert Card -->
  <div v-if="selectedSlot !== null" class="alert-card-container">
    <AlertCard
      @cancel="handleCancel"
      @confirm="handleConfirm"
      :selected-slot="selectedSlot"
    />
  </div>
</template>
