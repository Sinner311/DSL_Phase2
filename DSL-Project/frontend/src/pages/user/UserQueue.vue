<script setup lang="ts">
import Navbar from "@/components/user/Navbar.vue";
import UserBackbutton from '../../components/user/UserBackbutton.vue';
import { ref, onMounted, computed, onUnmounted } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ClockIcon } from "lucide-vue-next";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";
const router = useRouter();
const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const studentinfo = ref({ id: "", name: "", studentid: "" });
const myqueueinfo = ref([]);
const todaydateinfo = ref([]);
const allqueueinfo = ref([]);
const lastCalledQueue = ref([]);
const calledQueueByChannel = ref([[], [], [], []]);
const channel1QueueId = ref("");
const channel2QueueId = ref("");
const channel3QueueId = ref("");
let intervalId: NodeJS.Timeout | null = null; // Store interval ID

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


const webSettings = ref(null);
const isSystemActive = ref(null);
const buttonText = ref("ระบบปิดพักอยู่");

async function getwebSettings() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/round/getwebSettings`
    );

    if (res.status === 200 && res.data) {
      webSettings.value = res.data;
      buttonText.value = webSettings.value.web_break_text || "ระบบปิดพักอยู่";
      isSystemActive.value = webSettings.value.web_status === "normal";
    } else {
      throw new Error("Failed to fetch web settings.");
    }
  } catch (error) {
    console.error("Error fetching web settings:", error);
  }
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

async function getTodaydate() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/round/getTodayDate`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    if (res.data === null) {
      throw Error;
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllqueue() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/queue/getAllQueue`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    if (res.data === null) {
      throw Error;
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getuserinfo() {
  const access_token_extract = parseJwt(accesstoken);
  const studentinfoData = await getMystudentID(access_token_extract.email); // ดึงข้อมูลของ student
  if (studentinfoData) {
    studentinfo.value = studentinfoData; // อัพเดตข้อมูล studentinfo
    const myqueueinfoData = await getMyqueue(studentinfoData.id);
    if (myqueueinfoData) {
      if (myqueueinfoData.status == "FINISH") {
        router.push({ name: "userqueue", replace: true });
      }
      // console.log("myqueue:", myqueueinfoData.status); // ตรวจสอบข้อมูลที่ได้
      myqueueinfo.value = myqueueinfoData;
      const todaydateinfoData = await getTodaydate();
      todaydateinfo.value = todaydateinfoData;
      const allqueueinfoData = await getAllqueue();
      lastCalledQueue.value = allqueueinfoData
        .filter((item) => item.status === "CALL" || item.status === "CALLED")
        .sort((a, b) => b.queueid - a.queueid)[0];

      for (let i = 1; i <= 3; i++) {
        calledQueueByChannel.value[i] = allqueueinfoData.filter(
          (item) =>
            item.channel === i &&
            (item.status === "CALL" || item.status === "CALLED")
        );
      }

      channel1QueueId.value =
        calledQueueByChannel.value[1] &&
        calledQueueByChannel.value[1].length > 0
          ? calledQueueByChannel.value[1][0].queue_no
          : "-";
      channel2QueueId.value =
        calledQueueByChannel.value[2] &&
        calledQueueByChannel.value[2].length > 0
          ? calledQueueByChannel.value[2][0].queue_no
          : "-";
      channel3QueueId.value =
        calledQueueByChannel.value[3] &&
        calledQueueByChannel.value[3].length > 0
          ? calledQueueByChannel.value[3][0].queue_no
          : "-";
    } else {
      console.error("myqueue data found.");
      router.push({ name: "userqueue", replace: true });
    }
  }
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
  getuserinfo(); // เรียกใช้งานเมื่อคอมโพเนนต์ถูก mount
  getwebSettings()
  intervalId = setInterval(() => {
    getwebSettings()
    getuserinfo();
  }, 2000); // Set interval to 2 seconds
});
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>

<template>
  <Navbar />
  <UserBackbutton />
  <div class="flex justify-center items-center min-h-screen bg-gray-200">
    <div class="w-full max-w-md bg-white shadow-lg">
      <div class="p-6">
        <!-- Header Section -->
        <div
          class="flex justify-between items-start mb-6 p-4 bg-blue-900 text-white rounded-lg"
        >
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
              <p class="text-sm">{{ studentinfo.name }}</p>
              <p class="text-xs">รหัสนักศึกษา {{ studentinfo.studentid }}</p>
            </div>
          </div>
          <div class="flex items-center text-sm">
            <div>
              <p class="text-sm">
                เรื่อง
                {{
                  myqueueinfo.type === 1
                    ? "แบบคำขอกู้ยืม"
                    : myqueueinfo.type === 2
                    ? "สัญญากู้ยืม และ แบบเบิกเงินกู้ยืม"
                    : "ติดต่อสอบถาม"
                }}
              </p>
              <span
                v-if="todaydateinfo.starttime && todaydateinfo.endtime"
                class="text-xs"
              >
                {{ formatTime(todaydateinfo.starttime) }} -
                {{ formatTime(todaydateinfo.endtime) }}
              </span>
              <span v-else class="text-xs">ข้อมูลเวลาไม่พร้อมใช้งาน</span>
            </div>
          </div>
        </div>

        <!-- Queue Status Section -->
        <div class="text-center mb-6">
          <h2 v-if="isSystemActive" class="text-green-500 text-xl font-semibold mb-4">
            ระบบเปิดเรียกคิวปกติ
          </h2>
          <h2 v-if="!isSystemActive" class="text-red-500 text-xl font-semibold mb-4">
            {{ buttonText }}
          </h2>
          <p class="text-gray-600">
            คิวหมายเลข
          </p>
          <div class="text-6xl font-bold mb-2">
            {{ myqueueinfo.queue_no }}
          </div>
        </div>

        <!-- Service Points Section -->
        <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div
            class="col-span-1 text-left font-semibold text-lg flex flex-col items-center"
          >
            <div>ช่องบริการ</div>
            <div>
              <h1 class="col-span-1 text-center text-3xl">
                1
                <hr />
              </h1>
              <h1 class="col-span-1 text-center text-3xl">
                2
                <hr />
              </h1>
              <h1 class="col-span-1 text-center text-3xl">
                3
                <hr />
              </h1>
            </div>
          </div>
          <div
            class="col-span-1 text-left font-semibold text-lg flex flex-col items-center"
          >
            <div>หมายเลขคิว</div>

            <div>
              <h1
                class="col-span-1 text-blue-600 font-semibold text-center text-3xl"
              >
                {{ channel1QueueId === null ? " " : channel1QueueId }}
                <hr />
              </h1>
              <h1
                class="col-span-1 text-blue-600 font-semibold text-center text-3xl"
              >
                {{ channel2QueueId === null ? " " : channel2QueueId }}
                <hr />
              </h1>
              <h1
                class="col-span-1 text-blue-600 font-semibold text-center text-3xl"
              >
                {{ channel3QueueId === null ? " " : channel3QueueId }}
                <hr />
              </h1>
            </div>
          </div>
        </div>
        <!-- Footer Warning -->
        <div class="mt-6 bg-red-50 p-4 rounded-lg">
          <p class="text-red-600 text-sm text-center">
            หลังใช้บริการเสร็จกรุณาทำแบบประเมิน
            หากไม่ทำจะไม่สามารถจองคิวครั้งต่อไปได้
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
