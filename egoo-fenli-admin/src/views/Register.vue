<template>
  <div>
    <LoginForm :typeData=typeData :userData=userData></LoginForm>
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm'
export default {
  name: 'Register',
  components: {
    LoginForm
  },
  data () {
    return {
      typeData: {
        text: '注册',
        to: '/login',
        des: '已有账户?请登录',
        submit: 'register'
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
