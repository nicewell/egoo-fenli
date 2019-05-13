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
    return axios.post(`addAddress`, params)
  },
  // 修改
  editAddress (id, params) {
    return axios.put(`editAddress/${id}`, params)
  },
  // 删除
  delAddress (id) {
    return axios.delete(`delAddress/${id}`)
  }
}

export default address
