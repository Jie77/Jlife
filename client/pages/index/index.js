//index.js
//获取应用实例
const app = getApp()

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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
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
    wx.showLoading({
      title: '数据获取中...',
    })
    wx.request({
      url: "http://127.0.0.1:3000/getOrderList",
      success: (res) => {
        wx.hideLoading({});
        wx.showToast({
          title: '获取成功',
          icon: 'success',
          duration: 2000,
          mask: true
        });
        console.log(res)
        this.setData({
          listInfo: res.data.data
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
    
    wx.request({
      url: "http://127.0.0.1:3000/postAdopterMessage",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        publiserOpenid: this.data.publiserOpenid,
        orderId: this.data.orderId,
        adopterTel: this.data.adopterTel,
        adopterMessage: this.data.adopterMessage,
        isRead: false //标记是否已读
      },
      success: (res) => {
        wx.hideLoading({})
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          mask: true,
          success: () => {
            wx.showTabBar();
            this.setData({
              showDialog: false
            })
          }
        })
      },
      fail: (err) => {
        wx.hideLoading({})
        wx.showToast({
          title: '提交失败',
          icon: 'cancel',
          duration: 2000,
          mask: true,
          success: () => {
            this.setData({
              showDialog: false
            })
          }
        })
        console.log(err)
      }
    })
  },
  openDialog: function(e) {
    wx.hideTabBar()
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
