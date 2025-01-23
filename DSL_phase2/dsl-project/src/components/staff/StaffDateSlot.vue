<script setup>
import { ref } from "vue";

const timeSlots = ref([
  { date: "16 สิงหาคม 2567", time: "คิวเต็ม", remaining: 250, isFull: true, isDisabled: false },
  { date: "17 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false, isDisabled: false },
  { date: "18 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false, isDisabled: false },
  { date: "19 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false, isDisabled: false },
  { date: "16 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false, isDisabled: false },
  { date: "17 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false, isDisabled: false },
  { date: "18 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false, isDisabled: false },
  { date: "19 สิงหาคม 2567", time: "8.30 - 4.00", remaining: 250, isFull: false, isDisabled: false }
]);

const toggleSlot = (index) => {
  timeSlots.value[index].isDisabled = !timeSlots.value[index].isDisabled;
};

const changeTime = (index) => {
  const newTime = prompt("Enter new time slot (e.g., 10.00 - 5.00):", timeSlots.value[index].time);
  if (newTime) {
    timeSlots.value[index].time = newTime;
  }
};

const changeQueueNumber = (index) => {
  const newQueueNumber = prompt("Enter new queue number:", timeSlots.value[index].remaining);
  if (newQueueNumber && !isNaN(newQueueNumber) && newQueueNumber >= 0) {
    timeSlots.value[index].remaining = parseInt(newQueueNumber);
  } else {
    alert("Please enter a valid number.");
  }
};
</script>

<style scoped>
/* Slot button styles */
.slot-button {
  width: 100%;
  padding: 1rem;
  border: 1px solid;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Disabled and full slot styles */
.slot-disabled {
  background-color: #f87171; /* Red */
  color: white;
  cursor: not-allowed;
}
.slot-full {
  background-color: #e5e7eb; /* Gray */
  color: #6b7280;
  cursor: not-allowed;
}

/* Enable/Disable button styles */
.toggle-button {
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}
.toggle-button:hover {
  background-color: #e5e7eb; /* Lighter gray */
  color: #111827;
}

/* Time changing button styles */
.change-time-button {
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}
.change-time-button:hover {
  background-color: #e5e7eb; /* Lighter gray */
  color: #111827;
}

/* Queue number changing button styles */
.change-queue-button {
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}
.change-queue-button:hover {
  background-color: #e5e7eb; /* Lighter gray */
  color: #111827;
}

/* Selected and hover effects */
.slot-button:hover:not(.slot-disabled):not(.slot-full) {
  background-color: #d1fae5; /* Green-100 */
  color: black;
}
.slot-selected {
  background-color: #10b981; /* Green-500 */
  color: white;
}
</style>

<template>
  <div class="w-full max-w-2xl mx-auto mt-14">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="grid gap-4">
        <div v-for="(slot, index) in timeSlots" :key="index" class="relative border p-4 rounded-md">
          <!-- Slot button -->
          <button
            :class="[
              'slot-button',
              slot.isFull
                ? 'slot-full'
                : slot.isDisabled
                ? 'slot-disabled'
                : 'hover:bg-green-100 hover:text-black bg-indigo-700 text-white',
              selectedSlot === index ? 'slot-selected' : 'border-gray-300'
            ]"
            :disabled="slot.isFull || slot.isDisabled"
          >
            <div class="flex justify-between items-center w-full">
              <span>{{ slot.date }}</span>
              <span>{{ slot.time }}</span>
              <span>เหลือ {{ slot.remaining }} คิว</span>
            </div>
          </button>
          
          <!-- Enable/Disable button outside the row -->
          <div class="mt-2 text-right">
            <button
              @click="toggleSlot(index)"
              class="toggle-button mr-2"
            >
              {{ slot.isDisabled ? "Enable" : "Disable" }}
            </button>
            <!-- Time changing button -->
            <button
              @click="changeTime(index)"
              class="change-time-button"
            >
              Change Time
            </button>
            <!-- Queue number changing button -->
            <button
              @click="changeQueueNumber(index)"
              class="change-queue-button"
            >
              Change Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
