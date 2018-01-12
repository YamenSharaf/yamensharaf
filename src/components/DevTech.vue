<template>
  <div dir="ltr">
    <slick
      ref="slick"
      :options="slickOptions">
      <h1
        v-for="(icon, index) in devIcons"
        :key="index"
        class="display-4 text-primary font-title text-center">
        <el-tooltip
          effect="dark"
          placement="top"
          :content="icon.title">
          <i :class="icon.icon"/>
        </el-tooltip>
      </h1>
    </slick>
  </div>
</template>

<script>
import Slick from 'vue-slick'

export default {
  components: {
    'slick': Slick
  },
  data () {
    return {
      slickOptions: {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    }
  },
  computed: {
    devIcons () {
      return this.$store.getters.getDevIcons
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~slick-carousel/slick/slick.css';
@import '~slick-carousel/slick//slick-theme.css';
</style>
