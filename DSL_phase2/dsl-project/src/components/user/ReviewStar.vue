<script setup>
import { ref } from 'vue'

const rating = ref(5)
const hoveredRating = ref(null)

const setRating = (star) => {
  rating.value = star
}

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit', { rating: rating.value }); // ส่งเป็น object แทนค่าเดียว
};


</script>

<template>

  <div class="flex flex-col items-center p-28 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
       <!-- Counter -->
  <div class="flex items-center space-x-4 mb-2">
    <p class="font-bold text-l mt-4">Review</p>
  </div>
    <!-- Service Icon -->
    <div class="bg-gray-100 p-4 rounded-full mb-6">
      <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        <svg
          class="w-10 h-10 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    </div>

    <!-- Star Rating -->
    <div class="flex space-x-1 mb-6">
      <i
        v-for="star in 5"
        :key="star"
        @mouseenter="hoveredRating = star"
        @mouseleave="hoveredRating = null"
        @click="setRating(star)"
        :class="['cursor-pointer transition-transform duration-200 ease-in-out', hoveredRating >= star ? 'scale-125' : '']"
        :style="{ color: (hoveredRating || rating) >= star ? '#FFD700' : '#D1D5DB' }"
        class="fa fa-star text-xl"
      ></i>
    </div>

  

    <!-- Next Button -->
    <button
      @click="handleSubmit"
      class="w-full bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 text-white py-3 rounded-md shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 ease-in-out transform"
    >
      SUBMIT
    </button>
    <p class="font-bold text-sm mt-4">กดให้คะแนนการให้บริการ</p>
  </div>
</template>

<style scoped>
i:hover {
  transform: scale(1.2);
}

button {
  transition: transform 0.2s ease, background-color 0.3s ease;
}
</style>