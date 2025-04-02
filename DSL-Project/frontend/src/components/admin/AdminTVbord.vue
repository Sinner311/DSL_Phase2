<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";

const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const QueueWait = ref(0);
const todaydateinfo = ref([]);
const lastCalledChannel = ref([]);
const lastCalledQueue = ref([]);
const calledQueueByChannel = ref([[], [], [], []]);
const channel1QueueId = ref("");
const channel2QueueId = ref("");
const channel3QueueId = ref("");
let intervalId: NodeJS.Timeout | null = null; // Store interval ID\

async function fetchDashboardData() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_IP}/queue/getDashboard`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      }
    );

    if (response.data.success) {
      // Match frontend variable names with backend response
      QueueWait.value = response.data.data.QueueWait; // Fix name
      // Fix name
    } else {
      console.error("Failed to fetch dashboard data:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
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

async function getAllCallQueue() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/queue/getAllCallQueue`
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

async function speakThai(message: string) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "th-TH"; // ตั้งค่าเป็นภาษาไทยเปลี่ยนเสียงไม่ได้
    utterance.rate = 0.4;
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech Synthesis API ไม่รองรับในเบราว์เซอร์นี้");
  }
}

async function getCallQueue(queueid: number, channel: number) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_APP_IP}/queue/getEditQueue`,
      {
        queueid: queueid,
        channel: channel,
        status: "CALLED",
      },

      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (res.status === 200) {
    } else {
      throw new Error("Failed to Call.");
    }
  } catch (error) {
    console.error("Error to Call:", error);
  }
}

function parseQueueNumber(queueNo: string): string {
  // ใช้ regex แยกตัวอักษร (A, B, C) และตัวเลข
  const match = queueNo.match(/^([A-C])(\d+)$/);
  if (!match) return queueNo; // ถ้าไม่ตรงรูปแบบเดิม ให้คืนค่าเดิม

  const letterMap: Record<string, string> = {
    A: "เอ",
    B: "บี",
    C: "ซี",
  };

  const letter = match[1]; // A, B, C
  const number = match[2]; // ตัวเลข

  return `${letterMap[letter]} ${number}`; // แปลงเป็น เอ 1, บี 11, ซี 45
}



async function getuserinfo() {
  const todaydateinfoData = await getTodaydate();
  todaydateinfo.value = todaydateinfoData;
  const allqueueinfoData = await getAllqueue();
  const allcallqueueinfoData = await getAllCallQueue();
  console.log(allcallqueueinfoData, allcallqueueinfoData.channel);
  if (allcallqueueinfoData) {
    // แปลงคิวเป็นภาษาไทย
    const queueThai = parseQueueNumber(allcallqueueinfoData.queue_no);
    const channel = allcallqueueinfoData.channel;

    console.log(queueThai, channel);

    await speakThai(`ขอเชิญหมายเลข ${queueThai} ที่ช่องบริการ ${channel}`);



    
    await getCallQueue(
      allcallqueueinfoData.queueid,
      allcallqueueinfoData.channel
    );
  }

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
    calledQueueByChannel.value[1] && calledQueueByChannel.value[1].length > 0
      ? calledQueueByChannel.value[1][0].queue_no
      : "-";
  channel2QueueId.value =
    calledQueueByChannel.value[2] && calledQueueByChannel.value[2].length > 0
      ? calledQueueByChannel.value[2][0].queue_no
      : "-";
  channel3QueueId.value =
    calledQueueByChannel.value[3] && calledQueueByChannel.value[3].length > 0
      ? calledQueueByChannel.value[3][0].queue_no
      : "-";
}

onMounted(() => {
  fetchDashboardData();
  getuserinfo(); // เรียกใช้งานเมื่อคอมโพเนนต์ถูก mount
  intervalId = setInterval(() => {
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
  <div class="h-[510px] flex flex-col items-center py-5 w-full">
    <div class="flex space-x-6 w-full justify-center">
      <!-- รูปภาพด้านซ้าย (ไม่มีกรอบ) -->
      <div class="w-[500px] h-[560px] flex items-center">
        <img src="/assets/img/logo.jpg" alt="Logo" class="w-full h-auto object-cover rounded-xl shadow-md">
      </div>

      <!-- ตารางช่องบริการด้านขวา -->
      <div class="bg-white rounded-xl shadow-md w-[900px] h-[560px] border-2 border-black">
        <!-- Header ตาราง -->
        <div class="flex justify-around items-center text-white p-6 rounded-t-xl">
          <p class="font-bold text-5xl text-black">ช่องบริการ</p>
          <p class="font-bold text-5xl text-black">หมายเลขคิว</p>
        </div>
        <!-- เนื้อหาในตาราง -->
        <div class="divide-y divide-gray-600">
          <!-- แถว 1 -->
          <div class="flex items-center p-6">
            <p class="flex-1 text-center text-8xl font-bold text-black font-mono tabular-nums">1</p>
            <p class="flex-1 text-center text-8xl font-bold text-blue-900 font-mono tabular-nums">
              {{ channel1QueueId === null ? " " : channel1QueueId }}
            </p>
          </div>
          <!-- แถว 2 -->
          <div class="flex items-center p-6">
            <p class="flex-1 text-center text-8xl font-bold text-black font-mono tabular-nums">2</p>
            <p class="flex-1 text-center text-8xl font-bold text-blue-900 font-mono tabular-nums">
              {{ channel2QueueId === null ? " " : channel2QueueId }}
            </p>
          </div>
          <!-- แถว 3 -->
          <div class="flex items-center p-6">
            <p class="flex-1 text-center text-8xl font-bold text-black font-mono tabular-nums">3</p>
            <p class="flex-1 text-center text-8xl font-bold text-blue-900 font-mono tabular-nums">
              {{ channel3QueueId === null ? " " : channel3QueueId }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
