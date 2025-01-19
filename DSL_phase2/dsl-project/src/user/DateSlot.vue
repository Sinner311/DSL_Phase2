<script setup>
  import Navbar from "@/components/Navbar.vue";
  import AlertCard from "@/components/AlertCard.vue";
  import { ref } from "vue";
  
  const selectedSlot = ref(null);
  const showConfirmation = ref(false);
  
  const timeSlots = [
    { date: "16 สิงหาคม 2567", time: "คิวเต็ม", remaining: 250, isFull: true },
    { date: "17 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false },
    { date: "18 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false },
    { date: "19 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false },
    { date: "16 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false },
    { date: "17 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false },
    { date: "18 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false },
    { date: "19 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false }
  ];
  
  const handleSlotSelection = (index) => {
    if (timeSlots[index].isFull) return;
    selectedSlot.value = index;
    showConfirmation.value = true;
  };

  const handleConfirm = () => {
    alert(`จองคิววันที่ ${timeSlots[selectedSlot.value].date} เวลา ${timeSlots[selectedSlot.value].time} สำเร็จ`);
    showConfirmation.value = false;
    selectedSlot.value = null;
  };

  const handleCancel = () => {
    showConfirmation.value = false;
    selectedSlot.value = null;
  };
</script>

<style scoped>
  /* Style to apply a blur effect when the slot is selected */
  .blur-background {
    filter: blur(5px);
    pointer-events: none;
  }

  .alert-card-container {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .alert-card {
    position: relative;
    z-index: 20;
  }
</style>

<template>
  <div :class="{'blur-background': selectedSlot !== null}">
    <Navbar />
    <div class="w-full max-w-2xl mx-auto mt-14">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-center">กรุณาเลือกวันที่ต้องการจองคิว</h2>
        </div>
        <div>
          <div class="grid gap-4">
            <button
              v-for="(slot, index) in timeSlots"
              :key="index"
              :class="['w-full p-4 border rounded-lg', slot.isFull ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-green-100 hover:text-black bg-indigo-700 text-white', selectedSlot === index ? 'bg-green-500 text-white' : 'border-gray-300']"
              :disabled="slot.isFull"
              @click="handleSlotSelection(index)"
            >
              <div class="flex justify-between items-center w-full">
                <span>{{ slot.date }}</span>
                <span>{{ slot.time }}</span>
                <span>เหลือ {{ slot.remaining }} คิว</span>
              </div>
            </button>


          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Alert Card will be rendered here on selectedSlot -->
  <div v-if="selectedSlot !== null" class="alert-card-container">
              <AlertCard @cancel="handleCancel" @confirm="handleConfirm" />
            </div>
</template>
