<template>
    <div 
      class="min-h-screen bg-gray-100 flex items-center justify-center p-4" 
      style="background-image: url('/assets/img/background.jpg'); background-size: cover; background-position: center;">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <!-- Logo Section -->
        <div class="text-center mb-8">
          <img 
            src="/assets/img/logo.jpg" 
            alt="Logo" 
            class="mx-auto h-16 w-16 mb-4"
          />
          <h2 class="text-2xl font-bold text-gray-900">MFU DSL EQUEUE</h2>
          <p class="text-sm text-gray-600">ระบบจองคิว กยศ. มหาวิทยาลัยแม่ฟ้าหลวง</p>
        </div>
    
        <!-- Google Login Button -->
        <div class="space-y-6">
          <button
            @click="login"
            class="w-full flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            <i class="fab fa-google mr-3 text-lg"></i>
            <span>ลงชื่อเข้าใช้งานระบบ</span>
          </button>
        </div>

        <div class="text-center mt-2">
        <a class="text-xs text-red-400">โปรดใช้ Lamduan Mail ในการเข้าใช้งาน</a>
      </div>
      </div>
    </div>
  </template>

  
<script setup lang="ts">

import { googleSdkLoaded } from 'vue3-google-login';
import axios from 'axios';
import { useCookies } from "vue3-cookies";
import router from "@/router";
import { ref } from 'vue';
const { cookies } = useCookies();
const google_client_id = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
async function login() {

    googleSdkLoaded((google:any) =>{
    google.accounts.oauth2.initCodeClient({
        client_id: google_client_id,
        // client_secret: google_client_secret
         scope: "email profile openid",
            redirect_uri: `/auth/callback`,
            callback: (response: { code: any; }) => {
              if (response.code) {
                 sendCodeToBackend(response.code);
                // console.log( response.code);
                
              }
            }
    }).requestCode();        
    });
}
async function sendCodeToBackend(code:string) {
  try {
        const headers = {
          Authorization: code
        };
   
        const response = await axios.post(`${import.meta.env.VITE_APP_IP}/auth/google`, null, { headers });
        const token = response.data;
        console.log("token: ", token);
        cookies.set("accesstoken",token.access_token);
        cookies.set("refreshtoken",token.refresh_token);
        
       const access_token_extract = await parseJwt(token.access_token);

        if (access_token_extract === null || access_token_extract === undefined) {
          throw Error("Token not found");
        }

        switch (access_token_extract.role) {
          case "STUDENT":
            router.push({name:"user",replace:true})
            break;
          case "ADMIN":
          //  alert( await getAdmin(access_token_extract));
            if ((await getAdmin(access_token_extract))) {
              router.push({name:"admin",replace:true});
              break;
            }
            router.push({name:"staff",replace:true})
            break;
          case "TEACHER":
            router.push({name:"staff",replace:true})
            break;
          default:
            throw Error("Role not found");
            break;
        }



        // userDetails = userDetails;
        // Redirect to the homepage ("/")
        //this.$router.push("/rex");
      } catch (error) {
        console.error("Failed to send authorization code:", error);
      }
}

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


async function getAdmin(access_token_extract:any) {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_IP}/user/getAlluser`);
        if (res.status !==200) {
            throw Error(res.statusText);
        }
        const admin = ref([]);
        console.log(res.data);
        let ismonitor = false;
        res.data.forEach((value:any)=>{
          if(value.role === "TEACHER" || value.role === "ADMIN" && value.channel !== 0){
            if(value.email === access_token_extract.email){
              console.log("ismonitor");
              ismonitor = true;;
            }
          }
        })
        return ismonitor;
    } catch (error) {
        console.error(error);
    }
}



</script>