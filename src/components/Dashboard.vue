<template>
<div class="container dashboard-page">
  <blog-management/>
  <tags-management/>
  <resume-management/>
</div>
</template>

<script>
import BlogManagement from './dashboard/BlogManagement'
import TagsManagement from './dashboard/TagsManagement'
import ResumeManagement from './dashboard/ResumeManagement'

export default {
  components: {
    'blog-management': BlogManagement,
    'tags-management': TagsManagement,
    'resume-management': ResumeManagement
  },
  data () {
    return {
      msg: 'Showcase Component'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
