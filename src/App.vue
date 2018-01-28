<template>
  <div
    :dir=" lang === 'ar' ? 'rtl' : 'ltr' "
    :style="font.primary"
    class="position-relative page-wrapper h-100">
    <header-view/>
      <transition
        name="fade"
        mode="out-in"
        duration="250">
        <router-view/>
      </transition>
    <footer-view/>
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView'
import FooterView from '@/components/FooterView'
export default {
  name: 'app',
  components: {
    HeaderView,
    FooterView
  },
  data () {
    return {
      lang: `en`
    }
  },
  computed: {
    locale: {
      get () {
        return this.$store.getters.getLocale
      },
      set (lang) {
        this.$store.commit('setLocale', lang)
        this.lang = lang
      }
    },
    font () {
      return this.$store.getters.getFont
    }
  },
  methods: {
    getResumeUrl () {
      this.$store.dispatch('fetchResumeUrl')
    },
    monitorUserStatus () {
      this.$store.dispatch('monitorUserStatus')
    },
    getLatestPosts () {
      this.$store.dispatch('getBlogPosts')
    },
    listenForLocaleChange () {
      this.$bus.$on('set locale', (lang) => {
        this.locale = lang
      })
    }
  },
  mounted () {
    this.listenForLocaleChange()
    this.monitorUserStatus()
    this.getLatestPosts()
    this.getResumeUrl()
  }
}
</script>

<style lang="scss">

@import '~sass';

main {
  /* min-height: 75vh; */
  text-align: center;
  margin-top: 40px;
}

.router-link-exact-active {
  // border: 3px solid red;
}
</style>
