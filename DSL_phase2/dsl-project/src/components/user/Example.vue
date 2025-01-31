<script setup>
import { ref } from "vue";

const isPdfOpen1 = ref(false);
const isPdfOpen2 = ref(false);

const openPdf1 = () => {
  isPdfOpen1.value = true;
};

const closePdf1 = () => {
  isPdfOpen1.value = false;
};

const openPdf2 = () => {
  isPdfOpen2.value = true;
};

const closePdf2 = () => {
  isPdfOpen2.value = false;
};
</script>
<template>
  <section class="mb-4">
    <div class="grid grid-cols-2 gap-1">
        <div class="bg-black py-10 cursor-pointer" @click="openPdf1">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    <div class="text-center">
      <p class="font-bold text-md sm:text-lg md:text-2xl text-white hover:text-gray-300">
        ตัวอย่างการเซ็นสัญญา-แบบยืนยันการเบิกเงิน
      </p>
      <p class="font-bold text-lg sm:text-lg md:text-2xl text-white hover:text-gray-300">
        ผู้กู้ยืมอายุ 20 ปีขึ้นไป
      </p>
    </div>
  </div>
</div>

<!-- Modal สำหรับแสดง PDF -->
<transition name="fade">
  <div
    v-if="isPdfOpen1"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-bold">ตัวอย่างการเซ็นสัญญา</h2>
        <button @click="closePdf1" class="text-red-500 font-bold">X</button>
      </div>
      <iframe 
              src="https://drive.google.com/file/d/1BYH1XYpjrBHSrf1F32ENxHwWekk9rw2w/preview" 
              width="100%" height="700px">
            </iframe>
      
    </div>
  </div>
</transition>


      <div class="bg-black py-10 cursor-pointer" @click="openPdf2">
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <div class="text-center">
            <p class="font-bold text-md sm:text-lg md:text-2xl text-white">
              ตัวอย่างการเซ็นสัญญา-แบบยืนยันการเบิกเงิน
            </p>
            <p class="font-bold text-lg sm:text-lg md:text-2xl text-white">
              ผู้กู้ยืมอายุไม่ถึง 20 ปี
            </p>
          </div>
        </div>
      </div>
      <!-- Modal สำหรับแสดง PDF -->
<transition name="fade">
  <div
    v-if="isPdfOpen2"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-bold">ตัวอย่างการเซ็นสัญญา</h2>
        <button @click="closePdf2" class="text-red-500 font-bold">X</button>
      </div>
      <iframe 
              src="https://drive.google.com/file/d/1OvCrenCWsi1YjgOcNV1L3fVOkETFxBkM/preview" 
              width="100%" height="700px">
            </iframe>
      
    </div>
  </div>
</transition>

    </div>
  </section>
</template>
