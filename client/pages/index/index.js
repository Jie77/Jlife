//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    JWT: '',
    openid: '',
    inputValue: '',  // keyword
    pageTitle: '列表信息',
    listInfo: [
      {
        title: '标题一',
        detail: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦阿拉啦啦啦啦',
        price: 10,
        exceptStartTime: '15:00',
        exceptEndTime: '16:00',
        validStartTime: '12:00',
        validEndTime: '15:00',
        orderId: 131312,
        publiserOpenid: 'oj3sb5Jez996YRO702Dydau0OCnU'
      },
      {
        title: '标题二',
        detail: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦阿拉啦啦啦啦',
        price: 10,
        exceptStartTime: '15:00',
        exceptEndTime: '16:00',
        validStartTime: '12:00',
        validEndTime: '15:00',
        orderId: 131365,
        publiserOpenid: 'oj3sb5Jez996YRO702Dydau0OCnU'
      },{
        title: '标题三',
        detail: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦阿拉啦啦啦啦',
        price: 10,
        exceptStartTime: '15:00',
        exceptEndTime: '16:00',
        validStartTime: '12:00',
        validEndTime: '15:00',
        orderId: 131387,
        publiserOpenid: 'oj3sb5Jez996YRO702Dydau0OCnU'
      },{
        title: '标题四',
        detail: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦阿拉啦啦啦啦',
        price: 10,
        exceptStartTime: '15:00',
        exceptEndTime: '16:00',
        validStartTime: '12:00',
        validEndTime: '15:00',
        orderId: 131363,
        publiserOpenid: 'oj3sb5Jez996YRO702Dydau0OCnU'
      }
    ]

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.login({
      success(res) {
        if(res.code) {
          wx.request({
            url: "http://127.0.0.1:3000/getJWT",
            data: {
              code: res.code
            },
            success: function(res) {
              console.log(res);
              console.log(res.data.openid);
              app.globalData.openid = res.data.openid;
              app.globalData.token = res.data.token;
            }
          })
        } else {
          console.log('登录失败')
        }
      }
    })
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  handleConnect: function(e) {
    console.log(e.currentTarget.dataset)
    wx.request({
      url: "http://127.0.0.1:3000/test",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        publiserOpenid: e.currentTarget.dataset.publiserOpenid,
        orderId: e.currentTarget.dataset.orderId
      },
      success: function(res) {
        console.log('success')
        console.log(res)
      },
      fail: function(err) {
        console.log(err)
      }
    })

    
  }

})
