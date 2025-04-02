<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");

const staffs = ref([]);
const showAddCard = ref(false);
const showChangeCard = ref(false);
const showDeleteCard = ref(false);
const newEmail = ref('');
const newChannel = ref<number | null>(null);
const newEditChannel = ref<number | null>(null);
const selectedStaffIndex = ref(null);

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const validatePositiveNumber = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (Number(target.value) < 0) {
    target.value = ''; // ล้างค่าถ้าเป็นค่าลบ
    newChannel.value = null; // หรือกำหนดค่า `null`
    alert('Please enter a positive number!');
  }
};

const openAddCard = () => {
    showAddCard.value = true;
};

const cancelAddStaff = () => {
    newEmail.value = '';
    newChannel.value = '';
    showAddCard.value = false;
};

const openChangeServiceCard = (index) => {
    selectedStaffIndex.value = index;
    showChangeCard.value = true;
};

const cancelChangeService = () => {
    showChangeCard.value = false;
};

const openDeleteCard = (index) => {
    selectedStaffIndex.value = index;
    showDeleteCard.value = true;
};

const cancelDelete = () => {
    showDeleteCard.value = false;
};
// ฟังก์ชันดึงข้อมูล Staff จาก backend
async function getStaff() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_IP}/user/getAllstaff`, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });

    if (response.status === 200) {
      staffs.value = response.data.map((staff: any, index: number) => ({
        ...staff,
        serviceNumber: index + 1, // เพิ่ม serviceNumber อัตโนมัติ
      }));
    } else {
      throw new Error('Failed to fetch staff data.');
    }
  } catch (error) {
    console.error('Error fetching staff data:', error);
  }
}


const myemail = ref('');

async function getuserinfo() {
  const accesstoken = cookies.get("accesstoken");
  if (accesstoken) {
    const access_token_extract = parseJwt(accesstoken);
    myemail.value = access_token_extract.email; // กำหนดค่าให้ myemail
    console.log(myemail.value);
  }
}


// เพิ่ม staff
const confirmAddStaff = async () => {
  if (newEmail.value && newChannel.value) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_IP}/user/addAdmin`,
        { email: newEmail.value ,
          channel: newChannel.value
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (response.status === 200) {
        staffs.value.push({
          email: newEmail.value,
          channel: newChannel.value,
        });
        newEmail.value = '';
        newChannel.value = '';
        showAddCard.value = false;
        await Swal.fire({
        icon: "success",
        title: "เพิ่มเจ้าหน้าที่สำเร็จ",
        showConfirmButton: false,
        timer: 1500
      });
      } else {
        throw new Error('Failed to add staff.');
      }
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  }
};

// ลบ staff
const confirmDeleteStaff = async () => {
  console.log(staffs.value[selectedStaffIndex.value].email);
  try {
    const res = await axios.put(`${import.meta.env.VITE_APP_IP}/user/getusereditSpecificuser`,{
      email:staffs.value[selectedStaffIndex.value].email,
      data:{
        channel:null,
        role:"STUDENT"
      }
    })
    if (res.status !== 200) {
      throw Error(res.statusText)
    }
    staffs.value.splice(selectedStaffIndex.value, 1);
    showDeleteCard.value = false;
    await Swal.fire({
        icon: "success",
        title: "แก้ไขเจ้าหน้าที่สำเร็จ",
        showConfirmButton: false,
        timer: 1500
      });

    return res.data;
    
  } catch (error) {
    console.error(error);
  }
}

const confirmEditStaff = async () => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_APP_IP}/user/getusereditSpecificuser`,{
      email:staffs.value[selectedStaffIndex.value].email,
      data:{
        channel:newEditChannel.value
      }
    })
    if (res.status !== 200) {
      throw Error(res.statusText)
    }
    // staffs.value.splice(selectedStaffIndex.value, 1);
    showChangeCard.value = false;
    await Swal.fire({
        icon: "success",
        title: "เปลี่ยนช่องบริการสำเร็จ",
        showConfirmButton: false,
        timer: 1500
      });
      getStaff();
    return res.data;

    
  } catch (error) {
    console.error(error);
  }
}

// เรียกข้อมูลเมื่อคอมโพเนนต์โหลด
onMounted(() => {
  getuserinfo()
  getStaff();
});
</script>

<template>
  <div class="p-6 text-center">
    <div class="mb-12">
      <button @click="openAddCard" class="bg-blue-500 text-white px-8 py-4 rounded text-xl hover:bg-blue-700">
        เพิ่มเจ้าหน้าที่
      </button>
    </div>

    <!-- Add Staff Card -->
    <div v-if="showAddCard" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 class="text-xl font-bold mb-4">เพิ่มเจ้าหน้าที่</h2>
        <input v-model="newEmail" type="email" placeholder="ใส่อีเมล" class="border border-gray-300 p-2 rounded w-full mb-4" />
        <input
  v-model.number="newChannel"
  @input="validatePositiveNumber"
  type="number"
  placeholder="ใส่เลขช่องบริการ"
  class="border border-gray-300 p-2 rounded w-full mb-4"
/>

        <div class="flex justify-around">
          <button @click="cancelAddStaff" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">ยกเลิก</button>
          <button @click="confirmAddStaff" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">เพิ่ม</button>
        </div>
      </div>
    </div>

    <!-- Staff List -->
    <div class="mt-8">
      <h2 class="text-3xl font-bold mb-4 text-red-500">รายชื่อเจ้าหน้าที่</h2>
      <div v-for="(staff, index) in staffs" :key="staff.id" class="inline-block m-4">
        <div class="border border-gray-300 rounded-lg shadow-lg p-6 w-70 text-center">
          <p class="text-lg font-medium">{{ staff.email }}</p>
          <p class="mt-2">ช่องบริการที่ : <strong>{{ staff.channel }}</strong></p>
          <div class="mt-4 flex justify-center space-x-4">
            <button @click="openDeleteCard(index)" v-if="staff.email!==myemail" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">ลบ</button>
            <button @click="openChangeServiceCard(index)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">เปลี่ยนช่องบริการ</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete -->
    <div v-if="showDeleteCard" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 class="text-xl font-bold mb-4">แน่ใจที่จะลบไหม?</h2>
        <div class="flex justify-around mt-4">
          <button @click="cancelDelete" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">ไม่</button>
          <button @click="confirmDeleteStaff" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">ใช่</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showChangeCard" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
  <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 text-center">
    <h2 class="text-xl font-bold mb-4">เปลี่ยนช่องบริการ</h2>
    <input
  v-model.number="newEditChannel"
  @input="validatePositiveNumber"
  type="number"
  placeholder="ใส่เลขช่องบริการใหม่"
  class="border border-gray-300 p-2 rounded w-full mb-4"
/>
    <div class="flex justify-around">
      <button @click="cancelChangeService" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
        ยกเลิก
      </button>
      <button @click="confirmEditStaff" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        ยืนยัน
      </button>
    </div>
  </div>
</div>
</template>
