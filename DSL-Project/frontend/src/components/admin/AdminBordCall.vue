<template>
  <div
    class="queue-display border-2 border-black flex justify-around items-center rounded-xl m-9 p-5 relative h-[500px]"
  >
    <div class="service-section text-center">
      <p class="font-bold text-2xl">ช่องบริการที่</p>
      <p class="text-9xl">{{ myuserinfo.channel }}</p>
    </div>
    <div class="queue-section text-center flex flex-col justify-center">
      <div
        v-if="currentItemInService"
        class="w-64 border rounded-lg shadow-lg text-center p-6 flex flex-col justify-between h-[320px] relative"
      >
        <div class="flex flex-col items-center mt-4">
          <p class="text-gray-600">
            คิวหมายเลข
          </p>
          <div class="text-7xl font-bold">
            {{ currentItemInService.queue_no }}
          </div>
          <div class="custom-topic mt-4">
            {{
              currentItemInService.type === 1
                ? "แบบคำขอกู้ยืม"
                : currentItemInService.type === 2
                ? "สัญญากู้ยืม และ แบบเบิกเงินกู้ยืม"
                : "ติดต่อสอบถาม"
            }}
          </div>
          <div class="text-2xl font-bold mt-4">
            {{ currentItemInService.studentid }}
          </div>
        </div>
      </div>
      <div
        v-if="currentItemInService"
        class="absolute right-60 flex flex-col space-y-4"
      >
        <button
          @click="openConfirmModal('skip', currentItemInService)"
          class="bg-red-500 text-white px-10 py-7 rounded-lg"
        >
          ข้ามคิว
        </button>
        <button
          @click="recallQueue(currentItemInService)"
          class="bg-blue-500 text-white px-10 py-7 rounded-lg"
        >
          เรียกซ้ำ
        </button>
        <button
          @click="completeService"
          class="bg-green-500 text-white px-10 py-7 rounded-lg"
        >
          เสร็จสิ้น
        </button>
      </div>
    </div>
    <div class="queue-section text-center">
      <p v-if="!currentItemInService" class="text-6xl text-green-500">ว่าง</p>
    </div>
  </div>

  <div class="flex flex-wrap justify-center gap-6 mt-10">
    <div
      v-for="(item, index) in filteredTimeSlots"
      :key="index"
      class="w-64 border rounded-lg shadow-lg text-center p-6 flex flex-col justify-between h-[320px]"
    >
      <div class="flex flex-col items-center">
        <p class="text-gray-600">
            คิวหมายเลข
          </p>
        <div class="text-4xl font-bold">{{ item.queue_no }}</div>
        <div class="custom-topic mt-4">
          {{
            item.type === 1
              ? "แบบคำขอกู้ยืม"
              : item.type === 2
              ? "สัญญากู้ยืม และ แบบเบิกเงินกู้ยืม"
              : "ติดต่อสอบถาม"
          }}
        </div>
        <div class="text-xl font-bold mt-4">
          {{ item.studentid }}
        </div>
      </div>
      <div class="mt-6 flex justify-center space-x-4">
        <button
          @click="openConfirmModal('skip', item)"
          class="bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          ข้ามคิว
        </button>
        <button
          @click="openConfirmModal('call', item)"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          เรียกคิว
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <p class="text-xl font-bold text-center">
        {{ modalMessage }}
      </p>
      <div class="flex justify-around mt-4">
        <button
          @click="closeModal"
          class="bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          ยกเลิก
        </button>
        <button
          @click="confirmAction"
          class="bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { defineComponent, ref, onMounted, computed, onUnmounted } from "vue";
import { useCookies } from "vue3-cookies";
import { useRoute } from "vue-router";

const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const myuserinfo = ref({});
const isModalOpen = ref<boolean>(false);
const modalMessage = ref<string>("");
const actionType = ref<string>("");
const currentItem = ref<TimeSlot | null>(null);
const currentItemInService = ref<TimeSlot | null>(null);
let intervalId: NodeJS.Timeout | null = null; // Store interval ID

interface TimeSlot {
  queueid: number;
  type: string;
  user: string;
  studentid: string;
  status: string;
  channel: number;
}
const timeSlots = ref<TimeSlot[]>([]);

const filteredTimeSlots = computed(() => {
  return timeSlots.value.filter((item) => item.status === "WAIT");
});

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

