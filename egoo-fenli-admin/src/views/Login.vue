<template>
  <div class="user-form">
    <Form :model="userData" label-position="left" :label-width="100">
      <FormItem label="用户名">
        <Input v-model="userData.name" />
      </FormItem>
      <FormItem label="密码">
        <Input v-model="userData.pwd" type="password" />
      </FormItem>
      <FormItem label="验证码">
        <div class="code-item">
          <div class="code-input"><Input v-model="userData.code" /></div>
          <div class="code-img" @click="getCode">
            <img :src="codeSrc" alt="code" />
          </div>
        </div>
      </FormItem>
    </Form>
    <div class="btn-box">
      <Button type="primary" @click="login">登录</Button>
      <router-link to="/register" tag="span">没有账户?请注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      userData: {
        name: '',
        pwd: '',
        code: '',
        codeToken: ''
      },
      codeSrc: 'https://placehold.it/200x60'
    }
  },
  async mounted () {
    this.getCode()
  },
  methods: {
    async getCode () {
      let res = await this.$api.user.getCode()
      let data = res.data.data
      this.userData.codeToken = data.token
      this.codeSrc = data.img
    },
    async login () {
      let res = await this.$api.user.login({ ...this.userData })
      if (res.data.code !== 200) {
        this.$Message.info(res.data.msg)
        this.getCode()
        return
      }
      this.$Message.info(res.data.msg)
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
