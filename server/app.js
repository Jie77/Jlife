const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('koa2-cors');
const {insertOne, find, updateOne} = require('./db');
const {getRequest, generateToken, auth} = require('./util')
const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors({
  origin: '*'
}))

router.get('/getJWT', async (ctx, next) => {
  const res = await getRequest('https://api.weixin.qq.com/sns/jscode2session?appid=wx1de0e13666295217&secret=e5e1ad245517f51d5ca2f564f51e6b98&js_code='+ctx.query.code+'&grant_type=authorization_code');
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
  if(ifExist.res.length === 0) {
    // 插入openid，以及对应的加密秘钥
    result = await insertOne('userInfo', userInfo);
  }else { 
    // 如果存在用户的openid，由于每次登陆秘钥会修改，所以更新秘钥信息
    result = await updateOne('userInfo', {openid: res.data.openid}, {session_key: res.data.session_key});
  }
  if(result.status) {
    ctx.body = {
      token: token,
      openid: res.data.openid
    }
  }
  
})

router.post('/test', async (ctx, next) => {
  console.log(ctx.request.body)
  const openid = ctx.request.body.publiserOpenid;
  const token = ctx.header.authorization;
  const ifAuth = await auth(openid, token);
  console.log(ifAuth);
})

router.post('/submitOrder', async(ctx, next) => {
  const res = await insertOne('userOrder',{...ctx.request.body});
  console.log(res);
})

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Listening on 3000")
})