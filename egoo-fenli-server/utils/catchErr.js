module.exports = {
  async catchErr (ctx, next) {
    try {
      ctx.error = (code, msg) => {
        if (typeof code === 'string') {
          msg = code
          code = 500
        }
        ctx.throw(code || 500, msg || '服务器异常,请稍后再试!')
      }
      await next()
    } catch (err) {
      let code = 500
      let msg = '服务器异常,请稍后再试!'
      ctx.body = {
        code,
        msg
      }
    }
  }
}