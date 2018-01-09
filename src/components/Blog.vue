<template lang="pug">
  .container
    h1.display-4 {{msg}}
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
