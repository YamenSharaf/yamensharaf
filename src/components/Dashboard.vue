<template>
<div class="container dashboard-page">
  <blog-management/>
  <resume-management/>
</div>
</template>

<script>
import BlogManagement from './dashboard/BlogManagement'
import ResumeManagement from './dashboard/ResumeManagement'

export default {
  components: {
    'blog-management': BlogManagement,
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
