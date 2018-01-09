import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Showcase from '@/components/Showcase'
import Blog from '@/components/Blog'
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
      path: '/showcase',
      name: 'Showcase',
      component: Showcase
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    }
  ]
})
