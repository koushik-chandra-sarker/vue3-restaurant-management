import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/components/Login/Login";
import Home from "@/components/Home/Home";
import Signup from "@/components/Signup/Signup";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
