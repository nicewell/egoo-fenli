<template>
  <div class="user-form">
    <Form :model="userData" label-position="left" :label-width="100">
      <FormItem label="用户名">
        <Input v-model="userData.name" />
      </FormItem>
      <FormItem label="密码">
        <Input v-model="userData.pwd" type="password" />
      </FormItem>
      <FormItem label="确认密码">
        <Input v-model="userData.rePwd" type="password" />
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
      <Button type="primary" @click="submit">注册</Button>
      <router-link to="/login" tag="span">已有账户?请登录</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  props: {
    type: {
      'type': String,
      'default': 'login'
    },
    userData: {
      'type': Object,
      'default': {
        name: '',
        pwd: '',
        rePwd: '',
        code: '',
        codeToken: ''
      }
    },
    codeSrc: {
      'type': String,
      'default': 'https://placehold.it/200x60'
    }
  },
  data () {
    return {
      //
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
    async submit () {
      let res = await this.$api.user.submit({ ...this.userData })
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
.user-form {
  position: relative;
  padding: 30px 0;
  width: 60%;
  margin: 0 auto;
}
.code-item {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}
.code-input {
  flex: 1;
}
.code-img {
  position: relative;
  height: 30px;
  margin-left: 30px;
  cursor: pointer;
  img {
    display: block;
    width: auto;
    height: 100%;
  }
}
.btn-box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  & > span {
    color: #2d8cf0;
    font-size: 12px;
    text-decoration: underline;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
