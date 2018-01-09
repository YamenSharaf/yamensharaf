<template>
  <b-navbar toggleable="md" type="light" class="p-4">


    <b-navbar-brand class="font-title h1 text-primary mb-0">Yamen Sharaf</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'Showcase' }">Showcase</b-nav-item>
        <b-nav-item :to="{ name: 'Blog' }">Blog</b-nav-item>

      </b-navbar-nav>

    </b-collapse>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  </b-navbar>
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


