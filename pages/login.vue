<!-- eslint-disable -->
<template>
  <section class="container-fluid login d-flex align-items-center">
    <div class="loginform-wrp mx-auto">
      <h1 class="text-center color-light">Login</h1>
      <a-form       
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form mx-auto p-3"
        @submit="handleSubmit">
        <a-form-item class="mb-2">
          <a-input
            v-model="user.username"
            v-decorator="['username',{ rules: [{ type: 'email', required: true, message: 'Please input your e-mail!' }] }]"
            size="large"
            name="username"
            placeholder="Username">
            <a-icon 
              slot="prefix" 
              type="user"
              style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item class="mb-2">
          <a-input 
            v-model="user.password"
            v-decorator="['password',{ rules: [{ required: true, message: 'Please input your Password!' }] }]"
            size="large"
            type="password"
            name="password"
            placeholder="Password">
            <a-icon 
              slot="prefix" 
              type="lock"
              style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item class="mb-0">
          <a-checkbox 
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: false,
              }
          ]">
            Remember me
          </a-checkbox>
          <a 
            class="login-form-forgot pull-right" 
            href="">
            Forgot password
          </a>
          <a-button 
            type="primary"
            htmlType="submit"
            size="large"
            class="login-form-button d-block w-100 mb-2">
            Log in
          </a-button>
          <a-button 
            class="login-fb-form-button d-block w-100 mb-2 d-flex align-items-center"
            size="large"
            @click="$auth.loginWith('facebook')">
            <span class="d-block soc-icon fa fa-facebook w-25"/><span class="d-block w-75">Log in with facebook</span>
          </a-button>
          <a-button 
            class="login-fb-form-button d-block w-100 mb-2 d-flex align-items-center"
            size="large"
            @click="$auth.loginWith('google')">
            <span class="d-block soc-icon fa fa-google w-25"/><span class="d-block w-75">Log in with google</span>
          </a-button>
          Or <a href="">register now!</a>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'
export default {
  layout: 'layout_user',
  components: {
    // Logo
  },
  data() {
    return {
      drawervisible: false,
      form: this.$form.createForm(this),
      user: {
        username: 'weskhaled@gmail.com',
        password: '15021989'
      }
    }
  },
  computed: {},
  created() {
    // this.form = this.$form.createForm(this)
  },
  mounted() {},
  // beforeRouteLeave(to, from, next) {
  // },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.passwordGrantLogin()
        }
      })
    },
    async passwordGrantLogin() {
      this.$message.loading('Action in progress..', 0)
      await this.$auth
        .loginWith('password_grant', {
          data: {
            grant_type: 'password',
            client_id: process.env.PASSPORT_CLIENT_ID,
            client_secret: process.env.PASSPORT_CLIENT_SECRET,
            scope: '*',
            username: this.user.username,
            password: this.user.password
          }
        })
        .then(() => {
          this.$message.destroy()
          this.$message.success('Loged in', 2.5)
          // setTimeout(function() {
          //   this.$message.success('Loged in', 2.5)
          // }, 200)
        })
        .catch(error => {
          this.$message.destroy()
          this.$message.error('' + error, 2.5)
        })
      this.$router.replace('/')
    }
  }
}
</script>
<style lang="scss">
/* #components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
} */
/* eslint-disable no-new */
.login {
  min-height: 100vh;
  background: linear-gradient(
    -45deg,
    rgba(53, 50, 50, 0.9),
    rgba(151, 47, 87, 0.9),
    rgba(18, 106, 138, 0.9),
    rgba(22, 134, 108, 0.9)
  );
  background-size: 400% 400%;
  animation: Gradient 35s ease infinite;
  .loginform-wrp {
    min-width: 40%;
    max-width: 100%;
    .login-form {
      background-color: rgba(0, 0, 0, 0.67);
      border-radius: 3px;
    }
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.login-fb-form-button {
  border: 1px solid #0092ff;
  .soc-icon {
    margin-left: -15px;
    padding: 0 10%;
    line-height: 38px;
    background-color: #0091ff;
    border-radius: 3px 0px 0 3px;
    text-align: center;
    color: white;
    font-size: 23px;
    overflow: hidden;
  }
}
</style>
