<script setup lang="ts">
import Navbar from "@/components/user/Navbar.vue";
import UserBackbutton from "@/components/user/UserBackbutton.vue";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ClockIcon } from "lucide-vue-next";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const studentinfo = ref({ id: "", name: "", studentid: "" });
const bookinginfo = ref([]);

// Define user data as a reactive reference
function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

async function getMystudentID(email: string) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/user/getSpecificuser?email=${email}`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    if (res.data === null) {
      throw Error("No Student id");
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getMybooking(id: number) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/booking/getmyBooking?studentid=${id}`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getuserinfo() {
  bookinginfo.value = [];
  const access_token_extract = parseJwt(accesstoken);
  const studentinfoData = await getMystudentID(access_token_extract.email); // ดึงข้อมูลของ student
  if (studentinfoData) {
    studentinfo.value = studentinfoData; // อัพเดตข้อมูล studentinfo
    const bookinginfoData = await getMybooking(studentinfoData.id);
    if (bookinginfoData) {
      console.log("Booking Info:", bookinginfoData); // ตรวจสอบข้อมูลที่ได้
      bookinginfo.value = bookinginfoData;
    } else {
      console.error("No booking data found.");
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

function formatTime(timeString: any, timeZone = "Africa/Abidjan") {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(new Date(timeString));
}

async function confirmRemoveCard(id: number) {
  try {
    // แสดง SweetAlert เพื่อยืนยันการลบ
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
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
        `${
          import.meta.env.VITE_APP_IP
        }/booking/DeleteBooking?historyid=${id}`,
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
          title: "ยกเลิกการจองสำเร็จ!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        // อัปเดต UI หรือดึงข้อมูลใหม่หลังลบสำเร็จ
        getuserinfo();
      } else {
        throw new Error("Failed to delete round.");
      }
    }
  } catch (error) {
    // แสดง SweetAlert กรณีลบไม่สำเร็จ
    Swal.fire({
      title: "เกิดข้อผิดพลาด!",
      text: "ไม่สามารถยกเลิกการจองได้ กรุณาลองใหม่",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
    console.error("Error deleting round:", error);
  }
}

onMounted(() => {
  getuserinfo(); // เรียกใช้งานเมื่อคอมโพเนนต์ถูก mount
});
</script>

<template>
  <Navbar />
  <UserBackbutton />
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative"
    style="
      background-image: url('/assets/img/background.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <!-- Overlay to darken background -->
    <div class="absolute inset-0 bg-black opacity-40"></div>

    <div
      class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden relative z-10"
    >
      <!-- Header -->
      <div class="bg-blue-900 text-white p-4">
        <h2 class="text-xl font-semibold">รายการที่จองไว้</h2>
        <p class="text-sm mt-2">
          เมื่อถึงวันนัดหมายกรุณาไปแสกน QR CODE หน้าห้อง กยศ. เพื่อรับคิว
        </p>
      </div>

      <!-- Main Content -->
      <div class="p-4">
        <!-- ถ้ามีข้อมูลการจอง -->
        <div
          v-if="Object.keys(bookinginfo).length > 0"
          class="flex border border-gray-200 rounded-lg overflow-hidden"
        >
          <!-- Left Section - User Info -->
          <div
            class="w-1/2 p-4 flex flex-col items-center justify-center border-r"
          >
            <div
              class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2"
            >
              <svg
                class="w-8 h-8 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-center">{{ studentinfo.name }}</h3>
            <p class="text-sm text-gray-600">
              รหัสนักศึกษา {{ studentinfo.studentid }}
            </p>
          </div>

          <!-- Right Section - Appointment Info -->
          <div class="w-1/2 p-4">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">เรื่อง</h3>
            <p v-if="bookinginfo.type == 1" class="text-blue-900 mb-4">
              แบบคำขอกู้ยืม
            </p>
            <p v-if="bookinginfo.type == 2" class="text-blue-900 mb-4">
              สัญญากู้ยืม และ แบบเบิกเงินกู้ยืม
            </p>

            <div class="text-red-500 font-semibold mb-2">วันที่นัดหมาย</div>
            <p class="mb-2">
              {{ new Date(bookinginfo.date).getDate() }}
              {{ formatDate(bookinginfo.date).month }}
              {{ formatDate(bookinginfo.date).year }}
            </p>

            <div class="flex items-center text-gray-600">
              <ClockIcon class="w-4 h-4 me-2" />
              <span v-if="bookinginfo.starttime && bookinginfo.endtime">
                {{ formatTime(bookinginfo.starttime) }} -
                {{ formatTime(bookinginfo.endtime) }}
              </span>
              <span v-else>ข้อมูลเวลาไม่พร้อมใช้งาน</span>
            </div>
          </div>
        </div>

        <!-- ถ้าไม่มีข้อมูลการจอง -->
        <div v-else class="text-center text-gray-600 py-10">
          <p class="text-xl font-semibold">ไม่มีรายการจอง</p>
          <p class="text-sm mt-2">กรุณาจองคิวเพื่อแสดงรายการนัดหมาย</p>
        </div>

        <!-- Action Buttons -->
        <div v-if="Object.keys(bookinginfo).length > 0" class="flex gap-4 mt-6">
          <!-- <button class="flex-1 bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors">
            เปลี่ยนแปลงการจอง
          </button> -->
          <button
            class="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
            @click="confirmRemoveCard(bookinginfo.historyid)"
          >
            ยกเลิกการจอง
          </button>
        </div>

        <!-- Quick Tips -->
        <div class="mt-6 flex items-start space-x-3 bg-cyan-50 p-4 rounded-lg">
          <div class="flex-shrink-0">
            <div class="bg-cyan-300 rounded-full p-2">
              <span class="text-xs font-bold">QUICK TIPS</span>
            </div>
          </div>
          <p class="text-sm">
            หากคุณต้องการติดต่อสอบถามก่อนถึงวันนัดหมาย สามารถ
            จองคิวหน้าห้อง กยศ. ได้ โดยไม่ต้องยกเลิกการจอง
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
