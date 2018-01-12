<template>
<div class="container">
  <div class="row">
    <div class="col-md-12 page-wrapper d-flex flex-center">
        <h1 class="display-4 text-primary text-center">
          {{ $t(`message.comingSoon`) }}
        </h1>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Blog Component'
    }
  }
}
</script>
