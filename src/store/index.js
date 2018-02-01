import Vue from 'vue'
import Vuex from 'vuex'
import {app} from '../main'
import db from '../db'
import auth from '../db/auth'
import storage from '../db/storage'

Vue.use(Vuex)
const uuid = require('uuid/v1')
const blogPostsRef = db.collection('blogPosts')
const blogTagsRef = db.collection('blogTags').doc('tags')
const resumeRef = storage.ref().child('Resume - Yamen Sharaf.pdf')

const store = new Vuex.Store({
  state: {
    lang: 'en',
    resumeUrl: 'https://cl.ly/okgs/download/Resume%20-%20Yamen%20Sharaf.pdf',
    userStatus: {
      loggedIn: false,
      uid: '',
      email: ''
    },
    blogPosts: [
      undefined
    ],
    disqusConfig: {
      shortname: `yamensharaf`
    },
    devIcons: [
      {
        title: `JavaScript`,
        icon: `devicon-javascript-plain`
      },
      {
        title: `Vue.js`,
        icon: `devicon-vuejs-plain`
      },
      {
        title: `React.js`,
        icon: `devicon-react-original`
      },
      {
        title: `Bootstrap`,
        icon: `devicon-bootstrap-plain`
      },
      {
        title: `Sass`,
        icon: `devicon-sass-original`
      },
      {
        title: `Webpack`,
        icon: `devicon-webpack-plain`
      },
      {
        title: `Mocha`,
        icon: `devicon-mocha-plain`
      },
      {
        title: `Gulp`,
        icon: `devicon-gulp-plain`
      },
      {
        title: `Foundation for email`,
        icon: `devicon-foundation-plain`
      },
      {
        title: `HTML`,
        icon: `devicon-html5-plain`
      },
      {
        title: `Git`,
        icon: `devicon-git-plain`
      },
      {
        title: `Node.js`,
        icon: `devicon-nodejs-plain`
      },
      {
        title: `Photoshop`,
        icon: `devicon-photoshop-plain`
      },
      {
        title: `Visual Studio Code`,
        icon: `devicon-visualstudio-plain`
      },
      {
        title: `Heroku App`,
        icon: `devicon-heroku-original`
      },
      {
        title: `Babel`,
        icon: `devicon-babel-plain`
      },
      {
        title: `Express.js`,
        icon: `devicon-express-original`
      },
      {
        title: `Trello`,
        icon: `devicon-trello-plain`
      },
      {
        title: `Slack`,
        icon: `devicon-slack-plain`
      }
    ],
    yamenDescription: [
      {
        icon: `devicon-javascript-plain`,
        text: `jsStatement`
      },
      {
        icon: `devicon-sass-original`,
        text: `cssStatement`
      },
      {
        icon: `devicon-webpack-plain`,
        text: `toolingStatement`
      }
    ],
    socialIcons: [
      {
        title: `View my GitHub page`,
        icon: `mdi mdi-github-box`,
        url: `https://github.com/YamenSharaf`
      },
      {
        title: `View my LinkedIn Profile`,
        icon: `mdi mdi-linkedin-box`,
        url: `https://www.linkedin.com/in/yamensharaf/`
      },
      {
        title: `Visit my Facebook profile`,
        icon: `mdi mdi-facebook-box`,
        url: `https://www.facebook.com/YamenSharaf`
      },
      {
        title: `Visit my Twitter account`,
        icon: `mdi mdi-twitter-box`,
        url: `https://twitter.com/YamenSharaf`
      },
      {
        title: `Contact me on WhatsApp`,
        icon: `mdi mdi-whatsapp`,
        url: `https://api.whatsapp.com/send?phone=201111046486&text=Hi%20I%27m%20coming%20from%20the%20web`
      },
      {
        title: `Message me on Facebook Messenger`,
        icon: `mdi mdi-facebook-messenger`,
        url: `https://m.me/YamenSharaf`
      },
      {
        title: `Call me on the phone`,
        icon: `mdi mdi-phone`,
        url: `tel:+20-111-104-6486`
      }
    ]
  },
  getters: {
    getLocale () {
      return app.$i18n.locale
    },
    getResumeUrl (state) {
      return state.resumeUrl
    },
    getLang (state) {
      return state.lang
    },
    getFont (state) {
      if (state.lang === 'en') {
        return {
          primary: {
            fontFamily: 'Lato'
          },
          title: {
            fontFamily: 'Poppins'
          }
        }
      } else {
        return {
          primary: {
            fontFamily: 'Amiri',
            fontSize: '1.2rem'
          },
          title: {
            fontFamily: 'Amiri',
            fontSize: '2rem'
          }
        }
      }
    },
    getUserStatus (state) {
      return state.userStatus
    },
    getUserUid (state) {
      return state.userStatus.uid
    },
    getBlogPosts (state) {
      return state.blogPosts
    },
    getBlogPost: (state) => (id) => {
      return state.blogPosts.filter((post) => post.id === id)[0]
    },
    getDisqusConfig (state) {
      return state.disqusConfig
    },
    getDevIcons (state) {
      return state.devIcons
    },
    getYamenDesc (state) {
      return state.yamenDescription
    },
    getSocialIcons (state) {
      return state.socialIcons
    }
  },
  actions: {
    logUserIn ({commit}, payload) {
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
    },
    getBlogPosts ({commit}) {
      blogPostsRef.orderBy('date', 'desc')
        .onSnapshot((snapshot) => {
          commit('resetBlogPosts')
          snapshot.forEach((doc) => {
            let data = doc.data()
            let id = doc.id
            let post = { ...data, id }
            commit('setBlogPosts', post)
          })
        })
    },
    fetchBlogPosts ({commit}) {
      return blogPostsRef.orderBy('date', 'desc').get()
    },
    async fetchBlogTags ({commit}) {
      const rootTags = await blogTagsRef.get()
      const tags = rootTags.data().tags
      return tags
    },
    updateBlogTags ({commit}, payload) {
      const newTags = payload
      return blogTagsRef.set({
        tags: newTags
      })
    },
    fetchBlogPost ({commit}, payload) {
      return blogPostsRef.doc(payload).get()
    },
    postNewBlog ({commit}, payload) {
      return blogPostsRef.add(payload)
    },
    editExistingBlog ({commit}, payload) {
      let id = payload.id
      let formData = payload.form
      return blogPostsRef.doc(id).set(formData)
    },
    deleteBlogPost ({commit}, payload) {
      return blogPostsRef.doc(payload).delete()
    },
    assignName ({commit, state}, payload) {
      return db.collection(`users/${state.userStatus.uid}/nameData`).doc('names').set({
        name: payload.name
      })
    },
    uploadImage ({commit}, payload) {
      return storage.ref().child(uuid()).put(payload)
    },
    uploadResume ({commit}, payload) {
      return resumeRef.put(payload)
    },
    fetchResumeUrl ({commit}) {
      resumeRef.getDownloadURL()
        .then(fileUrl => {
          commit('setResumeUrl', fileUrl)
        })
        .catch(err => {
          console.log(`Error: ${err} `)
        })
    }
  },
  mutations: {
    setLocale (state, payload) {
      app.$i18n.locale = payload
      state.lang = payload
    },
    setResumeUrl (state, payload) {
      state.resumeUrl = payload
    },
    setUserStatus (state, payload) {
      state.userStatus = {...state.userStatus, ...payload}
    },
    setBlogPosts (state, payload) {
      state.blogPosts.push(payload)
    },
    resetBlogPosts (state) {
      state.blogPosts = []
    }
  }
})

export default store
