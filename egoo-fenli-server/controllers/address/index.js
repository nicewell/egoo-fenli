// const xss = require('xss')
const _ = require('lodash')
const Address = require('../../db').Address

const getAddress = async (ctx, next) => {
  let { size = 10, page = 1 } = ctx.query
  try {
    let options = {
      skip: Number((page - 1) * size),
      limit: Number(size),
      sort: { time: '-1' }
    }
    let res = await Address.find({}, null, options)
    let total = await Address.countDocuments()
    ctx.body = {
      code: 200,
      msg: '获取成功!',
      data: {
        list: res,
        pagination: {
          total,
          page: Number(page),
          size: Number(size)
        }
      }
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      code: 500,
      msg: '获取失败，服务器异常，请稍后再试!'
    }
  }
}

const checkAlias = async ctx => {
  let { name, path, alias } = ctx.request.body
  if (!(name.length > 0 && path.length > 0 && alias.join(',').length > 0)) {
    ctx.body = {
      code: 401,
      msg: '添加失败，请填写完整表单!'
    }
    return false
  }
  let _list = await Address.find({})
  let _arrAlias = []
  _list.forEach((item, index) => {
    _arrAlias.push(...item.alias)
  })
  let _filterArrAlias = _.difference(alias, _arrAlias)
  if (!(_filterArrAlias.length === alias.length)) {
    ctx.body = {
      code: 401,
      msg: '添加失败，别名已被占用!'
    }
    return false
  }
  return true
}

const addAddress = async (ctx, next) => {
  try {
    let isChecked = await checkAlias(ctx)
    if (!isChecked) {
      return
    }
    let { name, path, alias } = ctx.request.body
    let address = new Address({
      // user: ctx._id,
      name,
      path,
      alias
    })
    let res = await address.save()
    if (res._id) {
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: res
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '添加失败'
      }
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '添加失败，服务器异常，请稍后再试!'
    }
  }
}

const editAddress = async (ctx, next) => {
  let _id = ctx.params.id
  try {
    let { name, path, alias } = ctx.request.body
    let isChecked = await checkAlias(ctx)
    if (!isChecked) {
      return
    }
    let res = await Address.findOneAndUpdate({ _id }, { name, path, alias })
    if (res === null) {
      ctx.body = {
        code: 401,
        msg: '编辑失败，未查询到!'
      }
      return
    }
    ctx.body = {
      code: 200,
      msg: '编辑成功!',
      data: res
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      msg: '编辑失败，服务器异常，请稍后再试!'
    }
  }
}

const delAddress = async (ctx, next) => {
  let _id = ctx.params.id
  try {
    let res = await Address.findByIdAndDelete(_id)
    if (res === null) {
      ctx.body = {
        code: 401,
        msg: '删除失败，未查询到!'
      }
      return
    }
    ctx.body = {
      code: 200,
      msg: '删除成功!',
      data: res
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '删除失败，服务器异常，请稍后再试!'
    }
  }
}

module.exports = {
  getAddress,
  addAddress,
  editAddress,
  delAddress
}
