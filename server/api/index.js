const {insertOne, find, updateOne} = require('../db');
const {getRequest, generateToken, auth} = require('../util');

const getJWT = async (ctx, next) => {
  const res = await getRequest('https://api.weixin.qq.com/sns/jscode2session?appid=wx1de0e13666295217&secret=292726693fad4abaf677416cffa1e3a5&js_code='+ctx.query.code+'&grant_type=authorization_code');
  const payload = {
    openid: res.data.openid
  }
  const token = await generateToken(payload, res.data.session_key);
  const userInfo = {
    openid: res.data.openid,
    session_key: res.data.session_key
  }
  const ifExist = await find('userInfo', {openid: res.data.openid});
  // 如果不存在用户记录
  let result = null;
  if(ifExist.data.length === 0) {
    // 插入openid，以及对应的加密秘钥
    result = await insertOne('userInfo', userInfo);
  }else { 
    // 如果存在用户的openid，由于每次登陆秘钥会修改，所以更新秘钥信息
    result = await updateOne('userInfo', {openid: res.data.openid}, {$set: {session_key: res.data.session_key}});
  }
  if(result.status) {
    ctx.body = {
      token: token,
      openid: res.data.openid
    }
  } 
}

const postAdopterMessage = async (ctx, next) => {
  const data = ctx.request.body;
  const token = ctx.header.authorization;
  const ifAuth = await auth(data.adopterOpenid, token);
  if(ifAuth) {
    const ifExist = await find('notifyInfo', {openid: data.publiserOpenid, orderId: data.orderId});
    // 如果用户不存在
    if(ifExist.data.length === 0) {
      const payload = {
        openid: data.publiserOpenid,
        orderId: data.orderId,
        isFinish: data.isFinish,
        messages: [
          {
            adopterTel: data.adopterTel,
            adopterMessage: data.adopterMessage,
            isRead: false //标记是否已读
          }
        ]
      }
      const insertRes = await insertOne('notifyInfo', payload);
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

const getAdopterMessage = async(ctx, next) => {
  const openid = ctx.query.openid;
  const res = await find('notifyInfo', {openid: openid});
  ctx.body = {
    status: true,
    data: res.data
  }
}

const submitOrder = async(ctx, next) => {
  const res = await insertOne('orderLists',{...ctx.request.body});
  ctx.body = {
    status: true,
    msg: '提交成功'
  }
}

const getOrderList  = async(ctx, next) => {
  const res = await find('orderLists', {isFinish: "false"});
  console.log(res.data)
  ctx.body = {
    status: true,
    msg: '获取成功',
    data: res.data
  }
}

const getUnreadNotifyNum = async(ctx, next) => {
  // 待定。  数据库层级过深，批量修改有问题
}

const finishOrder = async(ctx, next) => {
  console.log(ctx.request.body.orderId);
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
  }
}

module.exports = {
  getJWT,
  postAdopterMessage,
  getAdopterMessage,
  submitOrder,
  getOrderList,
  getUnreadNotifyNum,
  finishOrder
}