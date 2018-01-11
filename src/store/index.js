import Vue from 'vue'
import Vuex from 'vuex'
import db from '../db'
import auth from '../db/auth'

Vue.use(Vuex)

const blogPostsRef = db.collection('blogPosts')

const store = new Vuex.Store({
  state: {
    userStatus: {
      loggedIn: false,
      uid: '',
      email: ''
    }
  },
  getters: {
    getUserStatus (state) {
      console.log(blogPostsRef)
      return state.userStatus
    }
  },
  actions: {
    logUserIn ({commit}, payload) {
      console.log('will do')
      return auth.signInWithEmailAndPassword(
        payload.email,
        payload.password)
    },
    logUserOut () {
      return auth.signOut()
    },
    monitorUserStatus ({commit}) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User signed in
          commit('setUserStatus', {loggedIn: true, uid: user.uid, email: user.email})
        } else {
          // User signed out
          commit('setUserStatus', { loggedIn: false, uid: '', email: '' })
        }
      })
    }
  },
  mutations: {
    setUserStatus (state, payload) {
      state.userStatus = {...state.userStatus, ...payload}
    }
  }
})

export default store
