<template>
  <div class="container page-wrapper">
    <div class="row flex-center mt-5">
      <div v-if="post.title" class="col-md-12 mt-5">
        <h1 class="h1 text-primary text-center font-title">
          {{ post.title }}
        </h1>
      </div>

      <div v-if="post.imageUrl && imageLoading" v-loading="imageLoading" style="min-height: 500px" class="col-md-12 mt-5">

      </div>
      <div v-if="post.imageUrl" class="col-md-6 mt-5">
        <img @load="HandleImageLoad" class="img-fluid" :src="post.imageUrl" :alt="post.title">
      </div>
    </div>
    <div class="row mt-3 mb-5">
      <div v-if="post.body" class="col-md-12 mt-5 mb-5">
        <p v-html="post.body" class="text-center"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageLoading: true
    }
  },
  computed: {
    postId () {
      return this.$route.params.postId
    },
    post () {
      return this.$store.getters.getBlogPost(this.postId)
    }
  },
  methods: {
    HandleImageLoad () {
      this.imageLoading = false
    }
  }
}
</script>
