module.exports = {
  // 密码加密级别
  SaltRounds: 10,
  // token 加密字符串
  TOKEN_ENCODE_STR: 'TOKEN_RECSET',
  // 非get请求验证token
  URL_PASS: ['/api/login', '/api/register']
}
