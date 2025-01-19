<script setup>
import { ClockIcon } from 'lucide-vue-next';
</script>

<template>
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <div class="p-6">
        <div class="text-center space-y-4">
          <!-- Header Section -->
          <div class="space-y-2">
            <h2 class="font-medium">สรุปรายการจอง</h2>
            <p class="text-gray-700">คุณ XXXXXXX XXXXXXXXX</p>
            <p class="text-gray-700">รหัสนักศึกษา XXXXXXX</p>
          </div>
  
          <!-- Details Section -->
          <div class="space-y-2 my-4">
            <p class="font-medium">เรื่อง ส่งแบบคำขอยืม</p>
            <p>วันที่ 28 สิงหาคม 2567</p>
            <div class="flex items-center justify-center gap-2 text-gray-600">
              <!-- Clock Icon -->
              <ClockIcon class="w-4 h-4" />
              <span>8.30 - 4.00</span>
            </div>
          </div>
  
          <!-- Warning Section -->
          <div class="text-red-500 text-sm">
            <p>หลังจากจองแล้ว</p>
            <p>กรุณาตรวจสอบที่อีเมล ตรวจรายการจอง</p>
          </div>
  
          <!-- Buttons Section -->
          <div class="flex gap-4 justify-center mt-6">
            <button
              @click="$emit('cancel')"
              class="px-8 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ยกเลิก
            </button>
            <button
              @click="$emit('confirm')"
              class="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  