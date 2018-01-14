<template>

<div v-loading="loading" class="page-wrapper">
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-8 d-flex flex-center">
        <div class="row">
          <div class="col-12">
            <h1>
              Write new blog
            </h1>
          </div>
          <div class="col-md-12 d-flex flex-center mt-3">
            <el-input v-model="blogForm.title" class="w-100" placeholder="Enter blog title"/>
          </div>
          <div class="col-md-12 d-flex flex-center mt-3">
            <wysiwyg v-model="blogForm.body" placeholder="Write blog"/>
          </div>
          <div class="col-md-12 d-flex justify-content-between mt-5">
            <el-radio-group v-model="blogForm.visibility" size="medium">
              <el-radio-button label="public" > Public </el-radio-button>
              <el-radio-button label="private"> Private </el-radio-button>
            </el-radio-group>
            <el-button @click="handlePostBlog">
              Post blog
            </el-button>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      blogForm: {
        date: null,
        title: ``,
        body: ``,
        userUid: '',
        visibility: 'public'
      }
    }
  },
  computed: {
    userUid () {
      return this.$store.getters.getUserUid
    }
  },
  methods: {
    handlePostBlog () {
      this.loading = true
      this.blogForm.date = new Date()
      this.$store.dispatch('postNewBlog', this.blogForm)
        .then(() => {
          this.loading = false
          this.$message.success(`Posted successfully`)
          Object.assign(this.$data, this.$options.data.apply(this))
          this.$router.push({ name: 'Dashboard' })
        })
        .catch((error) => {
          this.loading = false
          this.$message.error(error)
        })
    }
  },
  mounted () {
    this.blogForm.userUid = this.userUid
  }
}
</script>

<style lang="scss">
@import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

</style>
