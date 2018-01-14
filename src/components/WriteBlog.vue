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
      <div class="col-md-4 d-flex flex-column flex-center">
        <h4 class="h9 text-dark">
          Post preview image
        </h4>
        <el-upload
          v-loading="imageLoading"
          class="avatar-uploader"
          :http-request="handleFileUpload"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar img-fluid">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      imageLoading: false,
      imageUrl: '',
      blogForm: {
        date: null,
        imageUrl: ``,
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
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      console.log('file', file)
      // const fileEx = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)[0] : undefined
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    },
    handleFileUpload (file) {
      this.imageLoading = true
      this.$store.dispatch('uploadImage', file.file)
        .then((res) => {
          this.imageLoading = false
          this.imageUrl = this.blogForm.imageUrl = res.downloadURL
          this.$message.success(`Image uploaded successfully`)
        })
        .catch((error) => {
          this.imageLoading = false
          this.$message.error(`Error: ${error}`)
        })
    },
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
