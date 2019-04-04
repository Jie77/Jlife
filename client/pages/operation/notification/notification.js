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
  handleOrder: function(path, e) {
    const orderId = e.currentTarget.dataset.orderId;
    wx.showLoading({
      title: '请求提交中...',
    })
    request({
      path: path,
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
  },
  finishOrder: function(e) {
    this.handleOrder('/finishOrder', e);
  },
  removeOrder: function(e) {
    this.handleOrder('/removeOrder', e);
  }
})