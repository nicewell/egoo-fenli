const jwt = require('jsonwebtoken')
const { TOKEN_ENCODE_STR, URL_PASS } = require('./config')
const Code = require('../db').Code
const User = require('../db').User

module.exports = {
  // 生成 token
  createToken (str) {
    return jwt.sign({ str }, TOKEN_ENCODE_STR, { expiresIn: '1h' })
  },
  /**
   * 验证登录 token 是否正确  => 写成中间件
   * get 请求与配置config的请求不拦截验证，其余均需验证登录
   */
  async checkToken (ctx, next) {
    let url = ctx.url
    if (ctx.method !== 'GET' && !URL_PASS.includes(url)) {
      // 请求头带来
      let token = ctx.get('Authorization')
      if (token === '') {
        // 直接抛出错误
        ctx.response.status = 401
        ctx.response.body = '请先去登录!'
        return
      }
      try {
        // 验证token是否过期
        let { str = '' } = await jwt.verify(token, TOKEN_ENCODE_STR)
        // 验证token与账号是否匹配
        let res = await User.find({ name: str, token })
        if (res.length <= 0) {
          ctx.response.status = 401
          ctx.response.body = '登录过期，请重新登录!'
          return
        }
        let user = res[0]
        // ctx保存用户的_id，便于操作
        ctx._id = user._id
      } catch (e) {
        ctx.response.status = 401
        ctx.response.body = '登录已过期请重新登录!'
        return
      }
    }
    await next()
  },
  // 验证 验证码 token 与 code 是否正确
  async checkTokenCode ({ token, code }) {
    try {
      // 验证码转大写
      code = code.toUpperCase()
      let _res = await jwt.verify(token, TOKEN_ENCODE_STR)
      console.log('--------------------->')
      console.log({ _res })
      console.log('--------------------->')
      // 读数据库，删除验证码
      let res = await Code.findOneAndDelete({ token, code })
      if (res === null) {
        return false
      }
    } catch (e) {
      return false
    }
    return true
  }
}
