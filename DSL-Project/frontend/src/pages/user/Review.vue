<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/user/Navbar.vue'
import ReviewStar from '@/components/user/ReviewStar.vue'
import axios from "axios";
import Swal from "sweetalert2";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";
const router = useRouter();
const { cookies } = useCookies();
const accesstoken = cookies.get("accesstoken");
const studentid = ref()

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

async function getMystudentID(email: string) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_IP}/user/getSpecificuser?email=${email}`
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    if (res.data === null) {
      throw Error("No Student id");
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const rating = ref(5)



const submitReview = async (data) => {
  const completeReview = {
    rating: rating.value,
    ...data
  }
  console.log('Complete Review:', completeReview.rating)


  
  console.log(studentid.value, completeReview.rating);

  // Check for missing studentid or accesstoken
  if (!studentid.value || !accesstoken) {
    console.error("Missing studentid or accesstoken");
    return;
  }

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_IP}/history/sendreview`,
      {
        studentid: studentid.value,
        star_rate: completeReview.rating,
      },
    );

    if (response.status === 200) {
      await Swal.fire({
        icon: "success",
        title: "ขอบคุณที่ใช้บริการ",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          title: 'text-lg font-semibold',
          icon: 'text-4xl'
        }
      });
      router.push({ name: "userqueue", replace: true });
    } else {
      throw new Error(`Failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error adding staff:", error);
    await Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาดในการส่งรีวิว",
      text: error.message,
    });
  }
}





async function getuserinfo() {
  const access_token_extract = parseJwt(accesstoken);
  const studentinfoData = await getMystudentID(access_token_extract.email); // ดึงข้อมูลของ student
  studentid.value = studentinfoData.id
  
}

  onMounted(() => {
  getuserinfo(); })
</script>

<template>
  <Navbar/>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <ReviewStar 
      @submit="submitReview"
    />
  </div>
</template>