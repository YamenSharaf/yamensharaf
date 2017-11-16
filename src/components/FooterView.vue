<template>
  <footer class="footer">
    <div class="container">
      <span class="text-muted"> &reg; {{currentYear}} All rights reserved to Yamen </span>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear () {
      let date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
</style>

