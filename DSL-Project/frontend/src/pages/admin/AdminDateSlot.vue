<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { useCookies } from "vue3-cookies";
import { useRoute } from "vue-router";
import Navbar from "@/components/admin/NavbarAdmin.vue";
import Backbutton from "@/components/admin/AdminBackbutton.vue";

const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const timeSlots = ref([]);
const selectedSlot = ref(null);
const showEditCard = ref(false);
const route = useRoute();
const requestRoundid = Number(route.query.roundid);
const newDateid = ref("");
const newStatus = ref("");
const newMaxuser = ref("");
const newStarttime = ref("");
const newEndtime = ref("");

async function getAllDate() {
  if (requestRoundid) {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_IP
        }/round/getSpecificDate?roundid=${requestRoundid}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (response.status === 200) {
        const dateData = response.data;

        timeSlots.value = await Promise.all(
          dateData.map(async (day) => {
            return {
              dateid: day.dateid,
              date: `${new Date(day.date).getDate()} ${
                formatDate(day.date).month
              } ${formatDate(day.date).year}`,
              time: `${formatTime(day.starttime)} - ${formatTime(day.endtime)}`,
              starttime: day.starttime,
              endtime: day.endtime,
              maxuser: day.maxuser,
              status: day.status,
            };
          })
        );
      } else {
        throw new Error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_IP}/round/getRangeDate`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (response.status === 200) {
        const dateData = response.data;

        timeSlots.value = await Promise.all(
          dateData.map(async (day) => {
            return {
              dateid: day.dateid,
              date: `${new Date(day.date).getDate()} ${
                formatDate(day.date).month
              } ${formatDate(day.date).year}`,
              time: `${formatTime(day.starttime)} - ${formatTime(day.endtime)}`,
              starttime: day.starttime,
              endtime: day.endtime,
              maxuser: day.maxuser,
              status: day.status,
            };
          })
        );
      } else {
        throw new Error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  newDateid.value = selectedSlot.value.dateid;
  newStatus.value = selectedSlot.value.status;
  newMaxuser.value = selectedSlot.value.maxuser;
  newStarttime.value = formatTime(selectedSlot.value.starttime);
  newEndtime.value = formatTime(selectedSlot.value.endtime);
  console.log(newDateid.value,newStarttime.value, newEndtime.value);
  showEditCard.value = true;
}

// ฟังก์ชันยกเลิกการเลือก
function handleCancel() {
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

const cancelEditday = () => {
  showEditCard.value = false;
};

const confirmEditday = async () => {
  if (
    newDateid.value &&
    newStatus.value &&
    newMaxuser.value &&
    newStarttime.value &&
    newEndtime.value
  ) {
    try {
      // แปลงเวลาให้เป็นรูปแบบเต็ม
      const formattedStartTime = `1970-01-01T${newStarttime.value}:00Z`;
      const formattedEndTime = `1970-01-01T${newEndtime.value}:00Z`;

      const response = await axios.put(
        `${import.meta.env.VITE_APP_IP}/round/geteditSpecificDate`,
        {
          dateid: newDateid.value,
          status: newStatus.value,
          maxuser: newMaxuser.value,
          starttime: formattedStartTime,  
          endtime: formattedEndTime,      
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (response.status === 200) {
        showEditCard.value = false;
        await Swal.fire({
          icon: "success",
          title: "แก้ไขวันสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllDate();
      } else {
        throw new Error("Failed to add staff.");
      }
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  }
};

const validatePositiveNumber = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (Number(target.value) < 0) {
    target.value = ""; // ล้างค่าถ้าเป็นค่าลบ
  }
};

// ดึงข้อมูลเมื่อ component ถูก mount
onMounted(() => {
  getAllDate();
});
</script>

<template>
  <div :class="{ 'blur-background': selectedSlot !== null }">
    <Navbar />
    <Backbutton />

    <div class="w-full max-w-2xl mx-auto mt-14">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center space-x-4 mb-6">
          <i class="text-4xl fa-solid fa-cog"></i>
          <h1 class="text-3xl font-bold text-center">ตั้งค่าวันที่</h1>
        </div>
        <div>
          <div class="grid gap-4">
            <button
              v-for="(slot, index) in timeSlots"
              :key="index"
              :class="[
                'w-full p-4 border rounded-lg',
                slot.status === 'disable'
                  ? 'bg-gray-200 text-gray-500'
                  : 'hover:bg-green-100 hover:text-black bg-indigo-700 text-white',
                selectedSlot === slot
                  ? 'bg-green-500 text-white'
                  : 'border-gray-300',
              ]"
              :disabled="slot.isFull || slot.isPast"
              @click="handleSlotSelection(slot)"
            >
              <div class="flex justify-between items-center w-full">
                <span class="flex-1">{{ slot.date }}</span>
                <span class="flex-1">{{ slot.time }}</span>
                <span class="flex-1">ผู้รับบริการสูงสุด {{ slot.maxuser }} คน</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Staff Card -->
  <div
    v-if="showEditCard"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
  >
    <div
      class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 text-center"
    >
      <h2 class="text-xl font-bold mb-4">แก้ไขวัน</h2>
      <!-- Dropdown สำหรับเลือกสถานะ -->
      <label class="block text-left mb-2 font-medium">สถานะ:</label>
      <select
        v-model="newStatus"
        class="border border-gray-300 p-2 rounded w-full mb-4"
      >
        <option value="normal">ปกติ</option>
        <option value="disable">ปิดใช้งาน</option>
      </select>

      <!-- Input สำหรับแก้ไขจำนวนผู้ใช้สูงสุด -->
      <label class="block text-left mb-2 font-medium">จำนวนผู้ใช้สูงสุด:</label>
      <input
        v-model.number="newMaxuser"
        type="number"
        placeholder="ใส่เลขช่องบริการ"
        class="border border-gray-300 p-2 rounded w-full mb-4"
      />

      <!-- Input สำหรับเลือกเวลาเริ่มต้น -->
      <label class="block text-left mb-2 font-medium">เวลาเริ่มต้น:</label>
      <input
        v-model="newStarttime"
        type="time"
        class="border border-gray-300 p-2 rounded w-full mb-4"
      />

      <!-- Input สำหรับเลือกเวลาสิ้นสุด -->
      <label class="block text-left mb-2 font-medium">เวลาสิ้นสุด:</label>
      <input
        v-model="newEndtime"
        type="time"
        class="border border-gray-300 p-2 rounded w-full mb-4"
      />

      <div class="flex justify-around">
        <button
          @click="cancelEditday"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ยกเลิก
        </button>
        <button
          @click="confirmEditday"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          บันทึก
        </button>
      </div>
    </div>
  </div>
</template>
