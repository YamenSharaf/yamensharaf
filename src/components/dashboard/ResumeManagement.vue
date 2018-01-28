<template>
  <div class="row mt-5">
    <div class="col-md-12 d-flex flex-column flex-center">
      <div class="w-100 d-flex px-3 py-2 bg-gray justify-content-between align-center">
        <h2 class="h2 text-primary">
          <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
          Manage Resume
        </h2>
      </div>
    </div>
    <div class="col-md-12 d-flex justify-content-between align-center mt-2">

      <a v-if="resumeUrl" :href="resumeUrl">
        Download Resume
      </a>
      <a v-else class="text-muted" href="javascript;">
        No resume available
      </a>
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        :http-request="handleFileUpload"
        action="">
        <el-button :loading="uploadLoading" type="primary">Click to upload</el-button>
        <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uploadLoading: false
    }
  },
  computed: {
    resumeUrl: {
      get () {
        return this.$store.getters.getResumeUrl
      },
      set (value) {
        this.$store.commit('setResumeUrl')
      }
    }
  },
  methods: {
    handleFileUpload (file) {
      this.uploadLoading = true
      this.$store.dispatch('uploadResume', file.file)
        .then((res) => {
          this.uploadLoading = false
          this.resumeUrl = res.downloadURL
          this.$message.success(`Resume uploaded successfully`)
        })
        .catch((error) => {
          this.uploadLoading = false
          this.$message.error(`Error: ${error}`)
        })
    }
  }
}
</script>
