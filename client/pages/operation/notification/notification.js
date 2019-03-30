const app = getApp();
const baseUrl = app.globalData.baseUrl;

Page({
  data: {
    notifications: [],
    openid: '',
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
      url: baseUrl + "/getAdopterMessage",
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
  },
  finishOrder: function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    wx.showLoading({
      title: '请求提交中...',
    })
    wx.request({
      url: baseUrl + "/finishOrder",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        orderId: orderId
      },
      success: (res) => {
        this.onLoad();
        wx.hideLoading({});
        if (res.data.status) {
          wx.showToast({
            title: '订单完成',
            icon: 'success',
            duration: 2000,
            mask: true
          })
        }else {
          wx.showToast({
            title: '提交失败',
            icon: 'cancel',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: (err) => {
        wx.hideLoading({})
        console.log(err)
      }
    })
  }
})