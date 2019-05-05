/**
 * address 模块接口列表
 */
import axios from './http'

const address = {
  // 获取
  getAddress (params) {
    return axios.get(`getAddress`, { params })
  },
  // 添加
  addAddress (params) {
    return axios.get(`addAddress`, { params })
  }
  // 删除
}

export default address
