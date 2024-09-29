import { createRouter, createWebHistory } from 'vue-router'

//Views
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Player from '../views/Player.vue'
import Profile from '../views/Profile.vue'
import Course from '../views/Course.vue'
import Admin from '../views/Admin.vue'
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
      path: '/player',
      name: 'Player',
      component: Player
    },
    {
      path: '/profile/:userId',
      name: 'Profile',
      component: Profile,
      meta: {white: true },
    },
    {
      path: '/courses/:courseId',
      name: 'Course',
      component: Course
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
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
  
  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      if (!store.state.users.isAuthenticated) {
        next({
          name: 'login',
        })
      }
    }
    next()
  })
  
  export default router