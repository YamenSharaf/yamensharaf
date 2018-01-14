<template>
<div class="container dashboard-page">
  <div class="row page-wrapper">
    <div class="col-md-12 d-flex flex-column flex-center">
      <div class="w-100 d-flex px-3 py-2 bg-gray justify-content-between align-center">
        <h2 class="h2 text-primary">
          <i class="mdi mdi-format-list-bulleted"></i>
          Blog posts
        </h2>
        <router-link :to="{ name: 'WriteBlog' }" >
          <el-button icon="el-icon-circle-plus-outline">
            Add a blog post
          </el-button>
        </router-link>
      </div>
        <hr>
      <el-table
        v-loading = "blogPosts[0] === undefined"
        :data="blogPosts"
        style="width: 100%">
        <el-table-column
          label="Title">
          <template slot-scope="scope">
            <router-link :to=" { name: 'ViewPost', params: { postId: scope.row.id } } " >
              <i class="el-icon-document"></i>
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Date">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date.toDateString() }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Operations">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="info"
              @click="handleBlogEdit(scope.row.id)">Edit</el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="handleBlogDelete(scope.row.id, scope.row.title)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Showcase Component'
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUserStatus
    },
    blogPosts () {
      return this.$store.getters.getBlogPosts
    }
  },
  methods: {
    handleBlogDelete (id, title) {
      this.$confirm(`Are you sure you wanna delete ${title}?`, `Delete post`, {
        confirmButtonText: 'Delete',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('deleteBlogPost', id)
            .then(() => {
              this.$message.success(`Post deleted`)
            })
            .catch((error) => {
              this.$message.error(`Error: ${error}`)
            })
        })
        .catch(() => {
          this.$message.error(`Did not delete`)
        })
    },
    handleBlogEdit (id) {
      this.$router.push({ name: 'EditBlog', params: {id} })
    }
  }
}
</script>

<style lang="scss">
@import '~sass';
.dashboard-page {
  .el-table {
    th {
      background: $color-primary;
      color: $color-white;
    }
  }
}
</style>
