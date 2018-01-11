export default {
  methods: {
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.submitForm()
          } catch (err) {
            console.warn('No submitForm method')
          }
        } else {
          // console.log('submit error!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
