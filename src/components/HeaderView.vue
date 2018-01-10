<template>
  <b-navbar toggleable="md" type="light" class="p-4">
    <b-container>
      <b-navbar-brand :to="{ name: 'Home' }" class="font-title h1 text-primary mb-0">Yamen Sharaf</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto d-inline-flex flex-center">
          <b-nav-item href="mailto:yamensharaf@gmail.com">
            <el-button icon="el-icon-message">
              Contact
            </el-button>
          </b-nav-item>
          <b-nav-item href="https://cl.ly/okgs/download/Resume%20-%20Yamen%20Sharaf.pdf">
            <el-button icon="el-icon-download">
              Résumé
            </el-button>
          </b-nav-item>
          <b-nav-item :to="{ name: 'Showcase' }">Showcase</b-nav-item>
          <b-nav-item :to="{ name: 'Blog' }">Blog</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    </b-container>
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

<style lang="scss">

@import '~sass';

.router-link-active, .active {
  color: $color-primary !important;
}

#nav_collapse {
  display: inline-grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.navbar {
  ul {
    li {
      .icon {

      }
    }
  }
}
</style>


