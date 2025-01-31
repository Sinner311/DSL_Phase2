<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    required: true
  }
})
import { ref } from 'vue'

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