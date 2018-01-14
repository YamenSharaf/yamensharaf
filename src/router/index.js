import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
import Home from '@/components/Home'
import Showcase from '@/components/Showcase'
import Error404 from '@/components/404'
import Blog from '@/components/Blog'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: '404',
      component: Error404
    },
    {
      path: '/showcase',
      name: 'Showcase',
      component: Showcase
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    }
  ]
})
