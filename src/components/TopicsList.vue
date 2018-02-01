<template>
  <div class="row">
    <div class="col-12">
      <router-link v-for="(tag, i) in tags" :key="i" :to="{ name: 'ViewTopic', params: { tag } }" >
        <el-tag class="mx-1"> {{tag}} </el-tag>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      default () {
        return []
      },
      type: Array
    }
  }
}
</script>
