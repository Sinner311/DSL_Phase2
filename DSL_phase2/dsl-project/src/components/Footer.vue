<template>
    <section class="py-10 mb-4">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 content-between ">
<!-- Information -->
            <div class="ml-5 ">
                <!-- MFU -->
                <div class="flex flex-shrink-0 items-center mr-4" ><img class="h-16 w-auto" src="/src/assets/img/logo.jpg" alt="Vue Jobs" /><div>
                    <span class=" md:block text-indigo-900 text-lg md:text-xl lg:text-2xl font-bold ml-3">สำนักงาน กยศ มหาวิทยาลัยแม่ฟ้าหลวง</span></div></div>

                <!-- Contact -->
                <div class="text-lg md:text-xl p-4 rounded-md ">
    <div class="flex items-center mb-2">
      <i class="pi pi-home mr-2 text-xl"></i>
      <span>ห้อง กยศ. ส่วนพัฒนานักศึกษา</span>
    </div>
    <div class="flex items-center mb-2">
      <i class="pi pi-phone mr-2 text-xl"></i>
      <span>โทร. 053 916 381 และ 053 916 382</span>
    </div>
    <div class="flex items-center mb-2">
      <i class="pi pi-facebook mr-2 text-xl"></i>
      <p>Facebook: กยศ.มฟล.</p>
    </div>

  </div>
            </div>

        
  
<!-- MAP -->
        <div class="relative overflow-hidden rounded-3xl shadow-xl group m-3">
          <img 
          src="/src/assets/img/map.jpg" 
            alt="Contract Reservation" 
            class="w-full h-full object-cover = group-hover:scale-105 transition-transform duration-300"
          />

        </div>
  
      </div>

    </section>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const item = reactive({
      option_1:{
        title: 'จองวันส่งแบบคำขอกู้ยืม',
        subtitle: 'ผู้กู้ยืมคนใหม่ และ รายเก่าที่เปลี่ยนสถาบัน กรอกข้อมูลประวัติในระบบกยศ.',
        image: '/src/assets/img/option_1.jpg'
      },option_2:{
        title: 'จองวันส่งสัญญากู้ยืม และ แบบเบิกเงินกู้ยืม',
        subtitle: 'ผู้กู้ยืมคนใหม่ และ รายเก่าที่เปลี่ยนสถาบัน กรอกข้อมูลประวัติในระบบกยศ.',
        image: '/src/assets/img/option_2.jpg'
      },option_3:{
          title: 'ตรวจสอบรายการจอง',
        subtitle: 'ตรวจสอบ เปลี่ยนแปลง ยกเลิก รายการจองของคุณ',
        image: '/src/assets/img/option_3.jpg'
      }
  })
  </script>