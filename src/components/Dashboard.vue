<template>
<div class="container">
  <div class="row">
    <div class="col-md-12 page-wrapper d-flex flex-center">
        <h1 class="display-4 text-primary text-center">
          Welcome back, {{ user.email }}
        </h1>
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
