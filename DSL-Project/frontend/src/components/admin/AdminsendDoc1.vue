<template>
  <p class="text-4xl font-bold mt-8 text-center">ตั้งค่าช่วงวันที่</p>
  <p class="text-5xl font-bold mt-8 text-center">แบบคำขอกู้ยืม</p>

  <div class="flex justify-center mt-12">
    <!-- <button class="bg-orange-500 text-white font-bold text-3xl py-4 px-6 rounded-lg shadow-lg hover:bg-orange-600 mr-4" @click="addSpecialRound">
      เพิ่มรอบเก็บตก
    </button> -->
    <button 
      class="bg-blue-500 text-white font-bold text-3xl py-4 px-6 rounded-lg shadow-lg hover:bg-blue-600"
      @click="openAddCard"
    >
      เพิ่มช่วงวัน
    </button>
  </div>

   <!-- Add Round Card -->
   <div v-if="showAddCard" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 text-center">
      <h2 class="text-xl font-bold mb-4">เพิ่มช่วงวัน</h2>
      <input 
    v-model="newStartDate" 
    type="date" 
    :min="currentDate" 
    :max="maxDate"
    placeholder="ใส่วันเริ่ม" 
    class="border border-gray-300 p-2 rounded w-full mb-4" 
  />
  <input 
    v-model="newEndDate" 
    type="date" 
    :min="newStartDate || currentDate" 
    :max="maxDate"
    placeholder="ใส่วันจบ" 
    class="border border-gray-300 p-2 rounded w-full mb-4" 
  />
      <div class="flex justify-around">
        <button @click="cancelAddStaff" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">ยกเลิก</button>
        <button @click="confirmAddRound" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">เพิ่ม</button>
      </div>
    </div>
  </div>

  <!-- Confirmation alert card -->
  <div v-if="isConfirming" class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <p class="text-xl font-bold mb-4 text-center">คุณแน่ใจหรือไม่ว่าต้องการ ลบ ช่วงวันนี้?</p>
      <div class="flex justify-center gap-6">
        <button 
          class="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-green-600"
          @click="removeCard"
        >
          ยืนยัน
        </button>
        <button 
          class="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-600"
          @click="cancelRemoveCard"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>


  <div class="flex flex-wrap justify-center gap-6 mt-8">
  <div
    class="bg-gray-100 p-6 rounded-lg shadow-xl flex flex-col items-center w-72"
    v-for="(card, index) in rounds"
    :key="card.roundid"
  >
    <p class="text-xl font-bold mb-4 text-center">รอบที่ {{ index+1 }} ระหว่างวันที่</p>
    <p class="text-2xl font-bold text-center">
      {{ new Date(card.startdate).getDate() }} - {{ new Date(card.enddate).getDate() }}
    </p>
    <p v-if="formatDate(card.startdate).month !== formatDate(card.enddate).month" class="text-2xl font-bold text-center">
      {{ formatDate(card.startdate).month }} - {{ formatDate(card.enddate).month }}
    </p>
    <p v-if="formatDate(card.startdate).month == formatDate(card.enddate).month" class="text-2xl font-bold text-center">
      {{ formatDate(card.startdate).month }}
    </p>
    <p class="text-2xl font-bold text-center">
      {{ formatDate(card.startdate).year }}
    </p>
    <div class="flex flex-col mt-4 space-y-2 w-full">
      <button
        class="bg-blue-500 text-white font-bold text-base py-2 rounded-lg shadow-lg hover:bg-blue-600"
        @click="selectDateRange(card.roundid)"
      >
        เลือกช่วงวัน
      </button>
      <button
        class="bg-red-500 text-white font-bold text-base py-2 rounded-lg shadow-lg hover:bg-red-600"
        @click="confirmRemoveCard(card.roundid)"
      >
        ลบช่วงวัน
      </button>
    </div>
  </div>
</div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useCookies } from "vue3-cookies";
import { useRouter } from 'vue-router'; 

const router = useRouter(); 
const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const showAddCard = ref(false);
const newStartDate = ref('');
const newEndDate = ref('');
const rounds = ref([]);

const today = new Date();
const max = new Date();
max.setMonth(max.getMonth() + 12);
max.setDate(max.getDate() - 5);

const currentDate = ref(today.toISOString().split('T')[0]);
const maxDate = ref(max.toISOString().split('T')[0]);


const openAddCard = () => {
  showAddCard.value = true;
};

const cancelAddStaff = () => {
  newStartDate.value = '';
  newEndDate.value = '';
  showAddCard.value = false;
};


const confirmAddRound = async () => {
    console.log(newStartDate.value, newEndDate.value);
    
    if (!newStartDate.value || !newEndDate.value) {
      await Swal.fire({
        icon: 'error',
        title: 'กรุณาเลือกวันที่ให้ครบถ้วน',
        showConfirmButton: true,
      });
      return;
    }

    if (newEndDate.value < newStartDate.value) {
      await Swal.fire({
        icon: 'error',
        title: 'วันจบต้องไม่ก่อนวันเริ่ม',
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_IP}/round/createRound`,
        { 
          startdate: newStartDate.value,
          enddate: newEndDate.value,
          type: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken.value}`,
          },
        }
      );

      if (response.status === 200) {
        newStartDate.value = '';
        newEndDate.value = '';
        showAddCard.value = false;
        getRound();
        await Swal.fire({
          icon: 'success',
          title: 'เพิ่มรอบสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error('Failed to add round.');
      }
    } catch (error) {
      console.error('Error adding round:', error);
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเพิ่มรอบได้',
        showConfirmButton: true,
      });
    }
  };


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

function selectDateRange(id:number) {
router.push({
  path: '/admin/editday', // Specify the path of the new page
  query: { 
    roundid: id, 
  },
});
}

async function confirmRemoveCard(id:number) {

  try {
  // แสดง SweetAlert เพื่อยืนยันการลบ
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "การลบนี้จะไม่สามารถกู้คืนได้!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "ยกเลิก",
    confirmButtonText: "ยืนยัน",
    reverseButtons: true,
  });

  // ถ้าผู้ใช้กดยืนยัน
  if (result.isConfirmed) {
    // ส่งคำขอ DELETE ไปยัง API
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_IP}/round/DeleteRound?roundid=${id}`,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    // ตรวจสอบสถานะการตอบกลับ
    if (response.status === 200) {
      // แสดง SweetAlert สำหรับการลบสำเร็จ
      Swal.fire({
        title: "ลบสำเร็จ!",
        text: "รอบที่เลือกถูกลบเรียบร้อยแล้ว",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });

      // อัปเดต UI หรือดึงข้อมูลใหม่หลังลบสำเร็จ
      getRound();
    } else {
      throw new Error("Failed to delete round.");
    }
  }
} catch (error) {
  // แสดง SweetAlert กรณีลบไม่สำเร็จ
  Swal.fire({
    title: "เกิดข้อผิดพลาด!",
    text: "ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่",
    icon: "error",
    confirmButtonText: "ตกลง",
  });
  console.error("Error deleting round:", error);
}
}


onMounted(() => {
getRound();
});
</script>

<style scoped>
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
