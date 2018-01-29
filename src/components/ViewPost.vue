<template>
  <div v-loading="postLoading" class="view-post container page-wrapper">
    <div class="row flex-center mt-5">
      <div v-if="post.visibility === 'private'" class="col-12">
        <el-alert
          :closable="false"
          title="Private post"
          type="warning"
          show-icon>
          <div class="d-flex justify-content-between align-center">
            <p class="mb-0">
              This is a private post. People can only view this post by its link
            </p>
            <el-button
              icon="mdi mdi-content-copy"
              type="warning"
              plain
              v-clipboard:copy="url"
              v-clipboard:success="handleCopySuccess"
              v-clipboard:error="handleCopyError">
              Copy link
            </el-button>
          </div>
        </el-alert>
      </div>
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
        <span class="ql-snow">
          <span class="ql-editor" v-html="post.body">
          </span>
        </span>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <disqus v-if="!postLoading" :shortname="disqusConfig.shortname" :identifier="postId" :url="url"/>
      </div>
    </div>
  </div>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus.vue'
export default {
  components: {
    'disqus': VueDisqus
  },
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
    },
    url () {
      return window.location.href
    },
    disqusConfig () {
      return this.$store.getters.getDisqusConfig
    }
  },
  methods: {
    HandleImageLoad () {
      this.imageLoading = false
    },
    handleCopySuccess () {
      this.$message.success(`Copied link successfully`)
    },
    handleCopyError () {
      this.$message.error(`Could not copy link. Copy it from the address bar yourself like a man`)
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

<style lang="scss">
.view-post {
  .el-alert {
    &__content {
      // display: flex;
      width: 100%;
    }
  }
}
</style>
