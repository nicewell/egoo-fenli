import axios from 'axios'
import router from '@/router'
import store from '@/store'

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tips = msg => {
  console.log(msg)
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const redirectToLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath // 添加一个重定向后缀，等登录以后再到这里来
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      redirectToLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tips('登录过期，请重新登录')
      setTimeout(() => {
        redirectToLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      tips('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

// let loading = null
// 创建axios实例
var instance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 12
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    if (config.method !== 'get') {
      const token = store.state.user.token
      // console.log(token)
      token && (config.headers.Authorization = token)
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  // response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
  response => {
    return response
  },
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      console.log('======')
      console.log(response.status, response.data.message)
      console.log('======')
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // eg:请求超时或断网时，更新state的network状态
      console.log(error)
      // store.commit('changeNetwork', false)
    }
  }
)

export default instance
