<script setup>
import { ref } from 'vue'


//Star Rating
const rating = ref(5)
const hoveredRating = ref(null)

const setRating = (star) => {
  rating.value = star
}


//Form
const helpReceived = ref(null)
const selectedServices = ref([])

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit', {
    helpReceived: helpReceived.value,
    selectedServices: selectedServices.value
  })
}
</script>

<template>
  <div class="flex flex-col items-center p-10 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
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

    <!-- Counter -->
    <div class="flex items-center space-x-4 mb-6">
      <button
        @click="rating > 1 && setRating(rating - 1)"
        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
      >
        -
      </button>
      <span class="text-2xl font-semibold">{{ rating }}</span>
      <button
        @click="rating < 5 && setRating(rating + 1)"
        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
      >
        +
      </button>
    </div>

    <!-- Form -->
    <div>
      <p>คุณได้รับความช่วยเหลือที่ต้องการหรือไม่</p>
      <label>
        <input
          type="radio"
          v-model="helpReceived"
          value="yes"
        />
        ได้รับ
      </label>
      <label>
        <input
          type="radio"
          v-model="helpReceived"
          value="no"
        />
        ไม่ได้รับ
      </label>
    </div>

    <div v-if="helpReceived === 'yes'" class="mt-4">
      <p>การบริการที่ประทับใจ (เลือกได้มากกว่า 1 ข้อ)</p>
      <label>
        <input
          type="checkbox"
          v-model="selectedServices"
          value="speed"
        />
        ความรวดเร็วในการตอบคำถาม
      </label><br>
      <label>
        <input
          type="checkbox"
          v-model="selectedServices"
          value="problem_solving"
        />
        ความสามารถในการแก้ไขปัญหา
      </label><br>
      <label>
        <input
          type="checkbox"
          v-model="selectedServices"
          value="communication"
        />
        ทักษะในการสื่อสาร
      </label><br>
      <label>
        <input
          type="checkbox"
          v-model="selectedServices"
          value="politeness"
        />
        มารยาทในการสนทนา
      </label>
    </div>

    <!-- Submit Button -->
    <button
      @click="handleSubmit"
      class="w-full mt-6 bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 text-white py-3 rounded-md shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 ease-in-out transform"
    >
      SUBMIT
    </button>
  </div>
</template>

<style scoped>
button {
  transition: transform 0.2s ease, background-color 0.3s ease;
}
</style><script setup>
import { ref } from 'vue'


//Star Rating
const rating = ref(5)
const hoveredRating = ref(null)

const setRating = (star) => {
  rating.value = star
}


//Form
const helpReceived = ref(null)
const selectedServices = ref([])

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit', {
    helpReceived: helpReceived.value,
    selectedServices: selectedServices.value
  })
}
</script>

<template>
  <div class="flex flex-col items-center p-10 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
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

    <!-- Counter -->
    <div class="flex items-center space-x-4 mb-6">
      <button
        @click="rating > 1 && setRating(rating - 1)"
        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
      >
        -
      </button>
      <span class="text-2xl font-semibold">{{ rating }}</span>
      <button
        @click="rating < 5 && setRating(rating + 1)"
        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
      >
        +
      </button>
    </div>

    <!-- Form -->
    <div>
      <p>คุณได้รับความช่วยเหลือที่ต้องการหรือไม่</p>
      <label>
        <input
          type="radio"
          v-model="helpReceived"
          value="yes"
        />
        ได้รับ
      </label>
      <label>
        <input
          type="radio"
          v-model="helpReceived"
          value="no"
        />
        ไม่ได้รับ
      </label>
    </div>

    <div v-if="helpReceived === 'yes'" class="mt-4">
      <p>การบริการที่ประทับใจ (เลือกได้มากกว่า 1 ข้อ)</p>
      <label>
        <input
          type="checkbox"
          v-model="selectedServices"
          value="speed"
        />
        ความรวดเร็วในการตอบคำถาม
      </label><br>
      <label>
        <input
          type="checkbox"
          v-model="selectedServices"
          value="problem_solving"
        />
        ความสามารถในการแก้ไขปัญหา
      </label><br>
      <label>
        <input
          type="checkbox"
          v-model="selectedServices"
          value="communication"
        />
        ทักษะในการสื่อสาร
      </label><br>
      <label>
        <input
          type="checkbox"
          v-model="selectedServices"
          value="politeness"
        />
        มารยาทในการสนทนา
      </label>
    </div>

    <!-- Submit Button -->
    <button
      @click="handleSubmit"
      class="w-full mt-6 bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 text-white py-3 rounded-md shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 ease-in-out transform"
    >
      SUBMIT
    </button>
  </div>
</template>

<style scoped>
button {
  transition: transform 0.2s ease, background-color 0.3s ease;
}
</style>