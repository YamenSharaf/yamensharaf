<template>
<div v-loading="postsLoading" class="container page-wrapper">
  <div class="row">
    <div class="col-md-12 d-flex flex-center">
    </div>
  </div>
  <div class="row">
    <div
      v-if="blogPosts.length > 0"
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
    <div v-else class="col-12 d-flex flex-center">
      <span class="h1 text-primary text-center">
        No posts yet
      </span>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      postsLoading: true,
      posts: []
    }
  },
  computed: {
    blogPosts () {
      // Getting public posts
      return this.posts.filter(post => post.visibility === 'public')
    }
  },
  methods: {
    getBlogPosts () {
      this.$store.dispatch('fetchBlogPosts')
        .then(res => {
          this.postsLoading = false
          res.forEach(doc => {
            let data = doc.data()
            let id = doc.id
            let post = { ...data, id }
            this.posts.push(post)
          })
        })
        .catch(err => {
          this.postsLoading = false
          this.$message.error(`Error: ${err} `)
        })
    }
  },
  mounted () {
    this.getBlogPosts()
  }
}
</script>

<style lang="scss">
</style>

