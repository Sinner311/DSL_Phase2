<script setup>
import Navbar from '@/components/user/Navbar.vue';
import UserBackbutton from '../../components/user/UserBackbutton.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useCookies } from "vue3-cookies";
import { useRouter } from 'vue-router'; 

const router = useRouter(); 
const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
// Array of rounds
const rounds = ref([]);

async function getRound() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_IP}/round/getRound`,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (response.status === 200) {
      // กรองเฉพาะ type ที่เป็น 1
      const filteredRounds = response.data.filter((round) => round.type === 1);
      rounds.value = filteredRounds.map((round, index) => ({
        ...round,
        serviceNumber: index + 1, // Add serviceNumber automatically
      }));
      console.log(rounds)
    } else {
      throw new Error("Failed to fetch rounds data.");
    }
  } catch (error) {
    console.error("Error fetching rounds data:", error);
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


// Navigate to a new page with params
function goToDetail(round) {
  router.push({
    path: '/user/selectdate', // Specify the path of the new page
    query: { 
      roundid: round.roundid, 
      type: round.type 
    },
  });
}


// Fetch rounds on component mount
getRound();
</script>

<template>
  <Navbar />
  <UserBackbutton />
  <div class="max-w-4xl mx-auto p-4 mt-10">
    <h1 class="text-2xl font-bold mb-6 text-center">
      กรุณาเลือกรอบที่ต้องการส่งแบบคำขอกู้ยืม
    </h1>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Loop through rounds array -->
      <div
        v-for="(card) in rounds"
        :key="card.roundid"
        class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
        @click="goToDetail(card)"
      >
        <img
          src="/assets/img/option_1.jpg"
          :alt="`รอบที่ ${card.roundnumber}`"
          class="w-full h-48 object-cover brightness-50 group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 p-4 text-white">
          <h3 class="text-xl font-bold mb-2">รอบที่ {{ card.roundnumber }}</h3>
          <p class="text-sm font-bold">ระหว่างวันที่
            {{ new Date(card.startdate).getDate() }} - {{ new Date(card.enddate).getDate() }}
            {{ formatDate(card.startdate).month }} {{ formatDate(card.startdate).year }}
          </p>
          <!-- <div
            v-if="card.status === 'normal'"
            class="mt-2 text-green-400"
          >
            Available
          </div>
          <div v-else class="mt-2 text-gray-400">
            Upcoming
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

