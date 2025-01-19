import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../view/LoginView.vue";
import HomeView from "../user/HomeView.vue";
import AppointmentRound from "../user/AppointmentRound.vue";
import DateSlot from "../user/DateSlot.vue";
import UserAppointment from "../user/UserAppointment.vue";
import QueueUpView from "../user/QueueUpView.vue";
import UserQueue from "../user/UserQueue.vue";
import Review from "../user/Review.vue";
import Mainstaff from "../staff/Mainstaff.vue";
import StaffCallQueue from "../staff/StaffCallQueue.vue";
import TVshow from "../staff/TVshow.vue";
import Daysetting from "../staff/Daysetting.vue";
import EditDayRepairdoc from "../staff/EditDayRepairdoc.vue";
import EditdaysendDoc1 from "../staff/EditdaysendDoc1.vue";
import Mainaddmin from "../admin/Mainaddmin.vue";
import Addstaff from "../admin/Addstaff.vue";

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
  },
  {
    path: "/user/appointment",
    name: "userappointment",
    component: AppointmentRound,
  },
  {
    path: "/user/appointment/selectdate",
    name: "userselectdate",
    component: DateSlot,
  },
  {
    path: "/user/myappointment",
    name: "usermyappointment",
    component: UserAppointment,
  },
  //User จองคิว
  { path: "/user/queue", name: "userqueue", component: QueueUpView },
  {
    path: "/user/queue/myqueue",
    name: "usermyqueue",
    component: UserQueue,
  },
  {
    path: "/user/queue/statisfaction",
    name: "userstatisfaction",
    component: Review,
  },
  {
    path: "/admin",
    name: "admin",
    component: Mainaddmin,
  },
  {
    path: "/admin/addstaff",
    name: "adminaddstaff",
    component: Addstaff,
  },
  {
    path: "/staff",
    name: "staff",
    component: Mainstaff,
  },
  {
    path: "/staff/callqueue",
    name: "staffcallqueue",
    component: StaffCallQueue,
  },
  {
    path: "/staff/daysetting",
    name: "staffdaysetting",
    component: Daysetting,
  },
  {
    path: "/staff/daysetting/editdocamendmentday",
    name: "staffeditdocamendmentday",
    component: EditDayRepairdoc,
  },
  {
    path: "/staff/daysetting/editday",
    name: "staffeditday",
    component: EditdaysendDoc1,
  },
  {
    path: "/staff/dashboard",
    name: "staffdashboard",
    component: TVshow,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// function parseJwt(token: string) {
//   var base64Url = token.split(".")[1];
//   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   var jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );
//   return JSON.parse(jsonPayload);
// }
// async function refeshToken(refresh: string) {
//   try {
//     const res = await axios.post(
//       `${process.env.VUE_APP_IP}/login/refresh`,
//       null,
//       {
//         headers: {
//           Authorization: `Bearer ${refresh}`,
//         },
//       }
//     );
//     if (res.status !== 200) {
//       throw Error(res.statusText);
//     }
//     const token = res.data;
//     cookies.remove("accesstoken");
//     cookies.remove("refreshtoken");

//     cookies.set("accesstoken", token.access_token);
//     cookies.set("refreshtoken", token.refresh_token);
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function isAuthenticated() {
//   // ! get token from cookies
//   const accesstoken = cookies.get("accesstoken");
//   const refreshtoken = cookies.get("refreshtoken");

//   // console.log("accesstoken: ", accesstoken);
//   // ! check if cookies haven't accesstoken
//   if (
//     accesstoken === undefined ||
//     accesstoken === null ||
//     refeshToken === undefined ||
//     refeshToken === null
//   ) {
//     // console.log("test");
//     return false;
//   }
//   // ! parseJwt from cookies
//   const jwtPayload = parseJwt(accesstoken);
//   // console.log(jwtPayload.exp, ` Time :  ${Date.now() / 1000}`);
//   // ! check accesstoken is expired
//   if (jwtPayload.exp < Date.now() / 1000) {
//     // token expired
//     console.log("expried");
//     // console.log(refreshtoken);
//     await refeshToken(refreshtoken);
//     return false;
//   }

//   return true;
// }

// async function getMystudentID(email: string) {
//   try {
//     const res = await axios.get(
//       `${process.env.VUE_APP_IP}/users/getSpecificuser?email=${email}`
//     );
//     if (res.status !== 200) {
//       throw Error(res.statusText);
//     }
//     if (res.data === null) {
//       throw Error("No Student id");
//     }
//     return res.data.studentid;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function isReserve() {
//   const accesstoken = cookies.get("accesstoken");
//   const access_token_extract = parseJwt(accesstoken);
//   const studentid = await getMystudentID(access_token_extract.email);
//   try {
//     const userqueue = await axios.get(
//       `${process.env.VUE_APP_IP}/queue/getQueueSpecific?studentID=${studentid}`
//     );
//     if (userqueue.status !== 200) {
//       throw Error(userqueue.statusText);
//     }

//     // console.log(userqueue.data);

//     if (
//       userqueue.data === null ||
//       userqueue.data === undefined ||
//       userqueue.data.length < 1
//     ) {
//       return false;
//     }

//     return true;
//   } catch (error) {
//     console.error(error);
//   }
// }

// function isRole(role: string) {
//   const accesstoken = cookies.get("accesstoken");
//   const access_token_extract = parseJwt(accesstoken);
//   console.log(access_token_extract.role);
//   if (access_token_extract.role === role) {
//     return true;
//   }
//   return false;
// }

// router.beforeEach(async (to, from, next) => {
//   console.log("isAuthen", await isAuthenticated());
//   const isAuth = await isAuthenticated();
//   // ! check if path isn't "/" and authenticated
//   if (to.name !== "root" && isAuth === false) {
//     console.log("unauthenticated");
//     // ! redirect to "/"
//     next({ name: "root" });
//   } else if (isAuth) {
//     console.log("authenticated");
//     // isRole("ADMIN");

//     const accesstoken = cookies.get("accesstoken");
//     const access_token_extract = parseJwt(accesstoken);
//     console.log(access_token_extract.role);

//     if (
//       to.name === "admin" ||
//       (to.name === "adminhome" && access_token_extract.role !== "ADMIN")
//     ) {
//       console.log("you aren't admin");
//       cookies.remove("accesstoken");
//       cookies.remove("refreshtoken");
//       console.log("GET OUT!");
//       next({ name: "root" });
//     } else if (
//       to.name === "monitor" &&
//       access_token_extract.role !== "TEACHER"
//     ) {
//       if (access_token_extract.role === "ADMIN") {
//         return;
//       }
//       console.log("you aren't monitor");
//       next({ name: "root" });
//     } else if (
//       (await isReserve()) === true &&
//       to.name !== "studentmain" &&
//       to.name !== "studentstatisfaction"
//     ) {
//       console.log("you reserved");
//       next({ name: "studentmain" });
//     } else if (to.name === "studentmain" && (await isReserve()) === false) {
//       console.log("you aren't reserve");
//       next({ name: "student" });
//     } else if (
//       to.name === "studentstatisfaction" &&
//       (await isReserve()) === false
//     ) {
//       console.log("you aren't reserve");
//       next({ name: "student" });
//     }
//   }
//   console.log("unauthenticated");
//   next();
// });

// export default router;
