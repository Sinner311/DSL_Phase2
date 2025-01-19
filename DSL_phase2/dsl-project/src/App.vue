<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>



<!-- <script setup>
import LoginView from './view/LoginView.vue';
import HomeView from './view/HomeView.vue';
import AppointmentRound from './view/AppointmentRound.vue';
import DateSlot from './view/DateSlot.vue';
import UserAppointment from './view/UserAppointment.vue';
import QueueUpView from './view/QueueUpView.vue';
import UserQueue from './view/UserQueue.vue';
import Review from './view/Review.vue';
import Mainstaff from './staff/Mainstaff.vue';
import StaffCallQueue from './staff/StaffCallQueue.vue';
import TVshow from './staff/TVshow.vue';
import Daysetting from './staff/Daysetting.vue';
import EditDayRepairdoc from './staff/EditDayRepairdoc.vue';
import EditdaysendDoc1 from './staff/EditdaysendDoc1.vue';
import Mainaddmin from './admin/Mainaddmin.vue';
import Addstaff from './admin/Addstaff.vue';




</script>

<template>

<LoginView/>

</template> -->
