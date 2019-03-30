const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const app = new Koa();
const router = require('./router');

app.use(koaBody());
app.use(cors({
  origin: '*'
}));

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Listening on 3000")
})