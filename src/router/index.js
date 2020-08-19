import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/cesium',
    name: 'cesium',
    component: () => import('../views/cesium')
  },
  {
    path: '/',
    name: 'webgl',
    component: () => import('../views/webgl')
  }
];

const router = new VueRouter({
  routes
});

export default router;
