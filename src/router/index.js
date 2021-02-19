import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RoomView from '@/views/RoomView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/rooms/:id',
    name: 'Room',
    props: true,
    component: RoomView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
