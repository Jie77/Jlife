const Koa = require('koa');

const app = new Koa();

app.use(async(ctx)=>{
  // ctx.body = 'hello';
  let url = ctx.url;
  let request = ctx.request;
  let req_query = request.query;
  let req_queryString = request.querystring;

  ctx.body = {
      url,
      req_query,
      req_queryString
  }

  console.log(ctx)

});

app.listen(3000, () => {
  console.log("Listening on 3000")
})