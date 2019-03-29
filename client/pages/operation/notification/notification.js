const app = getApp();

Page({
  data: {
    notifications: [],
    openid: ''
  },
  onLoad: function() {
    const id = wx.getStorageSync('logs') || [];
    if(id) {
      this.setData({
        openid: id
      })
    }
    wx.showLoading({
      title: '数据获取中...',
    })
    wx.request({
      url: "http://127.0.0.1:3000/getAdopterMessage",
      data: {
        openid: app.globalData.openid
      },
      success: (res) => {
        wx.hideLoading({});
        wx.showToast({
          title: '获取成功',
          icon: 'success',
          duration: 2000,
          mask: true
        });
        this.setData({
          notifications: res.data.data
        })
      },
      fail: (err) => {
        wx.hideLoading({});
        wx.showToast({
          title: '获取失败',
          icon: 'cancel',
          duration: 2000,
          mask: true
        })
        console.log(err)
      }
    })
  }
})