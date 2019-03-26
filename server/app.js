const Koa = require('koa');
const koaBody = require('koa-body')
const app = new Koa();

app.use(koaBody());
app.use(async(ctx)=>{
  // ctx.body = 'hello';
  let url = ctx.url;
  let request = ctx.request;
  let req_query = request.query;
  let req_queryString = request.querystring;

  console.log(ctx.request.body)
  ctx.body = {
      url,
      req_query,
      req_queryString
  }

  

});

app.listen(3000, () => {
  console.log("Listening on 3000")
})