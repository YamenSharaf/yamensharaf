<template>
  <div v-loading="postLoading" class="container page-wrapper">
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
        <span class="ql-snow" v-html="post.body"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postLoading: true,
      imageLoading: true,
      post: {}
    }
  },
  computed: {
    postId () {
      return this.$route.params.postId
    }
  },
  methods: {
    HandleImageLoad () {
      this.imageLoading = false
    },
    fetchPostData () {
      this.$store.dispatch('fetchBlogPost', this.postId)
        .then(res => {
          let postData = res.data()
          this.postLoading = false
          this.post = postData
        })
        .catch(err => {
          this.postLoading = false
          this.$message.error(`Error: ${err}`)
        })
    }
  },
  mounted () {
    this.fetchPostData()
  }
}
</script>
