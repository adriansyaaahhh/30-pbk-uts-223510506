// main.js
import { createApp } from 'vue';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import { createPinia } from 'pinia'; // Impor Pinia
import App from './App.vue';
import router from './router/index.js'; // Pastikan menggunakan router yang diimpor

const myApp = createApp(App);
const pinia = createPinia(); // Buat instance Pinia

myApp.use(Quasar, {
  plugins: {},
});

myApp.use(router); // Gunakan router yang diimpor
myApp.use(pinia); // Gunakan Pinia
myApp.mount('#app');
