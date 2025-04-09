<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="container max-w-7xl px-4 py-2 mx-auto">
      <div class="flex justify-between items-center w-full">
        <!-- Left side: Logo and Text -->
        <div class="flex items-center space-x-4">
          <div @click="homePage" class="flex items-center space-x-4 cursor-pointer">
            <img src="/assets/img/logo.jpg" alt="Logo" class="h-10" />
            <div>
              <p class="text-black lg:text-2xl font-bold">MFU DSL EQUEUE</p>
              <p class="text-black text-sm lg:text-md font-bold">
                ระบบจองคิว กยศ. มหาวิทยาลัยแม่ฟ้าหลวง
              </p>
            </div>
          </div>
          <span class="text-red-500 lg:text-4xl font-bold">ADMIN</span>
        </div>

        <!-- Right side: Logout Button -->
        <div class="hidden md:flex space-x-4">
          <button
            @click="confirmLogut"
            class="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 text-sm rounded-3xl"
          >
            ออกจากระบบ <i class="pi pi-sign-out"></i>
          </button>
        </div>

        <!-- Mobile Hamburger Menu (for small screens) -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMenu"
            class="text-indigo-900 hover:text-indigo-700"
          >
            <i class="pi pi-bars text-xl"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu (hidden by default) -->
    <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md">
      <div class="flex flex-col space-y-4 px-4 py-2">
        <button
          @click="confirmLogut"
          class="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 text-sm rounded-3xl"
        >
          ออกจากระบบ <i class="pi pi-sign-out"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import Swal from "sweetalert2";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function homePage() {
  router.push({ name: "admin" });
}
async function confirmLogut() {
  const { isConfirmed } = await Swal.fire({
    title: "คุณแน่ใจใช่ไหม?",
    text: "คุณกำลังจะออกจากระบบ!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#191771",
    cancelButtonColor: "#ED1C24",
    confirmButtonText: "ยืนยัน!",
    cancelButtonText: "ยกเลิก",
    iconColor: "#ED1C24",
    reverseButtons: true,
    color: "#191771",
  });
  if (isConfirmed) {
    cookies.remove("accesstoken");
    cookies.remove("refreshtoken");
    router.push({ name: "root", replace: true });
  }
}
</script>
