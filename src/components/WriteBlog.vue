<template>

<div v-loading="loading" class="page-wrapper write-blog">
  <div class="container">
    <div class="row mt-5">
      <div class="col-12">
        <div class="w-100 d-flex px-3 py-2 bg-gray justify-content-between align-center">
          <h2 v-if="mode === 'add'" class="h2 text-primary">
            Write new blog post
          </h2>
          <h2 v-else class="h2 text-primary">
            Edit blog post
          </h2>
            <el-button @click="$router.go(-1)" icon="el-icon-back">
              Back
            </el-button>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-center">
        <div class="row">
          <div class="col-md-12 d-flex flex-center mt-3">
            <el-input v-model="blogForm.title" class="w-100" placeholder="Enter blog title"/>
          </div>
          <div class="col-md-12 d-flex flex-center mt-3">
            <wysiwyg v-model="blogForm.body" :options="editorOptions" placeholder="Write blog"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 d-flex flex-column">
        <h4 class="h9 text-dark mt-3 text-center">
          Post preview image
        </h4>
        <el-upload
          v-loading="imageLoading"
          drag
          class="avatar-uploader"
          :http-request="handleFileUpload"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="blogForm.imageUrl" :src="blogForm.imageUrl" class="avatar img-fluid">
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          </div>
        </el-upload>
          <h4 class="h9 text-dark mt-3 text-center">
            Post tags
          </h4>
          <el-select
            v-model="blogForm.tags"
            @change="updateTags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Select or add tags for your post">
            <el-option
              v-for="(tag, i) in existingTags"
              :key="i"
              :label="tag"
              :value="tag">
            </el-option>
          </el-select>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12 col-md-8 d-flex justify-content-between my-5">
        <el-radio-group v-model="blogForm.visibility" size="medium">
          <el-radio-button label="public" > Public </el-radio-button>
          <el-radio-button label="private"> Private </el-radio-button>
        </el-radio-group>
        <el-button v-if="mode === 'add'" @click="handlePostBlog">
          Post blog
        </el-button>
        <el-button v-else @click="handleEditBlog">
          Update blog
        </el-button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import {quillRedefine} from 'vue-quill-editor-upload'
export default {
  components: {
    'wysiwyg': quillEditor
  },
  data () {
    return {
      mode: 'add',
      editId: null,
      loading: false,
      imageLoading: false,
      editorOptions: {},
      blogForm: {
        date: null,
        imageUrl: ``,
        title: ``,
        body: ``,
        userUid: '',
        visibility: 'public',
        tags: []
      },
      existingTags: []
    }
  },
  computed: {
    userUid () {
      return this.$store.getters.getUserUid
    },
    routeParams () {
      return this.$route.params
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        this.$message.error('Avatar picture must be JPG or PNG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isImage && isLt2M
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
    },
    handleEditBlog () {
      this.loading = true
      this.blogForm.date = new Date()
      this.$store.dispatch('editExistingBlog', {id: this.editId, form: this.blogForm})
        .then(() => {
          this.loading = false
          this.$message.success(`Updated successfully`)
          Object.assign(this.$data, this.$options.data.apply(this))
          this.$router.push({ name: 'Dashboard' })
        })
        .catch((error) => {
          this.loading = false
          this.$message.error(error)
        })
    },
    getOldPostData (id) {
      return this.$store.getters.getBlogPost(id)
    },
    initEditMode (id) {
      this.mode = 'edit'
      this.editId = id
      const currentPost = this.getOldPostData(id)
      this.blogForm = { ...this.blogForm, ...currentPost }
    },
    getTags () {
      this.$store.dispatch('fetchBlogTags')
        .then(tags => {
          this.existingTags = tags
          console.log(tags)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateTags (tags) {
      let newTags = [...this.existingTags, ...tags]
      this.$store.dispatch('updateBlogTags', newTags)
        .then(() => {
          this.$message.success(`updated tags`)
        })
        .catch(err => {
          this.$message.error(`Error: ${err} `)
        })
    }
  },
  created () {
    this.editorOption = quillRedefine({
      uplpadConfig: {
        // https://github.com/NextBoy/vue-quill-editor-upload
      }
    })
  },
  mounted () {
    this.getTags()
    this.blogForm.userUid = this.userUid
    if (this.routeParams.id) {
      this.initEditMode(this.routeParams.id)
    }
  }
}
</script>

<style lang="scss">

.write-blog {
  .quill-editor {
    min-height: 500px;
    .ql-container {
      min-height: 500px;
      .ql-editor {
        min-height: 500px;
      }
    }
  }

  .el-upload-dragger {
    min-height: 180px;
    height: 100%;
  }
}

</style>
