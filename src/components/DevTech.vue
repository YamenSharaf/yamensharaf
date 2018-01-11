<template>
  <carousel :pagination-enabled="false" :per-page-custom="[[768, 5], [1024, 6]]" autoplay class="mb-5">
    <slide v-for="(icon, index) in devIcons" :key="index">
      <el-tooltip effect="dark" :content="icon.title" placement="top">
        <h1 class="display-4 text-primary font-title text-center">
          <i :class="icon.icon"></i>
        </h1>
      </el-tooltip>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  components: {
    'carousel': Carousel,
    'slide': Slide
  },
  computed: {
    devIcons () {
      return this.$store.getters.getDevIcons
    }
  }
}
</script>
