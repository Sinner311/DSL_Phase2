<script setup>
import { ref } from 'vue'
import Navbar from '@/components/user/Navbar.vue'
import ReviewStar from '@/components/user/ReviewStar.vue'
import ReviewForm from '@/components/user/ReviewForm.vue'

const currentStep = ref(1)
const rating = ref(5)
const formData = ref({
  helpReceived: null,
  selectedServices: []
})

const moveToNextStep = (data) => {
  if (currentStep.value === 1) {
    rating.value = data
    currentStep.value = 2
  }
}

const submitReview = (data) => {
  const completeReview = {
    rating: rating.value,
    ...data
  }
  console.log('Complete Review:', completeReview)
  // Add your final submission logic here, e.g. API call
}
</script>

<template>
  <Navbar/>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <ReviewStar 
      v-if="currentStep === 1" 
      @next="moveToNextStep"
    />
    <ReviewForm 
      v-if="currentStep === 2" 
      @submit="submitReview"
    />
  </div>
</template>