async function getQueue() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_IP}/queue/getAllStaffQueue`,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (response.status === 200) {
      const dateData = response.data;

      timeSlots.value = await Promise.all(
        dateData.map(async (queue) => {
          console.log(queue.users.studentid);
          return {
            queueid: queue.queueid,
            queue_no: queue.queue_no,
            type: queue.type,
            user: queue.studentid,
            studentid: queue.users.studentid,
            status: queue.status,
            channel: queue.channel,
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

async function getMyQueueInService(channel: number): Promise<TimeSlot[]> {
  return timeSlots.value.filter((item) => item.channel === channel)[0];
}

const openConfirmModal = async (type: string, item: TimeSlot) => {
  if (type === "call" && currentItemInService.value) {
    await Swal.fire({
    icon: 'warning',
    title: `ไม่สามารถเรียกคิวใหม่ได้`,
    text: `เนื่องจากมีคิว ${currentItemInService.value.queue_no} อยู่ในช่องบริการ กรุณากด "เสร็จสิ้น" ก่อน`,
    timer: 4000, // Automatically close the alert after 1.5 seconds
    showConfirmButton: false, // Remove the confirm button to auto-close
    position: 'top-start', // Position the alert in the top-left corner
    toast: true, // Optional: makes the alert a toast notification
    timerProgressBar: true, // Optional: shows a progress bar while the timer counts down
  });
    return;
  }

  actionType.value = type;
  currentItem.value = item;
  modalMessage.value =
    type === "call"
      ? `คุณแน่ใจที่จะ เรียก คิว ${item.queue_no}`
      : `คุณแน่ใจที่จะ ข้าม คิว ${item.queue_no}`;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const confirmAction = () => {
  if (currentItem.value) {
    if (actionType.value === "call") {
      // currentItemInService.value = currentItem.value;
      //เรียกคิว
      getCallQueue(currentItem.value.queueid);
    } else if (actionType.value === "skip") {
      getSkipQueue(currentItem.value.queueid)
    }
  }
  closeModal();
};

async function getCallQueue(queueid: number) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_APP_IP}/queue/getEditQueue`,
      {
        queueid: queueid,
        channel: myuserinfo.value.channel,
        status: "CALL",
      },
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (res.status === 200) {
      await Swal.fire({
    icon: 'success',
    title: `เรียกคิวแล้ว`,
    timer: 3000, // Automatically close the alert after 1.5 seconds
    showConfirmButton: false, // Remove the confirm button to auto-close
    position: 'top-start', // Position the alert in the top-left corner
    toast: true, // Optional: makes the alert a toast notification
    timerProgressBar: true, // Optional: shows a progress bar while the timer counts down
  });

    } else {
      throw new Error("Failed to Call.");
    }
  } catch (error) {
    console.error("Error to Call:", error);
  }
}

async function getSkipQueue(queueid: number) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_APP_IP}/queue/getEditQueue`,
      {
        queueid: queueid,
        channel: null,
        status: "SKIP",
      },
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (res.status === 200) {
      await Swal.fire({
    icon: 'success',
    title: `ข้ามคิวแล้ว`,
    timer: 3000, // Automatically close the alert after 1.5 seconds
    showConfirmButton: false, // Remove the confirm button to auto-close
    position: 'top-start', // Position the alert in the top-left corner
    toast: true, // Optional: makes the alert a toast notification
    timerProgressBar: true, // Optional: shows a progress bar while the timer counts down
  });

    } else {
      throw new Error("Failed to Call.");
    }
  } catch (error) {
    console.error("Error to Call:", error);
  }
}

async function getFinishQueue(queuedata: any) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_IP}/queue/getFinishQueue`,
      {
        queueid: queuedata.queueid,
        channel: myuserinfo.value.channel,
        studentid: queuedata.user,
        type: queuedata.type,
        status: "FINISH",
      },
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    if (res.status === 200) {
      await Swal.fire({
    icon: 'success',
    title: `เสร็จสิ้นคิวแล้ว`,
    timer: 3000, // Automatically close the alert after 1.5 seconds
    showConfirmButton: false, // Remove the confirm button to auto-close
    position: 'top-start', // Position the alert in the top-left corner
    toast: true, // Optional: makes the alert a toast notification
    timerProgressBar: true, // Optional: shows a progress bar while the timer counts down
  });

    } else {
      throw new Error("Failed to Call.");
    }
  } catch (error) {
    console.error("Error to Call:", error);
  }
}

async function getqueueinfo() {
  const access_token_extract = parseJwt(accesstoken);
  const studentinfoData = await getMystudentID(access_token_extract.email); // ดึงข้อมูลของ student
  if (studentinfoData) {
    myuserinfo.value = studentinfoData;

    await getQueue();
    currentItemInService.value = await getMyQueueInService(
      myuserinfo.value.channel
    );


  }
}

const recallQueue = (item: TimeSlot) => {
  getCallQueue(item.queueid);
};

const completeService = () => {
  if (currentItemInService.value) {

    getFinishQueue(currentItemInService.value)
  }
};


onMounted(() => {
  getqueueinfo(); // เรียกใช้งานเมื่อคอมโพเนนต์ถูก mount
  intervalId = setInterval(() => {
    getqueueinfo();
  }, 2000); // Set interval to 2 seconds
});
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>

<style scoped>
.custom-topic {
  font-size: 20px;
  font-weight: 800;
  color: #1d4ed8;
}
</style>
