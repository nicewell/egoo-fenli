<template>
  <div>
    <LoginForm :typeData=typeData :userData=userData></LoginForm>
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm'
export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data () {
    return {
      typeData: {
        text: '登录',
        to: '/register',
        des: '没有账户?请注册',
        submit: 'login'
      },
      userData: {
        name: '',
        pwd: '',
        rePwd: '',
        code: '',
        codeToken: ''
      }
    }
  },
  mounted () {
    //
  },
  methods: {
    //
  }
}
</script>
<style lang="scss" scoped>
</style>
