<!-- <script setup>
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

<template>
    <section class=" py-10 mb-4">

       <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
        <div 
          className="relative group cursor-pointer overflow-hidden rounded-lg flex-1"
        >
          <div className="relative h-64">
            <img
              :src="item.option_1.image"
              alt=""
              className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">{{ item.option_1.title}}</h3>
                <p className="text-white/90 text-sm">{{ item.option_1.subtitle}}</p>
              </div>
              <div className="flex justify-end">
                <ArrowRight className="text-white w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
            </div>
        </div>


        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
        <div 
          className="relative group cursor-pointer overflow-hidden rounded-lg flex-1"
        >
          <div className="relative h-64">
            <img
              :src="item.option_2.image"
              alt=""
              className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">{{ item.option_2.title}}</h3>
                <p className="text-white/90 text-sm">{{ item.option_2.subtitle}}</p>
              </div>
              <div className="flex justify-end">
                <ArrowRight className="text-white w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
            </div>
        </div>


        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
        <div 
          className="relative group cursor-pointer overflow-hidden rounded-lg flex-1"
        >
          <div className="relative h-64">
            <img
              :src="item.option_3.image"
              alt=""
              className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">{{ item.option_3.title}}</h3>
                <p className="text-white/90 text-sm">{{ item.option_3.subtitle}}</p>
              </div>
              <div className="flex justify-end">
                <ArrowRight className="text-white w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
            </div>
        </div>
    </section>
</template> -->


           

<script setup>
import { reactive } from 'vue';

const item = reactive({
    option_1:{
      title: 'จองวันส่งแบบคำขอกู้ยืม',
      subtitle: 'ผู้กู้ยืมคนใหม่ และ รายเก่าที่เปลี่ยนสถาบัน กรอกข้อมูลประวัติในระบบกยศ.',
      image: '/src/assets/img/option_1.jpg',
      link: '/user/appointment1'
    },option_2:{
      title: 'จองวันส่งสัญญากู้ยืม และ แบบเบิกเงินกู้ยืม',
      subtitle: 'ผู้กู้ยืมคนใหม่ และ รายเก่าที่เปลี่ยนสถาบัน กรอกข้อมูลประวัติในระบบกยศ.',
      image: '/src/assets/img/option_2.jpg',
      link: '/user/appointment2'
    },option_3:{
        title: 'ตรวจสอบรายการจอง',
      subtitle: 'ตรวจสอบ เปลี่ยนแปลง ยกเลิก รายการจองของคุณ',
      image: '/src/assets/img/option_3.jpg',
      link: '/user/myappointment'
    },option_4:{
        title: 'รับคิว',
      subtitle: 'ผู้กู้ยืม กดเพื่อรับคิวหน้าห้องกยศ. กรุณามาที่หน้าห้องกยศ.ก่อนกดรับคิว เริ่มรับคิวได้ตั้งแต่ 7:00 น.',
      image: '/src/assets/img/option_4.jpg',
      link: '/user/queue'
    }
})
</script>

<template>
    <section class="py-10 mb-4">
        <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
 <!-- Card Loop -->
 <router-link
          v-for="(option, index) in item"
          :key="index"
          :to="option.link"
          class="relative overflow-hidden rounded-lg shadow-lg group">
          <img 
            :src="option.image" 
            alt="Order Reservation" 
            class="w-full h-48 object-cover brightness-50 group-hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute inset-0 p-4 text-white">
            <h3 class="text-xl font-bold mb-2">{{option.title}}</h3>
            <p class="text-sm mb-4">{{option.subtitle}}</p>
            <div class="absolute bottom-4 right-4">
                <div class="rounded-full p-2 group-hover:bg-gray-200 group-hover:text-gray-800 group-hover:rounded-full transition-colors">
                <svg class="w-6 h-6 text-white-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    </section>
  </template>