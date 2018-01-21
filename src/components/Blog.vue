<template>
<div class="container page-wrapper">
  <div class="row">
    <div class="col-md-12 d-flex flex-center">
    </div>
  </div>
  <div class="row">
    <div 
      v-for="(post, index) in blogPosts" 
      :key="index" 
      :data-aos=" ((index/ 2) === 0 || (index/2) === 1) ?  `fade-up-right` : `fade-up-left`"
      data-aos-duration="1000"
      class="col-md-6 d-flex flex-center p-3">
      <router-link :to=" { name: 'ViewPost', params: { postId: post.id } } " >
        <el-card style="max-width: 400px" :body-style="{ padding: '0px' }">
          <img :src="post.imageUrl" class="img-fluid">
          <div class="p-3">
            <h1 class="h8 text-primary"> {{post.title}} </h1>
            <time class="text-muted">{{ post.date.toDateString() }}</time>
          </div>
        </el-card>
      </router-link>
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
  },
  computed: {
    blogPosts () {
      return this.$store.getters.getBlogPosts
    }
  }
}
</script>

<style lang="scss">
</style>

