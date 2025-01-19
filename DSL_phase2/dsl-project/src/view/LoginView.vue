
<template>
    <div 
      class="min-h-screen bg-gray-100 flex items-center justify-center p-4" 
      style="background-image: url('/src/assets/img/background.jpg'); background-size: cover; background-position: center;">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <!-- Logo Section -->
        <div class="text-center mb-8">
          <img 
            src="/src/assets/img/logo.jpg" 
            alt="Logo" 
            class="mx-auto h-16 w-16 mb-4"
          />
          <h2 class="text-2xl font-bold text-gray-900">MFU DSL EQUEUE</h2>
          <p class="text-sm text-gray-600">ระบบจองคิว กยศ มหาวิทยาลัยแม่ฟ้าหลวง</p>
        </div>
    
        <!-- Google Login Button -->
        <div class="space-y-6 flex items-center justify-center w-full">
          <GoogleLogin :callback="callback" :button-config="{ text: 'continue_with',theme: 'filled_blue' ,locale: 'th_TH',size: 'large',width: '330'}" />
        </div>
      </div>
    </div>
  </template>

  
<script setup lang="ts">

const callback = (response: any) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
</script>

