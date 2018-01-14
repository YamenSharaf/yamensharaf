<template>
<div class="container">
  <div class="row page-wrapper">
    <div class="col-md-12 d-flex flex-center">
        <router-link :to="{ name: 'WriteBlog' }" >
          <el-button>
            Add a blog post
          </el-button>
        </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Showcase Component'
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUserStatus
    }
  }
}
</script>
