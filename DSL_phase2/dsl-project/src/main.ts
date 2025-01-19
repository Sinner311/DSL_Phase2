import './assets/main.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);


app.use(router);

app.use(vue3GoogleLogin, {
  clientId: '704076007653-bdub300njbks1rlhgdr7kvr5knttvaf2.apps.googleusercontent.com', // Google Client ID
});


app.mount('#app');
