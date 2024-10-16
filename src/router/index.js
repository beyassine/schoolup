import { createRouter, createWebHistory } from 'vue-router'

//Views
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
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
      name: 'Profile',
      component: Profile,
      meta: {
        white: true,
        requiresAuth: false 
       },
    },
    {
      path: '/live/:userId',
      name: 'Profile',
      component: Profile,
      meta: {
        white: true,
        requiresAuth: false 
       },
    },
    {
      path: '/courses/:courseId',
      name: 'Course',
      component: Course
    },
    {
      path: '/admin/:userId',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/adminlive/:userId',
      name: 'AdminLive',
      component: AdminLive
    },
    {
      path: '/adminsubs',
      name: 'AdminSubs',
      component: AdminSubs
    },
    {
      path: '/admininfo',
      name: 'AdminInfo',
      component: AdminInfo
    },
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

  export default router