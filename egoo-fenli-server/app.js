const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const app = new Koa()
const port = process.env.PORT || 3000

// 请求日志中间件
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// bodyParser
app.use(
  bodyParser({
    enableTypes: ['json', 'form', 'text']
  })
)

// 添加 token 验证中间件
const { checkToken } = require('./utils/token')
app.use(checkToken)

// 异常捕获统一处理中间件
const { catchErr } = require('./utils/catchErr')
app.use(catchErr)

// 开放静态资源
// http://127.0.0.1:3000/home.html 而不是 http://127.0.0.1:3000/www/home.html
app.use(serve(path.join(__dirname) + '/www'))

// routes
const router = require('./routes')
app.use(router.routes(), router.allowedMethods())

app.listen(port, err => {
  if (err) {
    console.log(err)
  }
  console.log(`@ http://127.0.0.1:${port}`)
})
