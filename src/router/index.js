import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ScannerPage from '@/views/ScannerPage.vue';
import TukarPoint from '@/views/TukarPoint.vue';
import Riwayat from '@/views/Riwayat.vue';
import AdminPage from '@/views/AdminPage.vue';
import store from '@/store';

const routes = [
  {
    name: 'home',
    path: '/', // example.com/
    component: Home,
  },
  {
    name: 'tukar-point',
    path: '/tukar-point',
    component: TukarPoint,
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   name: 'riwayat',
  //   path: '/riwayat',
  //   component: Riwayat,
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  {
    name: 'scanner-page',
    path: '/scanner-page',
    component: ScannerPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'admin-page',
    path: '/admin-page',
    component: AdminPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'riwayat',
    // alias: '/manage',
    path: '/riwayat',
    meta: {
      requiresAuth: true,
    },
    component: Riwayat,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-blue-600',
});

router.beforeEach((to, from, next) => {
  // console.log(to.matched);

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
