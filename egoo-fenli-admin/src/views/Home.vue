<template>
  <div class="home">
    <div class="nav">
      <div class="nav-start">
        <a :href="homeLink" class="logo" title="Egoo cli">
          <img src="../assets/img/egoo_cli.svg">
          <span><em>Egoo CLI</em><i>分离地址管理</i></span>
        </a>
      </div>
      <div class="nav-end">
        <Input search placeholder="Enter something..." />
        <Button :size="buttonSize" icon="md-add" type="primary">添加</Button>
        <Button :size="buttonSize" icon="ios-download-outline" type="primary" shape="circle"></Button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button, Input } from 'iview'
Vue.component('Button', Button)
Vue.component('Input', Input)
export default {
  name: 'Home',
  compontes: {
    // Button
  },
  data () {
    return {
      homeLink: '//github.com/nicewell'
    }
  },
  methods: {
    //
  }
}
</script>
<style lang="scss" scoped>
.nav {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  &-start {
    position: relative;
  }
  .logo {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  &-end {
  }
}
</style>
