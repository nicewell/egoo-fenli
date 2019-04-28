<template>
  <div class="home">
    <div class="nav">
      <div class="nav-start">
        <a href="javascript:void(0);" class="logo" title="Egoo cli">
          <img src="../assets/img/egoo_cli.svg">
          <span><em>Egoo CLI</em><i>分离地址管理</i></span>
        </a>
      </div>
      <div class="nav-end">

      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'iview'
Vue.component('Button', Button)
export default {
  name: 'Home',
  compontes: {
    // Button
  },
  data () {
    return {
      //
    }
  },
  methods: {
    //
  }
}
</script>
<style lang="scss" scoped>
.nav{
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  &-start{
    position: relative;
  }
  .logo{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  &-end{}
}
</style>
