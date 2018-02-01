<template>
  <div class="row mt-5 manage-tags">
    <div class="col-md-12 d-flex flex-column flex-center">
      <div class="w-100 d-flex px-3 py-2 bg-gray justify-content-between align-center">
        <h2 class="h2 text-primary">
          <i class="mdi mdi-tag-multiple" aria-hidden="true"></i>
          Manage Topics
        </h2>
      </div>
    </div>
    <div v-loading="loadingTags" class="col-md-12 d-flex align-center mt-4">
      <el-tag
        v-for="(tag, i) in tags"
        :key="i"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadingTags: true,
      tags: []
    }
  },
  methods: {
    handleClose (tag) {
      this.$confirm(`Are you sure you wanna delete ${tag}? (This does not delete posts with that topic).`, `Delete tag?`, {
        confirmButtonText: 'Delete',
        type: 'warning'
      })
        .then(() => {
          this.tags.splice(this.tags.indexOf(tag), 1)
          this.updateTags(this.tags)
        })
    },
    getTags () {
      this.$store.dispatch('fetchBlogTags')
        .then(tags => {
          this.loadingTags = false
          this.tags = tags
        })
        .catch(err => {
          this.loadingTags = false
          console.log(err)
        })
    },
    updateTags (tags) {
      let newTags = [...this.tags, ...tags]
      this.$store.dispatch('updateBlogTags', newTags)
        .then(() => {
          this.$message.success(`updated tags`)
        })
        .catch(err => {
          this.$message.error(`Error: ${err} `)
        })
    }
  },
  mounted () {
    this.getTags()
  }
}
</script>

<style lang="scss">
.manage-tags {
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
