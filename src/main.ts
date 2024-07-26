import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'virtual:svg-icons-register';
import 'normalize.css';
import 'virtual:uno.css';
import 'animate.css';
import router from '@/router';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import { Ion } from 'cesium';

dayjs.locale('zh-cn');

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;

createApp(App).use(router).mount('#app');
