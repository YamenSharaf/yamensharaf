<template>
  <div class="login-page page-wrapper bg-gray d-flex flex-column flex-center">
    <div class="container">
      <div class="row d-flex flex-center">
        <div class="col-md-6 text-center pt-3 pb-5">
          <p class="h1 text--black mb-5">Welcome back</p>
          <el-card
            v-loading="loading"
            class="py-3 px-3">
            <el-form
              @keyup.enter.native.prevent="validateForm('loginForm')"
              :model="form"
              :rules="rules"
              ref="loginForm">
              <el-form-item
                label="Email"
                prop="email" >
                <el-input
                  suffix-icon="fa fa-at"
                  placeholder="john@example.com"
                  v-model="form.email"/>
              </el-form-item>
              <el-form-item
                label="Password"
                prop="password">
                <el-input
                  suffix-icon="fa fa-asterisk"
                  placeholder="Enter your password"
                  v-model="form.password"
                  type="password"
                  auto-complete="off"/>
              </el-form-item>
              <div class="my-5"/>
              <el-button
                icon="fa fa-sign-in"
                class="w-50"
                type="primary"
                @click="validateForm('loginForm')">Log in</el-button>
              <el-button
                icon="fa fa-undo"
                @click="resetForm('loginForm')">Reset</el-button>
            </el-form>
            <div class="my-3"/>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formActions from 'Mixins/formActions'

export default {
  mixins: [formActions],
  data () {
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input a valid email address', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: 'Please input your password', trigger: 'blur' },
          { min: 6, trigger: 'blur', message: 'Password may not be less than 6 characters' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.loading = true
      this.$store.dispatch('logUserIn', this.form)
        .then(() => {
          this.loading = false
          this.$message.success(`Logged in successfully`)
        })
        .catch((error) => {
          this.loading = false
          this.$message.error(error)
        })
    }
  }
}
</script>

<style lang="scss">
@import '~sass';

.login-page {
  .spaced-words {
    word-spacing: 0.2em;
  }
  .el-form-item {
    margin-bottom: 10px
  }
  .el-form-item__label {
    margin-bottom: 0
  }
  .social-signup {
    .el-button {
      width: 100%;
    }
  }
}
</style>
