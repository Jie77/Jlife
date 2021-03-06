//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        if(res.code) {
          wx.request({
            url: this.globalData.baseUrl + "/getJWT",
            data: {
              code: res.code
            },
            success: (res) => {
              if(res.data.status) {
                this.globalData.openid = res.data.openid;
                this.globalData.token = res.data.token;
                this.globalData.isGetToken = true;
                wx.setStorageSync('openid', res.data.openid);
                this.userTokenReadyCallback()
              }else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                  mask: true
                })
              }
            }
          })
        } else {
          console.log('登录失败')
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: '',
    token: '',
    isGetToken: false,
    // baseUrl: 'http://192.168.5.107:3000',
    baseUrl: 'http://127.0.0.1:3000'
    // baseUrl: "http://10.177.102.230:3000"
  }
})