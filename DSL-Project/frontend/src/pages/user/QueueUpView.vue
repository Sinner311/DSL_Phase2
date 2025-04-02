<script setup lang="ts">
import Navbar from "@/components/user/Navbar.vue";
import UserBackbutton from '../../components/user/UserBackbutton.vue';
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ClockIcon } from "lucide-vue-next";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";
const router = useRouter();
const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const studentinfo = ref({ id: "", name: "", studentid: "" });
const bookinginfo = ref([]);
const currentDate = ref("");
async function fetchCurrentDate() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_IP}/user/getcurrentdate`
    );
    if (response.status === 200 && response.data.dates) {
      currentDate.value = response.data.dates; // อัปเดตค่า currentDate
    }
  } catch (error) {
    console.error("Error fetching current date:", error);
  }
}
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

async function getMyqueue(studentid: number) {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_IP
      }/queue/getSpecificqueue?studentid=${studentid}`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    if (res.data === null) {
      throw Error("No queue");
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function mynotreview(studentid: number): Promise<boolean> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/history/mynotreview`
    );

    if (!res.data || res.data.length === 0) {
      return false; // No data found
    }

    // Check if any record has a matching studentid
    return res.data.some((record: any) => record.studentid === studentid);
  } catch (error: any) {
    console.error("Error fetching review:", error.message);
    return false; // Return false on error
  }
}



async function getuserinfo() {
  bookinginfo.value = [];
  const access_token_extract = parseJwt(accesstoken);
  const studentinfoData = await getMystudentID(access_token_extract.email); // ดึงข้อมูลของ student
  if (studentinfoData) {
    studentinfo.value = studentinfoData; // อัพเดตข้อมูล studentinfo
    const bookinginfoData = await getMybooking(studentinfoData.id);
    const myqueueinfoData = await getMyqueue(studentinfoData.id);
    if (myqueueinfoData) {
      router.push({ name: "usermyqueue", replace: true });
    }studentinfoData.id
    // Call the function and handle the result
const hasReview = await mynotreview(studentinfoData.id);
if (hasReview) {
  router.push({ name: "userstatisfaction", replace: true });
} else {
  console.warn("No pending review for this student.");
}

   
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

onMounted(() => {
  fetchCurrentDate();
  getuserinfo(); // เรียกใช้งานเมื่อคอมโพเนนต์ถูก mount
});

const hasAppointment = computed(
  () => Object.keys(bookinginfo.value).length > 0
);

async function joinQueue(id: number, type: number | null) {
  try {
    let queueType = type ?? 3;
    if (currentDate.value !=bookinginfo.value.date) {
       queueType = 3;
    }
    console.log(queueType,currentDate.value !=bookinginfo.value.date)
    // แสดง SweetAlert เพื่อยืนยันการลบ
    const result = await Swal.fire({
      title: "คุณจะรับคิวเลยหรือไม่?",
      // text: "",
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
      const response = await axios.post(
        `${import.meta.env.VITE_APP_IP}/queue/getqueueaddQueue`,
        {
          studentid: id,
          type: queueType,
        },
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
          title: "รับคิวสำเร็จ!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        // อัปเดต UI หรือดึงข้อมูลใหม่หลังลบสำเร็จ
        router.push({ name: "usermyqueue", replace: true });
      } else {
        throw new Error("Failed to get queue.");
      }
    }
  } catch (error) {
    console.error("Error deleting round:", error);
    Swal.fire({
      title: "เกิดข้อผิดพลาด!",
      text: error.response?.data?.message || "ไม่สามารถรับคิวได้ กรุณาลองใหม่",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
  }
}
</script>

<template>
  <Navbar />
  <UserBackbutton />
  <section class="flex justify-center p-4 m-8">
    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6">
      <!-- User Profile Section -->
      <div v-if="hasAppointment">
        <div
          class="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden"
        >
          <div
            class="w-full sm:w-1/2 p-4 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r"
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

          <div class="w-full sm:w-1/2 p-4">
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
      </div>

      <div v-else class="flex flex-col items-center">
        <div
          class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3"
        >
          <svg
            class="w-12 h-12 text-gray-400"
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
        <h2 class="text-lg font-medium">{{ studentinfo.name }}</h2>
        <p class="text-gray-500 text-sm">{{ studentinfo.studentid }}</p>
      </div>

      <div v-if="currentDate != bookinginfo.date">
        <!-- Queue Status Messages (Appointment != dateAppointment)-->
        <div class="w-full text-center">
          <p v-if="!hasAppointment" class="text-lg mb-2">คุณไม่มีรายการจองล่วงหน้า</p>
          <p v-else class="text-lg mb-2">ยังไม่ถึงวันนัดหมายของคุณ</p>
          <p class="text-red-500">
            คุณสามารถกดรับคิวเพื่อติดต่อสอบถามได้เท่านั้น
          </p>
        </div>
      </div>

      <!-- Queue Status Messages (Appointment == dateAppointment)-->
      <div v-else class="w-full text-center text-blue-900 font-bold">
        <p class="text-lg mb-2">ถึงวันนัดหมายของคุณแล้ว</p>
        <p class="text-lg mb-2">โปรดรับคิวเพื่อส่งเอกสาร</p>
      </div>

      <!-- Queue Button -->
      <button
        class="w-full bg-gradient-to-r from-indigo-600 to-indigo-900 text-white py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-indigo-800"
        @click="joinQueue(studentinfo.id, bookinginfo.type)"
      >
        รับคิว
      </button>

      <!-- Date Display -->
      <div class="mt-4 text-gray-500 text-center">
        วันนี้
        {{ new Date(currentDate).getDate() }}
        {{ formatDate(currentDate).month }}
        {{ formatDate(currentDate).year }}
      </div>
    </div>
  </section>

  <div class="image-container">
    <img
      src="/assets/img/people.jpg"
      alt="Contract Reservation"
      class="image-bottom w-full h-full object-cover"
    />
  </div>
</template>
