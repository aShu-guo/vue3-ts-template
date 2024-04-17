import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'virtual:svg-icons-register';
import 'normalize.css';
import 'virtual:uno.css';
import 'animate.css';
import router from '@/router';

createApp(App).use(router).mount('#app');
