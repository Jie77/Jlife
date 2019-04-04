//index.js
//获取应用实例
const app = getApp();
const baseUrl = app.globalData.baseUrl;
const request = require('../../utils/request')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showDialog: false,
    JWT: '',
    openid: '',
    keyWordValue: '',  // keyword
    adopterTel: '',
    adopterMessage: '',
    publiserOpenid: '',
    orderId: '',
    pageTitle: '列表信息',
    listInfo: []

  },
  onPullDownRefresh() {
    this.refresh(wx.stopPullDownRefresh)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  refresh: function(callback) {
    wx.showLoading({})
    request({
      path: '/getOrderList',
      success: (res) => {
        wx.hideLoading({})
        this.setData({
          listInfo: res.data.data
        })
        if(typeof callback === 'function') {
          callback();
        }
      },
      fail: () => {
        wx.hideLoading({})
        if(typeof callback === 'function') {
          callback();
        }
      },
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    app.userTokenReadyCallback = () => {
      this.refresh()
    }
  },
  onShow: function() {
    this.refresh()  // 第一次会报错，因为还没获取到openid
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  HandleKeyInput: function(e) {
    this.setData({
      keyWordValue: e.detail.value
    })
  },
  handleTelInput: function(e) {
    this.setData({
      adopterTel: e.detail.value
    })
  },
  handleMessageInput: function(e) {
    this.setData({
      adopterMessage: e.detail.value
    })
  },
  handleConnect: function(e) {
    console.log(e.currentTarget.dataset)
    wx.showLoading({
      title: '请求提交中...',
    })
    request({
      path: '/postAdopterMessage',
      method: 'post',
      data: {
        publiserOpenid: this.data.publiserOpenid,
        orderId: this.data.orderId,
        adopterTel: this.data.adopterTel,
        adopterMessage: this.data.adopterMessage,
        isRead: false, //标记是否已读
        adopterOpenid: app.globalData.openid,
        messageId: Date.now(),
        isFinish: false
      },
      success: () => {
        wx.hideLoading({});
        setTimeout(() => {
          this.refresh()
        }, 1000)
        wx.showTabBar();
        this.setData({
          showDialog: false
        })
      },
      fail: () => {
        wx.hideLoading({})
        this.setData({
          showDialog: false
        })
      }
    })
  },
  openDialog: function(e) {
    wx.hideTabBar()
    console.log(e.currentTarget.dataset)
    this.setData({
      showDialog: true,
      publiserOpenid: e.currentTarget.dataset.publiserOpenid,
      orderId: e.currentTarget.dataset.orderId,
    })
  },
  closeDialog: function() {
    wx.showTabBar();
    this.setData({
      showDialog: false
    })
  }

})
