const {find, updateOne} = require('../db');
const {auth} = require('../util');

exports.finishOrder = async(ctx, next) => {
  const token = ctx.header.authorization;
  const ifAuth = await auth(ctx.request.body.openid, token);
  if(!ifAuth) {
    ctx.throw(403)
  }
  const whereData = {
    orderId: ctx.request.body.orderId
  }
  const res1 = await updateOne('orderLists', whereData, {$set: {isFinish: true}});
  const res2 = await updateOne('notifyInfo', whereData, {$set: {isFinish: true}});
  if(res1.status && res2.status) {
    ctx.body = {
      status: true,
      msg: '订单完成'
    }
  }else {
    ctx.body = {
      status: false,
      msg: '操作失败'
    }
  }
}

exports.getAdopterMessage = async(ctx, next) => {
  const openid = ctx.query.openid;

  const token = ctx.header.authorization;
  const ifAuth = await auth(openid, token);
  if(!ifAuth) {
    ctx.throw(403)
  }
  const res = await find('notifyInfo', {openid: openid});
  if (res.status) {
    ctx.body = {
      status: true,
      data: res.data,
      msg: '获取成功'
    }
  }else {
    ctx.body = {
      status: false,
      msg: '获取失败'
    }
  }
}
