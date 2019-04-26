const User = require('../../db').User
const { SaltRounds } = require('../../utils/config')

const xss = require('xss')
const bcrypt = require('bcrypt')

const { checkTokenCode, createToken } = require('../../utils/token')

const register = async (ctx, next) => {
  let {
    name = '',
    pwd = '',
    rePwd = '',
    code = '',
    codeToken = ''
  } = ctx.request.body
  try {
    if (name === '' || pwd === '') {
      ctx.body = {
        code: 401,
        msg: '注册失败，请填写完整表单!'
      }
      return
    }
    if (!(pwd.length >= 6 && pwd.length <= 32)) {
      ctx.body = {
        code: 401,
        msg: '注册失败，密码为6-32位!'
      }
      return
    }
    if (pwd !== rePwd) {
      ctx.body = {
        code: 401,
        msg: '注册失败，2次密码输入不一致!'
      }
      return
    }

    // 验证码判断
    let mark = await checkTokenCode({ token: codeToken, code })
    if (!mark) {
      ctx.body = {
        code: 401,
        msg: '注册失败，验证码错误!'
      }
      return
    }

    // 判断 name 是否重复
    let res = await User.find({ name })
    if (res.length !== 0) {
      ctx.body = {
        code: 401,
        msg: '注册失败，账号已被注册，换一个试试吧!'
      }
      return
    }
    // 防止xss攻击， 转义
    name = xss(name)
    // 存入加密之后的密码
    pwd = bcrypt.hashSync(pwd, SaltRounds)
    let token = createToken(name)
    let user = new User({ name, pwd, token })
    res = await user.save()
    if (res._id !== null) {
      ctx.body = {
        code: 200,
        msg: '注册成功!',
        data: {
          id: res._id,
          name: res.name,
          token: res.token
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败，服务器异常!'
      }
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      msg: '注册失败，服务器异常!'
    }
  }
}

const login = async (ctx, next) => {
  let { name = '', pwd = '', code = '', codeToken = '' } = ctx.request.body
  try {
    if (name === '' || pwd === '') {
      ctx.body = {
        code: 401,
        msg: '登录失败，请输入登录账号密码!'
      }
      return
    }
    // 验证码判断
    let mark = await checkTokenCode({ token: codeToken, code })
    if (!mark) {
      ctx.body = {
        code: 401,
        msg: '登录失败，验证码错误!'
      }
      return
    }
    let res = await User.find({ name }) // 不管结果数量是多少，返回的依然是数组
    if (res.length <= 0) {
      ctx.body = {
        code: 401,
        msg: '登录失败，用户名错误!'
      }
      return
    }
    let user = res[0]
    console.log({ user })
    let _pwd = user.pwd
    if (!bcrypt.compareSync(pwd, _pwd)) {
      ctx.body = {
        code: 401,
        msg: '登录失败，密码错误!'
      }
      return
    }
    let token = createToken(name)
    user.token = token // 更新token
    let _res = await user.save() // 更新数据库
    ctx.body = {
      code: 200,
      msg: '登录成功!',
      data: {
        id: _res._id,
        name: _res.name,
        token: _res.token
      }
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      msg: '登录失败，服务器异常!'
    }
  }
}

const getUserInfo = async (ctx, next) => {
  let { id = '' } = { ...ctx.params }
  try {
    let user = await User.findById(id)
    ctx.body = {
      code: 200,
      msg: '获取成功!',
      data: {
        id: user._id,
        name: user.name
      }
    }
  } catch (error) {
    return null
  }
}

module.exports = {
  register,
  login,
  getUserInfo
}
