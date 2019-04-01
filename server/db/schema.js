const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifyInfo = new Schema({
  openid: String,
  orderId: String,
  isFinish: Boolean,
  messages: Array
});
const orderLists = new Schema({
  title: String, 
  detail: String, 
  exceptStartTime: String, 
  exceptEndTime: String, 
  validStartTime: String, 
  validEndTime: String, 
  price: String, 
  orderId: String, 
  publiserOpenid: String, 
  isFinish: Boolean,
  notifyNum: Number
});
const userInfo = new Schema({
  openid: String,
  session_key: String
});

module.exports = {
  notifyInfo,
  orderLists,
  userInfo
}