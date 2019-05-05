/**
 * user 模块接口列表
 */
import axios from './http'

const user = {
  // 获取验证码
  getCode () {
    return axios.get(`getCode`)
  },
  // 注册
  register (data) {
    return axios.post(`register`, data)
  },
  // 登录
  login (data) {
    return axios.post(`login`, data)
  },
  // 获取个人信息
  getUserInfo (id) {
    return axios.get(`getUserInfo/${id}`)
  }
}
export default user
