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

dayjs.locale('zh-cn');

createApp(App).use(router).mount('#app');
