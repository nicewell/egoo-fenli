const mongoose = require('mongoose')
let url =
  process.env.NODE_ENV === 'production'
    ? 'mongodb://fenli-db/fenli'
    : 'mongodb://localhost:27017/fenli'
const db = mongoose.connect(url, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connection success!')
  }
})
const Schema = mongoose.Schema

// 验证码
let codeSchema = new Schema({
  token: String,
  code: String
})

// 用户
let userSchema = new Schema({
  /**
   * 用户名
   */
  name: String,
  /**
   * 用户密码
   */
  pwd: String,
  /**
   * Token
   */
  token: {
    type: String,
    default: ''
  }
})

// 分离地址
let addressSchema = new Schema({
  /**
   * 用户id
   */
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User' // 映射成User的_id,以此_id可查询到用户信息
  // },
  /**
   * 游戏名称
   */
  name: String,
  /**
   * 分离地址
   */
  path: String,
  /**
   * 游戏简称
   */
  alias: Array,
  /**
   * 时间戳
   */
  time: {
    type: Date,
    default: Date.now
  }
})

exports.Code = mongoose.model('Code', codeSchema)
exports.User = mongoose.model('User', userSchema)
exports.Address = mongoose.model('Address', addressSchema)
