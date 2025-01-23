<script setup>

</script>
<template>
    <section class="m-4 border-4 border-black rounded-2xl">
    <p class="font-bold text-indigo-900 text-sm text-center sm:text-lg md:text-2xl mt-3">
      ตัวอย่างต่างๆ สามารถกดปุ่มเพื่อศึกษาเพิ่มเติมได้
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="#" class="bg-black py-10 rounded-2xl m-5 flex justify-center items-center transition-all hover:bg-indigo-800" >
              <div class="max-w-lg mx-auto text-center px-4 sm:px-6 lg:px-8">
                <p class="font-bold text-md sm:text-lg md:text-2xl text-white group-hover:text-white">คู่มือการใช้งาน</p>
                <div>
                <button class="text-white bg-sky-500 mt-3 rounded-2xl p-2 px-4 hover:bg-yellow-500">คลิก</button>
              </div>
              </div>

        </a>
        <a href="#" class="bg-black py-10 rounded-2xl m-5 flex justify-center items-center transition-all hover:bg-indigo-800">

              <div class="max-w-lg mx-auto text-center px-4 sm:px-6 lg:px-8">
                <p class="font-bold text-md sm:text-lg md:text-2xl text-white group-hover:text-white">
                  ตัวอย่างการเซ็นสัญญา-แบบยืนยันการเบิกเงิน
                </p>
                <p class="font-bold text-md sm:text-lg md:text-2xl text-white mt-2 group-hover:text-white">
                  ผู้กู้ยืมอายุ 20 ปีขึ้นไป
                </p>
                <button class="text-white bg-sky-500 mt-3 rounded-2xl p-2 px-4 hover:bg-yellow-500">คลิก</button>
              </div>

        </a>
    </div>
  </section>
</template>