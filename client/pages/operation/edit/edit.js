const { generateOrderId } = require('../../../utils/util');
const app = getApp()
const baseUrl = app.globalData.baseUrl;

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
    wx.request({
      url: baseUrl + "/submitOrder",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
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
      success: (res) => {
        wx.hideLoading({});
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          mask: true,
          success: () => {
            wx.showTabBar();
            setTimeout(() => {
              wx.switchTab({
                url: '../../../pages/index/index'
              })
            }, 2000)
          }
        })
      },
      fail: (err) => {
        wx.hideLoading({})
        wx.showToast({
          title: '提交失败',
          icon: 'cancel',
          duration: 2000,
          mask: true
        })
        console.log(err)
      }
    })
  }
})