<template>
  <div class="flex flex-col items-center justify-center p-6 space-y-4 mt-40">
    <div class="flex space-x-11">
      <h1
        v-for="day in visibleDays.length > 0 ? visibleDays : ['ไม่ได้เลือกวัน']"
        :key="day"
        :class="['text-7xl font-bold', days[day] || 'text-gray-500']"
      >
        {{ day }}
      </h1>
    </div>
    <p class="text-6xl font-bold">เปิดรับเฉพาะเอกสารแก้ไข</p>
    <button
      @click="toggleDropdown"
      class="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-10"
    >
      เปลี่ยนวันที่ส่งเอกสารแก้ไข
    </button>

    <!-- Checkbox Dropdown -->
    <div
      v-if="dropdownVisible"
      class="mt-4 w-64 bg-white border rounded shadow-md p-4 space-y-2"
    >
      <label
        v-for="(color, day) in days"
        :key="day"
        class="flex items-center space-x-2"
      >
        <input
          type="checkbox"
          :value="day"
          v-model="selectedDays"
          class="form-checkbox h-5 w-5 text-indigo-600"
          :disabled="selectedDays.length >= 2 && !selectedDays.includes(day)"
        />
        <span :class="color">{{ day }}</span>
      </label>
      <button
        @click="confirmSelection"
        class="mt-4 bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        ยืนยัน
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  setup() {
    const days = {
      วันจันทร์: "text-yellow-400",
      วันอังคาร: "text-pink-400",
      วันพุธ: "text-green-400",
      วันพฤหัสบดี: "text-orange-400",
      วันศุกร์: "text-blue-400",
    };

    const selectedDays = ref([]);
    const visibleDays = ref(["ไม่ได้เลือกวัน"]);
    const dropdownVisible = ref(false);
    const accesstoken = localStorage.getItem("accessToken");

    // ดึงค่าจาก API
    const getDASDSettings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_IP}/round/getDASDSettings`
        );
        if (res.status === 200 && res.data) {
          const dayFromAPI = res.data.Document_Amendment_Submission_Date;
          selectedDays.value = dayFromAPI ? dayFromAPI.split(",") : [];
          visibleDays.value = [...selectedDays.value];
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    // อัปเดตค่าผ่าน API
    const updateDay = async () => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_APP_IP}/round/geteditDASDSettings`,
          {
            dasd_text:
              selectedDays.value.length === 0
                ? null
                : selectedDays.value.join(","), // แปลง array → string
          },
          { headers: { Authorization: `Bearer ${accesstoken}` } }
        );

        if (res.status === 200) {
          await Swal.fire({
            icon: "success",
            title: "แก้ไขสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          throw new Error("Failed to update settings.");
        }
      } catch (error) {
        console.error("Error updating settings:", error);
      }
    };

    // ยืนยันและอัปเดต API
    const confirmSelection = async () => {
      visibleDays.value = [...selectedDays.value]; // แสดงผล
      dropdownVisible.value = false;
      await updateDay();
    };

    onMounted(getDASDSettings);

    return {
      days,
      selectedDays,
      visibleDays,
      dropdownVisible,
      toggleDropdown: () => (dropdownVisible.value = !dropdownVisible.value),
      confirmSelection,
    };
  },
};
</script>
