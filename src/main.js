// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/sass/app.scss'
import locale from 'element-ui/lib/locale/lang/en'
import ProgressiveImage from 'progressive-image/dist/vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'progressive-image/dist/index.css'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // Global event bus

Vue.use(ElementUI, {locale})
Vue.use(BootstrapVue)
Vue.use(ProgressiveImage, {
  removePreview: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
