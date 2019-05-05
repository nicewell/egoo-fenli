import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/css/public.scss'

Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
