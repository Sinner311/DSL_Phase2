<script setup lang="ts">
import { ref , onMounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");

const showAddCard = ref(false);
const showChangeCard = ref(false);
const newShowList = ref<number | null>(null)
const newYear = ref('');
const newSemester = ref<number | null>(null);
const listOfRounds = ref([]);

const openAddCard = () => {
    showAddCard.value = true;
};
const cancelAddListOfRound = () => {
    newYear.value = '';
    newSemester.value = '';
    showAddCard.value = false;
};

const openChangeWebShowList = () => {
    showChangeCard.value = true;
};

const cancelChangeWebShowList = () => {
    showChangeCard.value = false;
    console.log(newShowList.value)
};

const validatePositiveNumber = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (Number(target.value) < 0) {
    target.value = ''; // ล้างค่าถ้าเป็นค่าลบ
    alert('Please enter a positive number!');
  }
};
const item = ref({
  option_1: {
    title: 'เพิ่มรอบภาคการศึกษาใหม่',
    image: '/assets/img/option_2.jpg',
    action: openAddCard ,
  },
  option_2: {
    title: 'เปลี่ยนแปลงการแสดงรอบ',
    image: '/assets/img/option_3.jpg', 
    action: openChangeWebShowList ,
  },
});

const confirmAddListOfRound = async () => {
  if (newYear.value && newSemester.value) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_IP}/round/createListOfRound`,
        { 
          year: newYear.value,
          semester: newSemester.value,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (response.status === 200) {
        newYear.value = '';
        newSemester.value = '';
        showAddCard.value = false;
        await Swal.fire({
        icon: "success",
        title: "เพิ่มรอบสำเร็จ",
        showConfirmButton: false,
        timer: 1500
      });
      getlistOfRound();
      } else {
        throw new Error('Failed to add staff.');
      }
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  }
};

const confirmEditWebShowList = async () => {
  console.log(newShowList.value)
  try {
    const res = await axios.put(`${import.meta.env.VITE_APP_IP}/round/changeWebShowList`,{
      show_list:newShowList.value
    })
    if (res.status !== 200) {
      throw Error(res.statusText)
    }
    // staffs.value.splice(selectedStaffIndex.value, 1);
    showChangeCard.value = false;
    await Swal.fire({
        icon: "success",
        title: "เปลี่ยนแปลงการแสดงรอบสำเร็จ",
        showConfirmButton: false,
        timer: 1500
      });
    return res.data;

    
  } catch (error) {
    console.error(error);
  }
}


async function getlistOfRound() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_IP}/round/getListOfRound`, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });

    if (response.status === 200) {
      listOfRounds.value = response.data.map((listOfRound: any, index: number) => ({
        ...listOfRound,
        serviceNumber: index + 1, // เพิ่ม serviceNumber อัตโนมัติ
      }));
    } else {
      throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
onMounted(getlistOfRound);
</script>

<template>
  <p class="text-center mt-20 mb-10 text-8xl font-bold">ตั้งค่าระบบ</p>
  <section class="py-10 mb-4">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Card Loop -->
        <div
          v-for="(option, index) in item"
          :key="index"
          @click="option.action" 
          class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
        >
          <!-- Image -->
          <img
            :src="option.image"
            alt="Option Image"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <!-- Dark Overlay -->
          <div class="absolute inset-0 bg-black opacity-70"></div>

          <!-- Text Content -->
          <div class="absolute inset-0 p-4 text-white flex flex-col items-center justify-center">
            <!-- Title -->
            <h3 class="text-3xl font-bold mb-2 text-center">{{ option.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>

      <!-- Add List of round Card -->
      <div v-if="showAddCard" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 class="text-xl font-bold mb-4">เพิ่มรอบภาคการศึกษาใหม่</h2>
        <input v-model.number="newYear" @input="validatePositiveNumber"  type="number" min="0" placeholder="ใส่ปีใหม่" class="border border-gray-300 p-2 rounded w-full mb-4" />
        <input
  v-model.number="newSemester"
  @input="validatePositiveNumber"
  type="number"
  min="0"
  placeholder="ใส่เทอมใหม่"
  class="border border-gray-300 p-2 rounded w-full mb-4"
/>

        <div class="flex justify-around">
          <button @click="cancelAddListOfRound" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">ยกเลิก</button>
          <button @click="confirmAddListOfRound" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">เพิ่มรอบ</button>
        </div>
      </div>
    </div>

      <!-- Edit Web Show List Card -->
      <div v-if="showChangeCard" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 text-center">
      <h2 class="text-xl font-bold mb-4">เปลี่ยนแปลงการแสดงรอบ</h2>
      
      <!-- Dropdown สำหรับเลือก year/semester -->
      <select
        v-model.number="newShowList"
        class="border border-gray-300 p-2 rounded w-full mb-4"
      >
        <option value="" disabled selected>เลือก Year/Semester</option>
        <option
          v-for="listOfRound in listOfRounds"
          :key="listOfRound.Listid"
          :value="listOfRound.Listid"
        >
          {{ listOfRound.year }}/{{ listOfRound.semester }}
        </option>
      </select>

      <!-- ปุ่มยกเลิก/ยืนยัน -->
      <div class="flex justify-around">
        <button
          @click="cancelChangeWebShowList"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ยกเลิก
        </button>
        <button
          @click="confirmEditWebShowList"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>

