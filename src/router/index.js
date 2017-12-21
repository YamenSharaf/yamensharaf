import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Showcase from '@/components/Showcase'
import Blog from '@/components/Blog'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
