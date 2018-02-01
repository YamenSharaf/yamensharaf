import { Message } from 'element-ui'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Essential routes
import Home from '@/components/Home'
import Error404 from '@/components/404'
import Blog from '@/components/Blog'
import Topic from '@/components/Topic'
import ViewPost from '@/components/ViewPost'
import Showcase from '@/components/Showcase'

// Admin area
const Login = r => require.ensure([], () => r(require('@/components/Login')), 'admin')
const WriteBlog = r => require.ensure([], () => r(require('@/components/WriteBlog')), 'admin')
const Dashboard = r => require.ensure([], () => r(require('@/components/Dashboard')), 'admin')

Vue.use(Router)

export const router = new Router({
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
      meta: { title: `Page not found` },
      component: Error404
    },
    {
      path: '/showcase',
      name: 'Showcase',
      meta: { title: `Showcase` },
      component: Showcase
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: `Login` },
      component: Login,
      beforeEnter (to, from, next) {
        if (!store.state.userStatus.loggedIn) {
          next()
        } else {
          Message({
            message: `You're already logged in`,
            type: 'error'
          })
          next({ name: 'Login' })
        }
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: { title: `Dashboard` },
      component: Dashboard,
      beforeEnter (to, from, next) {
        if (store.state.userStatus.loggedIn) {
          next()
        } else {
          Message({
            message: `Please log in to access the dashboard`,
            type: 'error'
          })
          next({ name: 'Login' })
        }
      }
    },
    {
      path: '/post/new',
      name: 'WriteBlog',
      meta: { title: `Write new blog post` },
      component: WriteBlog
    },
    {
      path: '/post/edit',
      name: 'EditBlog',
      meta: { title: `Edit blog post` },
      component: WriteBlog
    },
    {
      path: '/post/view/:postId',
      name: 'ViewPost',
      meta: { title: `Blog` },
      component: ViewPost
    },
    {
      path: '/topic/:tag',
      name: 'ViewTopic',
      meta: { title: `View topic` },
      component: Topic
    },
    {
      path: '/blog',
      name: 'Blog',
      meta: { title: `Blog` },
      component: Blog
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Change title based on meta.title property
  if (to.meta.title) {
    document.title = `${to.meta.title} | Yamen Sharaf - Frontend engineer`
  } else {
    document.title = `Yamen Sharaf - Frontend engineer`
  }
  next()
})

export default router
