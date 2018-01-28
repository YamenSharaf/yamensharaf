import { Message } from 'element-ui'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Essential routes
import Home from '@/components/Home'
import Error404 from '@/components/404'
import Blog from '@/components/Blog'
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
      component: WriteBlog
    },
    {
      path: '/post/edit',
      name: 'EditBlog',
      component: WriteBlog
    },
    {
      path: '/post/view/:postId',
      name: 'ViewPost',
      component: ViewPost
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('User Status', store.state.userStatus.loggedIn)
  next()
})

export default router
