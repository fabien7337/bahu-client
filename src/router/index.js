import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Room from '@/views/Room.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/rooms/:id',
    name: 'Room',
    props: true,
    component: Room,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
