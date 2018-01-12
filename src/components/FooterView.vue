<template>
  <footer class="footer">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-5 text-info">
          &reg; {{currentYear}} All rights reserved to Yamen Sharaf
        </div>
        <div class="col-md-4 d-flex align-center justify-content-around">
          <a
            v-for="(icon, index) in socialIcons"
            :key="index"
            :href="icon.url"
            target="_blank"
            rel="nonopener"
            class="h7 text-info">
              <el-tooltip
                effect="dark"
                placement="top"
                :content="icon.title">
                <i :class="icon.icon" aria-hidden="true"></i>
              </el-tooltip>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear () {
      let date = new Date()
      return date.getFullYear()
    },
    socialIcons () {
      return this.$store.getters.getSocialIcons
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

