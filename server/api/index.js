const {insertOne, find, updateOne} = require('../db');
const {auth} = require('../util');


exports.postAdopterMessage = async (ctx, next) => {
  const data = ctx.request.body;
  const token = ctx.header.authorization;
  const ifAuth = await auth(data.adopterOpenid, token);
  if(ifAuth) {
    const orderPayload = {
      publiserOpenid: data.publiserOpenid,
      orderId: data.orderId
    }
    const order = await find('orderLists', orderPayload);
    let notifyNum =  order.data[0].notifyNum + 1; // 在更新语句中执行自加操作无效，所以提前加1
    const ifExist = await find('notifyInfo', {openid: data.publiserOpenid, orderId: data.orderId});
    // 如果用户不存在
    if(ifExist.data.length === 0) {
      const payload = {
        openid: data.publiserOpenid,
        orderId: data.orderId,
        isFinish: false,
        messages: [
          {
            adopterTel: data.adopterTel,
            adopterMessage: data.adopterMessage,
            isRead: false //标记是否已读
          }
        ]
      }
      const insertRes = await insertOne('notifyInfo', payload);
      const updateNotifyNumRes =  await updateOne('orderLists', orderPayload, { $set: { notifyNum : notifyNum} });
      if (insertRes.status) {
        ctx.body = {
          status: true,
          msg: '提交成功'
        }
      }else {
        ctx.body = {
          status: false,
          msg: '提交失败'
        }
      }
      
    }else {
      const whereData = {
        openid: data.publiserOpenid,
        orderId: data.orderId
      }
      const payload = {
        adopterTel: data.adopterTel,
        adopterMessage: data.adopterMessage,
        isRead: false
      }
      const updateRes = await updateOne('notifyInfo', whereData, {$addToSet: {messages: payload}});
      const updateNotifyNumRes =  await updateOne('orderLists', orderPayload, { $set: { notifyNum : notifyNum} })
      if (updateRes.status) {
        ctx.body = {
          status: true,
          msg: '提交成功'
        }
      }else {
        ctx.body = {
          status: false,
          msg: '提交失败'
        }
      }
    }
  }else{
    ctx.throw(403)
  }
}

exports.getOrderList  = async(ctx, next) => {
  const token = ctx.header.authorization;
  const openid = ctx.query.openid;
  const ifAuth = await auth(openid, token);
  if(!ifAuth) {
    ctx.throw(403)
  }
  const res = await find('orderLists', {isFinish: false});
  if(res.status) {
    ctx.body = {
      status: true,
      msg: '获取成功',
      data: res.data
    }
  }else {
    ctx.body = {
      status: false,
      msg: '获取失败',
      data: res.data
    }
  }
  
}
