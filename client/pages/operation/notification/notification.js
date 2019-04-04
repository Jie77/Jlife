const app = getApp();
const baseUrl = app.globalData.baseUrl;
const request = require('../../../utils/request');

Page({
  data: {
    notifications: [],
    openid: '',
  },
  refresh: function() {
    wx.showLoading({
      title: '数据获取中...',
    })
    request({
      path: '/getAdopterMessage',
      success: (res) => {
        wx.hideLoading({});
        this.setData({
          notifications: res.data.data
        })
      },
      fail: () => {
        wx.hideLoading({});
      }
    })
  },
  onLoad: function() {
    this.refresh() 
  },
  finishOrder: function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    wx.showLoading({
      title: '请求提交中...',
    })
    request({
      path: '/finishOrder',
      method: 'post',
      data: {
        orderId: orderId
      },
      success: (res) => {
        this.refresh();
        wx.hideLoading({});
      },
      fail: () => {
        wx.hideLoading({})
      }
    })
  }
})