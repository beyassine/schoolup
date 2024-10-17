import { createRouter, createWebHistory } from 'vue-router'

//Views
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Live from '../views/Live.vue'
import Course from '../views/Course.vue'
import Admin from '../views/Admin.vue'
import AdminLive from '../views/AdminLive.vue'
import AdminSubs from '../views/AdminSubs.vue'
import AdminInfo from '../views/AdminInfo.vue'


const routes = [
    {
      path: '',
      name: 'home',
      component: Home,
      meta: {white: true },

    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: Profile,
      meta: {
        white: true,
        requiresAuth: false 
       },
    },
    {
      path: '/live/:userId',
      name: 'live',
      component: Live,
      meta: {
        white: true,
        requiresAuth: false 
       },
    },
    {
      path: '/courses/:courseId',
      name: 'course',
      component: Course
    },
    {
      path: '/admin/:userId',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        sidebar:true
       },
    },
    {
      path: '/adminlive/:userId',
      name: 'adminLive',
      component: AdminLive
    },
    {
      path: '/adminsubs/:userId',
      name: 'adminSubs',
      component: AdminSubs
    },
    {
      path: '/admininfo/:userId',
      name: 'adminInfo',
      component: AdminInfo
    },
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

  export default router