const {insertOne} = require('../db');
const {auth} = require('../util');

exports.submitOrder = async(ctx, next) => {
  const token = ctx.header.authorization;
  const data = ctx.request.body;
  const ifAuth = await auth(data.openid, token);
  if(!ifAuth) {
    ctx.throw(403)
  }
  const payload1 = {
    ...ctx.request.body,
    isFinish: false,
    notifyNum: 0
  }

  const payload2 = {
    openid: data.publiserOpenid,
    orderId: data.orderId,
    isFinish: false,
    messages: []
  }
  const res = await insertOne('orderLists', payload1);
  const insertRes = await insertOne('notifyInfo', payload2);
  if(res.status && insertRes.status) {
    ctx.body = {
      status: true,
      msg: '提交成功'
    }
  }else {
    ctx.body = {
      status: true,
      msg: '提交失败'
    }
  }
}