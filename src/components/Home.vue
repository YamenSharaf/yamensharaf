<template>
<div class="page-wrapper">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 d-flex flex-center page-wrapper">
        <transition name="fadeUp" appear>
          <el-card class="w-100 d-flex align-items-center">
            <div class="row align-items-center">
              <div class="col-12 col-md-8 order-2 order-md-1">
                <el-carousel :interval="6000" indicator-position="none" class="h-100">
                  <el-carousel-item class="d-flex flex-column flex-center">
                    <h1 class="text-primary font-title text-center">
                      Yamen Sharaf
                    </h1>
                    <h5 class="text-muted text-center">
                      A modern front-end engineer
                    </h5>
                  </el-carousel-item>
                  <el-carousel-item class="d-flex flex-column flex-center">
                    <h1 class="display-4 text-primary font-title text-center">
                      <i class="devicon-javascript-plain"></i>
                    </h1>
                    <h5 class="text-muted text-center">
                      I write modern JavaScript apps leveraging modern frameworks such as Vue.js and React.js to build single page applications that are robust and fast with central state management
                    </h5>
                  </el-carousel-item>
                  <el-carousel-item class="d-flex flex-column flex-center">
                    <h1 class="display-4 text-primary font-title text-center">
                      <i class="devicon-sass-original"></i>
                    </h1>
                    <h5 class="text-muted text-center">
                      I write modular CSS using the latest specs either manually with Flexbox and CSS Grid or with the help of a framework like Bootstrap or Bulma. I can scope my styles to keep them contained with the BEM methodology
                    </h5>
                  </el-carousel-item>
                  <el-carousel-item class="d-flex flex-column flex-center">
                    <h1 class="display-4 text-primary font-title text-center">
                      <i class="devicon-webpack-plain"></i>
                    </h1>
                    <h5 class="text-muted text-center">
                      I use a modern tooling system with bundlers like Webpack with plugins such as Babel and PostCSS to code with the latest specs without sacrificing targeted users
                    </h5>
                  </el-carousel-item>
                </el-carousel>

              </div>
              <div class="col-12 col-md-4 order-1 order-md-2">
                <img class="img-fluid" src="../assets/img/yamen.jpg" alt="Yamen Sharaf">
              </div>
            </div>
          </el-card>

        </transition>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    'carousel': Carousel,
    'slide': Slide
  },
  data () {
    return {
      msg: 'Home'
    }
  }
}
</script>
