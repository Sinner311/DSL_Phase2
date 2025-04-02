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
          <i class="text-4xl fa-solid fa-list"></i>
          <h1 class="text-3xl font-bold text-center">รายการจอง</h1>
        </div>
        <div>
          <div class="grid gap-4">
            <button
              v-for="(slot, index) in timeSlots"
              :key="index"
              :class="[
                'w-full p-4 border rounded-lg',
                slot.status === 'disable'
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'hover:bg-green-100 hover:text-black bg-indigo-700 text-white',
                selectedSlot === slot
                  ? 'bg-green-500 text-white'
                  : 'border-gray-300',
              ]"
              :disabled="slot.isFull || slot.isPast"
              @click="handleSlotSelection(slot)"
            >
              <div class="flex justify-between items-center w-full">
                <span>{{ slot.date }}</span>
                <span>{{ slot.time }}</span>
                <span>ผู้รับบริการสูงสุด {{ slot.maxuser }} คน</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

 
</template>
