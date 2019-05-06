import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const baseData = {
  token: '',
  name: '',
  _id: ''
}
// 拿session存入的值
const sessionUser = JSON.parse(window.sessionStorage.getItem('user')) || {}
let user = Object.assign({}, baseData, { ...sessionUser })
const state = {
  user
}
const getters = {
  //
}
const mutations = {
  saveToken (state, data) {
    state.user = { ...data }
    window.sessionStorage.setItem('user', JSON.stringify(state.user))
  },
  removeToken (state) {
    state.user = { ...baseData }
    window.sessionStorage.removeItem('user')
  }
}

const actions = {
  saveToken ({ commit }, data) {
    commit('saveToken', data)
  },
  removeToken ({ commit }) {
    commit('removeToken')
  }
}
export default new Vuex.Store({
  modules:{},
  state,
  getters,
  mutations,
  actions
})
