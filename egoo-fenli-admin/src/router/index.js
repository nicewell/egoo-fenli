import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ '@/views/Register.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 获取token
  const token = store.state.user.token
  const pass = ['/login', '/register']
  if (pass.includes(to.path)) {
    next()
  } else {
    token
      ? next()
      : next({
        path: '/login',
        query: {
          redirect: to.fullPath // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
        }
      })
  }
})
export default router
