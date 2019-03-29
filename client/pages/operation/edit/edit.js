const app = getApp()

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
    wx.request({
      url: "http://127.0.0.1:3000/submitOrder",
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
        orderId: Date.now(),
        openid: app.globalData.openid
      }
    })
  }
})