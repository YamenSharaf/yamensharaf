<template>
  <b-navbar toggleable="md" type="light" class="main-navbar p-4">
    <el-radio-group dir="ltr" class="d-none d-md-block position-absolute" style="left: 40%" size="medium" @change="handleLocaleChange" v-model="lang">
      <el-radio-button class="font-primary" label="en">
          EN
      </el-radio-button>
      <el-radio-button class="font-primary" label="ar">
          ع
      </el-radio-button>
    </el-radio-group>
    <b-container>
      <b-navbar-brand
        :to="{ name: 'Home' }"
        :style="font.title"
        class="h1 text-primary mb-0">
        {{ $t(`message.ys`) }}
      </b-navbar-brand>
      <el-radio-group dir="ltr" class="d-block d-md-none" size="medium" @change="handleLocaleChange" v-model="lang">
        <el-radio-button class="font-primary" label="en">
            EN
        </el-radio-button>
        <el-radio-button class="font-primary" label="ar">
            ع
        </el-radio-button>
      </el-radio-group>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto d-inline-flex flex-center">
          <b-nav-item href="mailto:yamensharaf@gmail.com">
            <el-button icon="el-icon-message">
              {{ $t(`message.contact`) }}
            </el-button>
          </b-nav-item>
          <b-nav-item href="https://cl.ly/okgs/download/Resume%20-%20Yamen%20Sharaf.pdf">
            <el-button icon="el-icon-download">
              {{ $t(`message.resume`) }}
            </el-button>
          </b-nav-item>
          <b-nav-item :to="{ name: 'Showcase' }">{{ $t(`message.showcase`) }}</b-nav-item>
          <b-nav-item :to="{ name: 'Blog' }"> {{ $t(`message.blog`) }} </b-nav-item>
          <b-nav-item-dropdown v-if="userStatus.loggedIn" :text="userStatus.email.split('@')[0]" right>
          <b-dropdown-item :to="{ name: 'Dashboard' }"> Dashboard </b-dropdown-item>
          <b-dropdown-item @click="handleLogOut"> Log out </b-dropdown-item>
        </b-nav-item-dropdown>
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
      lang: 'en'
    }
  },
  computed: {
    userStatus () {
      return this.$store.getters.getUserStatus
    },
    font () {
      return this.$store.getters.getFont
    }
  },
  methods: {
    handleLocaleChange (lang) {
      this.$bus.$emit('set locale', lang)
    },
    handleLogOut () {
      this.$store.dispatch('logUserOut')
        .then(() => {
          this.$router({ name: 'Home' })
        })
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

.main-navbar {
  .dropdown-menu {
    .active {
      color: $color-white !important;
    }

  }
  .el-radio-group {
    label {
      margin-bottom: 0;
    }
  }
}

</style>


