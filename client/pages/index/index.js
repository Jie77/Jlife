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
        desc: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦阿拉啦啦啦啦',
        price: 10,
        exceptTime: '15:00 - 16:00',
        validTime: '12:00 - 14:30',
        id: 1
      },
      {
        title: '标题二',
        desc: '呱呱呱呱呱',
        price: 10,
        exceptTime: '15:00 - 16:00',
        validTime: '',
        id: 2
      },{
        title: '标题三',
        desc: '呱呱呱呱呱',
        exceptTime: '15:00 - 16:00',
        validTime: '12:00 - 14:30',
        price: 10,
        id:3
      },
      {
        title: '标题四',
        desc: '呱呱呱呱呱',
        exceptTime: '15:00 - 16:00',
        validTime: '12:00 - 14:30',
        price: 10,
        id:4
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

  handleConnectRes: function(e) {
    wx.request({
      url: "http://127.0.0.1:3000/test",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        openid: app.globalData.openid
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
