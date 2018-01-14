<template>
  <div class="container page-wrapper">
    <div class="row flex-center mt-5">
      <div v-if="post.title" class="col-md-12 mt-5">
        <h1 class="h1 text-primary text-center">
          {{ post.title }}
        </h1>
      </div>
      <div v-if="post.imageUrl" class="col-md-6 mt-5">
        <img class="img-fluid" :src="post.imageUrl" :alt="post.title">
      </div>
      <div v-if="post.body" class="col-md-12 mt-5">
        <p v-html="post.body" class="h9 text-danger text-center">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    postId () {
      return this.$route.params.postId
    },
    post () {
      return this.$store.getters.getBlogPost(this.postId)
    }
  }
}
</script>
