import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../pages/view/LoginView.vue";
import HomeView from "../pages/user/HomeView.vue";
import AppointmentRound1 from "../pages/user/AppointmentRound1.vue";
import AppointmentRound2 from "../pages/user/AppointmentRound2.vue";
import DateSlot from "../pages/user/DateSlot.vue";
import UserAppointment from "../pages/user/UserAppointment.vue";
import QueueUpView from "../pages/user/QueueUpView.vue";
import UserQueue from "../pages/user/UserQueue.vue";
import Review from "../pages/user/Review.vue";
import Mainadmin from "../pages/admin/Mainadmin.vue";
import Addstaff from "../pages/admin/Addstaff.vue";
import Adminsetting from "../pages/admin/Adminsetting.vue";
import Tablereview from "../pages/admin/TableReview.vue";
import AdminCallQueue from "../pages/admin/AdminCallQueue.vue";
import AdminDaysetting from "../pages/admin/AdminDaysetting.vue";
import AdminEditDayRepairdoc from "../pages/admin/AdminEditDayRepairdoc.vue";
import AdminEditdaysendDoc1 from "../pages/admin/AdminEditdaysendDoc1.vue";
import AdminEditdaysendDoc2 from "../pages/admin/AdminEditdaysendDoc2.vue";
import AdminTVshow from "../pages/admin/AdminTVshow.vue";
import AdminEditday from "../pages/admin/AdminDateSlot.vue";
import AdminBookingList from "../pages/admin/AdminBookingList.vue";



import axios from "axios";
import { useCookies } from "vue3-cookies";
import LoginQueue from "@/pages/view/LoginQueue.vue";

const { cookies } = useCookies();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: LoginView,
  },
  {
    path: "/queue",
    name: "queuelogin",
    component: LoginQueue,
  },
  //User จองวัน
  {
    path: "/user",
    name: "user",
    component: HomeView,
    meta: { role: ["STUDENT"] as string[] },
  },
  {
    path: "/user/appointment1",
    name: "userappointment1",
    component: AppointmentRound1,
    meta: { role: ["STUDENT"] as string[] },
  },
  {
    path: "/user/appointment2",
    name: "userappointment2",
    component: AppointmentRound2,
    meta: { role: ["STUDENT"] as string[] },
  },
  {
    path: "/user/selectdate",
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
    component: Mainadmin,
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
    path: "/admin/tablereview",
    name: "tablereview",
    component: Tablereview,
    meta: { role: ["ADMIN"] as string[] },
  },
  {
    path: "/admin/callqueue",
    name: "admincallqueue",
    component: AdminCallQueue,
    meta: { role: ["ADMIN"] as string[] }, 
  },
  {
    path: "/admin/daysetting",
    name: "admindaysetting",
    component: AdminDaysetting,
    meta: { role: ["ADMIN"] as string[] }, 
  },
  {
    path: "/admin/daysetting/editdocamendmentday",
    name: "admineditdocamendmentday",
    component: AdminEditDayRepairdoc,
    meta: { role: ["ADMIN"] as string[] }, 
  },
  {
    path: "/admin/daysetting/editday1",
    name: "admineditday1",
    component: AdminEditdaysendDoc1,
    meta: { role: ["ADMIN"] as string[] }, 
  },
  {
    path: "/admin/daysetting/editday2",
    name: "admineditday2",
    component: AdminEditdaysendDoc2,
    meta: { role: ["ADMIN"] as string[] }, 
  },
  {
    path: "/admin/dashboard",
    name: "admindashboard",
    component: AdminTVshow,
    meta: { role: ["ADMIN"] as string[] }, 
  },
  {
    path: "/admin/editday",
    name: "admineditday",
    component: AdminEditday,
    meta: { role: ["ADMIN"] as string[] }, 
  },
  {
    path: "/admin/bookinglist",
    name: "adminbookinglist",
    component: AdminBookingList,
    meta: { role: ["ADMIN"] as string[] }, 
  },
];


const router = createRouter({
  history: createWebHistory("/"), //import.meta.env.BASE_URL
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
      `${import.meta.env.VITE_APP_IP}/login/refresh`,
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

  if (!isAuth && to.name !== "root" && to.name !== "queuelogin") {
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
