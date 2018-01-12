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
        title: `HTML5`,
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
        text: `I write modern JavaScript apps leveraging modern frameworks such as Vue.js and React.js to build single page applications that are robust and fast with central state management`
      },
      {
        icon: `devicon-sass-original`,
        text: `I write modular CSS using the latest specs either manually with Flexbox and CSS Grid or with the help of a framework like Bootstrap or Bulma. I can scope my styles to keep them contained with the BEM methodology`
      },
      {
        icon: `devicon-webpack-plain`,
        text: `I use a modern tooling system with bundlers like Webpack with plugins such as Babel and PostCSS to code with the latest specs without sacrificing targeted users`
      }
    ],
    socialIcons: [
      {
        site: `GitHub`,
        icon: `mdi mdi-github-box`,
        url: `https://github.com/YamenSharaf`
      },
      {
        site: `LinkedIn`,
        icon: `mdi mdi-linkedin-box`,
        url: `https://www.linkedin.com/in/yamensharaf/`
      },
      {
        site: `Facebook`,
        icon: `mdi mdi-facebook-box`,
        url: `https://www.facebook.com/YamenSharaf`
      },
      {
        site: `Twitter`,
        icon: `mdi mdi-twitter-box`,
        url: `https://twitter.com/YamenSharaf`
      },
      {
        site: `WhatsApp`,
        icon: `mdi mdi-whatsapp`,
        url: `https://api.whatsapp.com/send?phone=201111046486&text=Hi%20I%27m%20coming%20from%20the%20web`
      },
      {
        site: `Messenger`,
        icon: `mdi mdi-facebook-messenger`,
        url: `https://m.me/YamenSharaf`
      },
      {
        site: `Phone`,
        icon: `mdi mdi-phone`,
        url: `tel:+20-111-104-6486`
      }
    ]
  },
  getters: {
    getUserStatus (state) {
      console.log(blogPostsRef)
      return state.userStatus
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
