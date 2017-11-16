<template>
  <div id="app">
    <header>
        <header-view></header-view>
    </header>
    <main>
      <div class="container">
        <img src="./assets/logo.png" alt="Vue.js PWA">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </main>
    <footer-view></footer-view>
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
  }
}
</script>

<style lang="scss">

main {
  /* min-height: 75vh; */
  text-align: center;
  margin-top: 40px;
}

.router-link-exact-active {
  // border: 3px solid red;
}
</style>
