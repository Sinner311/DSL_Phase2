import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../pages/view/LoginView.vue";
import HomeView from "../pages/user/HomeView.vue";
import AppointmentRound from "../pages/user/AppointmentRound.vue";
import DateSlot from "../pages/user/DateSlot.vue";
import UserAppointment from "../pages/user/UserAppointment.vue";
import QueueUpView from "../pages/user/QueueUpView.vue";
import UserQueue from "../pages/user/UserQueue.vue";
import Review from "../pages/user/Review.vue";
import Mainstaff from "../pages/staff/Mainstaff.vue";
import StaffCallQueue from "../pages/staff/StaffCallQueue.vue";
import TVshow from "../pages/staff/TVshow.vue";
import Daysetting from "../pages/staff/Daysetting.vue";
import StaffSetting from "../pages/staff/Setting.vue";
import EditDayRepairdoc from "../pages/staff/EditDayRepairdoc.vue";
import EditdaysendDoc1 from "../pages/staff/EditdaysendDoc1.vue";
import EditdaysendDoc2 from "../pages/staff/EditdaysendDoc2.vue";
import Mainaddmin from "../pages/admin/Mainadmin.vue";
import Addstaff from "../pages/admin/Addstaff.vue";
import Adminsetting from "../pages/admin/Adminsetting.vue";

import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: LoginView,
  },
  //User จองวัน
  {
    path: "/user",
    name: "user",
    component: HomeView,
    meta: { role: ["STUDENT"] as string[] },
  },
  {
    path: "/user/appointment",
    name: "userappointment",
    component: AppointmentRound,
    meta: { role: ["STUDENT"] as string[] },
  },
  {
    path: "/user/appointment/selectdate",
    name: "userselectdate",
    component: DateSlot,
    meta: { role: ["STUDENT"] as string[] },
  },
  {
    path: "/user/myappointment",
    name: "usermyappointment",
    component: UserAppointment,
    meta: { role: ["STUDENT"] as string[] },
  },
  //User จองคิว
  { path: "/user/queue", name: "userqueue", component: QueueUpView ,meta: { role: ["STUDENT"] as string[] },},
  {
    path: "/user/queue/myqueue",
    name: "usermyqueue",
    component: UserQueue,
    meta: { role: ["STUDENT"] as string[] },
  },
  {
    path: "/user/queue/statisfaction",
    name: "userstatisfaction",
    component: Review,
    meta: { role: ["STUDENT"] as string[] },
  },
  {
    path: "/admin",
    name: "admin",
    component: Mainaddmin,
    meta: { role: ["ADMIN"] as string[] },
  },
  {
    path: "/admin/addstaff",
    name: "adminaddstaff",
    component: Addstaff,
    meta: { role: ["ADMIN"] as string[] },
  },
  {
    path: "/admin/setting",
    name: "adminsetting",
    component: Adminsetting,
    meta: { role: ["ADMIN"] as string[] },
  },
  {
    path: "/staff",
    name: "staff",
    component: Mainstaff,
    meta: { role: ["ADMIN", "TEACHER"] as string[] }, 
  },
  {
    path: "/staff/callqueue",
    name: "staffcallqueue",
    component: StaffCallQueue,
    meta: { role: ["ADMIN", "TEACHER"] as string[] }, 
  },
  {
    path: "/staff/daysetting",
    name: "staffdaysetting",
    component: Daysetting,
    meta: { role: ["ADMIN", "TEACHER"] as string[] }, 
  },
  {
    path: "/staff/daysetting/editdocamendmentday",
    name: "staffeditdocamendmentday",
    component: EditDayRepairdoc,
    meta: { role: ["ADMIN", "TEACHER"] as string[] }, 
  },
  {
    path: "/staff/daysetting/editday1",
    name: "staffeditday1",
    component: EditdaysendDoc1,
    meta: { role: ["ADMIN", "TEACHER"] as string[] }, 
  },
  {
    path: "/staff/daysetting/editday2",
    name: "staffeditday2",
    component: EditdaysendDoc2,
    meta: { role: ["ADMIN", "TEACHER"] as string[] }, 
  },
  {
    path: "/staff/dashboard",
    name: "staffdashboard",
    component: TVshow,
    meta: { role: ["ADMIN", "TEACHER"] as string[] }, 
  },
  {
    path: "/staff/setting",
    name: "staffsetting",
    component: StaffSetting,
    meta: { role: ["ADMIN", "TEACHER"] as string[] }, 
  },
];


const router = createRouter({
  history: createWebHistory("/"), //process.env.BASE_URL
  routes,
});

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
async function refeshToken(refresh: string) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_IP}/api/login/refresh`,
      null,
      {
        headers: {
          Authorization: `Bearer ${refresh}`,
        },
      }
    );
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    const token = res.data;
    cookies.remove("accesstoken");
    cookies.remove("refreshtoken");

    cookies.set("accesstoken", token.access_token);
    cookies.set("refreshtoken", token.refresh_token);
  } catch (error) {
    console.error(error);
  }
}

async function isAuthenticated() {
  // ! get token from cookies
  const accesstoken = cookies.get("accesstoken");
  const refreshtoken = cookies.get("refreshtoken");

  // console.log("accesstoken: ", accesstoken);
  // ! check if cookies haven't accesstoken
  if (
    accesstoken === undefined ||
    accesstoken === null ||
    refeshToken === undefined ||
    refeshToken === null
  ) {
    // console.log("test");
    return false;
  }
  // ! parseJwt from cookies
  const jwtPayload = parseJwt(accesstoken);
  // console.log(jwtPayload.exp, ` Time :  ${Date.now() / 1000}`);
  // ! check accesstoken is expired
  if (jwtPayload.exp < Date.now() / 1000) {
    // token expired
    console.log("expried");
    // console.log(refreshtoken);
    await refeshToken(refreshtoken);
    return false;
  }

  return true;
}


router.beforeEach(async (to, from, next) => {
  const isAuth = await isAuthenticated();
  const userToken = isAuth ? parseJwt(cookies.get("accesstoken")) : null;

  if (!isAuth && to.name !== "root") {
    console.log("Not authenticated. Redirecting to login.");
    return next({ name: "root" });
  }
  const role = to.meta.role as string[] | undefined;
  if (role && (!userToken || !role.includes(userToken.role))) {
    cookies.remove("accesstoken");
    cookies.remove("refreshtoken");
    return next({ name: "root" });
  }

  next();
});

export default router;
