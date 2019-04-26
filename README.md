# egoo-cli

> 1. 解放双手，解决手动分离麻烦易错

## cli 开发发布 npm

> 命令行工具

- 命令行操作
- 发布 npm

## admin 后台管理页面开发

> 管理页面

- 登录验证
- 数据操作

## admin 后台 api(Koa)

> Koa 处理后台

- Koa+MongoDB

### 接口文档

> url 前缀`/api`

#### 密码登录

- 接口说明：密码登录
- 接口地址：`/login`
- 请求参数
  | 参数名称 | 类型 | 是否必要 |
  | :----| :----: | :---- |
  | name | String | Y |
  | pwd | String | Y |
- 请求示例

```js
{
  "name":"admin",
  "pwd":"123456"
}
```

- 返回结果
  | 参数名称 | 类型 | 是否必要 |
  | :---- | :----: | :---- |
  | code | Number | Y |
  | msg | String | Y |
  | data | Object | Y |
  | &emsp;id | String | Y |
  | &emsp;name | String | Y |
  | &emsp;token | String | Y |
- 示例

```js
{
  "code": 200,
  "msg": "登录成功!",
  "data": {
    "id": "5cc2b548ce3c68117077b45e",
    "name": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJkdWFuZyIsImlhdCI6MTU1NjI2ODkzMCwiZXhwIjoxNTU2MjcyNTMwfQ"
  }
}
```
