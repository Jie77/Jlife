const { generateOrderId } = require('../../../utils/util');
const request = require('../../../utils/request');
const app = getApp();

Page({
  data: {
    title: "",
    detail: "",
    exceptStartTime: "12:13",
    exceptEndTime: "13:13",
    validStartTime: "12:13",
    validEndTime: "13:13",
    price: null
  },
  handleTitleChange: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  handleDetailChange: function(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  handlePriceChange: function(e) {
    this.setData({
      price: e.detail.value
    })
  },
  handleExceptStartTimeChange: function(e) {
    this.setData({
      exceptStartTime: e.detail.value
    })
  },
  handleExceptEndTimeChange: function(e) {
    this.setData({
      exceptEndTime: e.detail.value
    })
  },
  handleValidStartTimeChange: function(e) {
    this.setData({
      validStartTime: e.detail.value
    })
  },
  handleValidEndTimeChange: function(e) {
    this.setData({
      validEndTime: e.detail.value
    })
  },
  handleSubmit: function(e) {
    wx.showLoading({
      title: '数据提交中...',
    })
    request({
      path: '/submitOrder',
      method: 'post',
      data: {
        title: this.data.title,
        detail: this.data.detail,
        exceptStartTime: this.data.exceptStartTime,
        exceptEndTime: this.data.exceptEndTime,
        validStartTime: this.data.validStartTime,
        validEndTime: this.data.validEndTime,
        price: this.data.price,
        orderId: generateOrderId(),
        publiserOpenid: app.globalData.openid,
        isFinish: false,
        notifyNum: 0
      },
      success: () => {
        wx.hideLoading({});
        setTimeout(() => {
          wx.switchTab({
            url: '../../../pages/index/index'
          })
        }, 2000)
      },
      fail: () => {
        wx.hideLoading({});
      }
    })
  }
})