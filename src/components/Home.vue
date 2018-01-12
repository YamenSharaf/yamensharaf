<template>
<div class="page-wrapper">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 d-flex flex-center app-wrapper">
        <transition name="fadeUp" appear>
          <yamen-card/>
        </transition>
      </div>
    </div>
  </div>
  <div class="container-fluid mb-5">
    <div class="row no-gutters mb-5 flex-center">
      <div class="col-12 mb-5 px-3">
        <dev-tech/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import DevTech from './DevTech'
import YamenCard from './YamenCard'
export default {
  components: {
    'dev-tech': DevTech,
    'yamen-card': YamenCard
  }
}
</script>
