import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '../assets/styles/theme.css'
import store from "./store";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';


createApp(App).use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions).use(store).mount('#app')
