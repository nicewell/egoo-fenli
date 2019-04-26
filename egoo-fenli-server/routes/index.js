const router = require('koa-router')()
router.prefix('/api')
const controller = require('../controllers')

router
  .get('/getCode', controller.code.getCode) // 获取验证码

  .post('/register', controller.user.register) // 用户注册
  .post('/login', controller.user.login) // 用户登录
  .get('/getUserInfo/:id', controller.user.getUserInfo) // 获取用户信息

  .post('/addAddress', controller.address.addAddress) // 添加分离地址
  .delete('/delAddress/:id', controller.address.delAddress) // 删除分离地址
  .put('/editAddress/:id', controller.address.editAddress) // 编辑分离地址
  .get('/getAddress', controller.address.getAddress) // 获取分离地址

module.exports = router
