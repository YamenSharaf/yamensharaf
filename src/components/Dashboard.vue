<template>
<div class="container dashboard-page">
  <div class="row page-wrapper">
    <div class="col-md-12 d-flex flex-center">
      <el-table
        :data="blogPosts"
        style="width: 100%">
        <el-table-column
          label="Date">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date.toDateString() }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Title">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Body">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.body }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Operations">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleBlogDelete(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="col-md-12 d-flex flex-center">
        <router-link :to="{ name: 'WriteBlog' }" >
          <el-button>
            Add a blog post
          </el-button>
        </router-link>
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
    handleBlogDelete (id) {
      this.$store.dispatch('deleteBlogPost', id)
        .then(() => {
          this.$message.success(`Post deleted`)
        })
        .catch((error) => {
          this.$message.error(`Error: ${error}`)
        })
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
