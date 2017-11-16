<template lang="pug">
  .container-fluid
    nav.navbar.navbar-light.justify-content-around
      router-link(to='/' exact)
        a.d-none.d-sm-inline-block.mr-auto.navbar-brand(href="#")
          h1.text-primary.display-4 YS
      ul.navbar-nav.flex-row.px-2
        router-link(to='/showcase')
          li.nav-item
            el-button(type='primary' size='medium' plain)
              i.icon.ion-ios-keypad.mr-2
              span.text-uppercase Showcase
        router-link(to='/blog')
          li.nav-item
            el-button(type='primary' size='medium' plain)
              i.icon.ion-edit.mr-2
              span.text-uppercase Blog
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello from Test'
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  ul {
    li {
      .icon {

      }
    }
  }
}
</style>


