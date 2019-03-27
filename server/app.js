const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('koa2-cors');
const {insertOne, find, updateOne, deleteOne} = require('./db');
const {getRequest, generateToken, verifyToken} = require('./util')
const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors({
  origin: '*'
}))

router.get('/getJWT', async (ctx, next) => {
  const res = await getRequest('https://api.weixin.qq.com/sns/jscode2session?appid=wx1de0e13666295217&secret=a4fe32a78507cf3061167c9fd6339cca&js_code='+ctx.query.code+'&grant_type=authorization_code');
  const payload = {
    openid: res.data.openid
  }
  const token = await generateToken(payload, res.data.session_key);
  const userInfo = {
    openid: res.data.openid,
    session_key: res.data.session_key
  }
  const result = await insertOne('userInfo', userInfo);
  if(result.status) {
    ctx.body = {
      token: token,
      openid: res.data.openid
    }
  }
})

router.post('/test', async (ctx, next) => {
  const openid = ctx.request.body.openid;
  const token = ctx.header.authorization;
  const collection = await find('userInfo', {openid: openid});
  const privateKey = collection.res[0].session_key;
  const res = await verifyToken(privateKey, openid, token);
  console.log(res);
})

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Listening on 3000")
})