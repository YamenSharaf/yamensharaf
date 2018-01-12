<template>
  <el-card class="w-100 d-flex align-items-center mb-5 yamen-card">
    <div class="row align-items-center">
      <div class="col-12 col-md-8 order-2 order-md-1">
        <el-carousel :interval="6000" indicator-position="none" class="h-100">
          <el-carousel-item class="d-flex flex-column flex-center">
            <h1 :style="font.title" class="text-primary text-center">
              {{ $t("message.ys") }}
            </h1>
            <h5 class="text-muted text-center">
              {{ $t('message.tagline') }}
            </h5>
          </el-carousel-item>
          <el-carousel-item v-for="(desc, index) in yamenDesc" :key="index" class="d-flex flex-column flex-center">
            <h1 class="display-4 text-primary font-title text-center">
              <i :class="desc.icon"></i>
            </h1>
            <h5 class="text-muted text-center">
              {{ $t(`message.${desc.text}`) }}
            </h5>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="col-12 col-md-4 order-1 order-md-2">
        <el-tooltip
          effect="dark"
          placement="top"
          :open-delay="500"
          :content="$t(`message.meComment`)">
          <img
            class="img-fluid img-dimmed"
            src="../assets/img/yamen.jpg"
            title="Yamen Sharaf"
            alt="Yamen Sharaf">
        </el-tooltip>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  computed: {
    yamenDesc () {
      return this.$store.getters.getYamenDesc
    },
    font () {
      return this.$store.getters.getFont
    }
  }
}
</script>

<style lang="scss">
.yamen-card {
  .el-card {
    &__body {
      width: 100%;
    }
  }
}
</style>
