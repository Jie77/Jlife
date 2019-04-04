const {getRequest, generateToken} = require('../util');
const {insertOne, find, updateOne} = require('../db');

exports.getJWT = async (ctx, next) => {
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
      openid: res.data.openid,
      msg: '登陆成功',
      status: true
    }
  } else{
    ctx.body = {
      token: token,
      openid: res.data.openid,
      msg: '登录失败',
      status: true
    }
  }
}