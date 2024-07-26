import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/screen/index.vue'),
    },
    {
      path: '/worker1',
      component: () => import('@/pages/worker/index.vue'),
    },
    {
      path: '/worker2',
      component: () => import('@/pages/worker/index2.vue'),
    },
  ],
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
