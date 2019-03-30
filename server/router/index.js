const Router = require('koa-router');
const router = new Router();
const api = require('../api');

router.get('/getJWT', api.getJWT);
router.post('/postAdopterMessage', api.postAdopterMessage);
router.get('/getAdopterMessage', api.getAdopterMessage);
router.post('/submitOrder', api.submitOrder);
router.get('/getOrderList', api.getOrderList);
router.get('/getUnreadNotifyNum', api.getUnreadNotifyNum);
router.post('/finishOrder', api.finishOrder);

module.exports = router;