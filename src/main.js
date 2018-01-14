// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import BootstrapVue from 'bootstrap-vue'
import '@/sass/app.scss'
import messages from './i18n'
import wysiwyg from 'vue-wysiwyg'
import locale from 'element-ui/lib/locale/lang/en'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // Global event bus

Vue.use(ElementUI, {locale})
Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(wysiwyg, {})

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

new Vue({ i18n }).$mount('#app')

export const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
