<template>
  <div>
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
