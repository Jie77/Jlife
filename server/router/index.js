const Router = require('koa-router');
const router = new Router();
const {getJWT} = require('../api/login');
const {postAdopterMessage, getOrderList} = require('../api/index');
const {submitOrder} = require('../api/edit');
const {getAdopterMessage, finishOrder, removeOrder} = require('../api/notifycation')

router.get('/getJWT', getJWT);
router.post('/postAdopterMessage', postAdopterMessage);
router.get('/getAdopterMessage', getAdopterMessage);
router.post('/submitOrder', submitOrder);
router.get('/getOrderList', getOrderList);
// router.get('/getUnreadNotifyNum', api.getUnreadNotifyNum);
router.post('/finishOrder', finishOrder);
router.post('/removeOrder', removeOrder)

module.exports = router;