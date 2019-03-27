const app = getApp()

Page({
  data: {
    unReadNum: 3
  },
  toEditPage() {
    wx.navigateTo({
      url: "edit/edit"
    })
  },
  toNotifyPage() {
    wx.request({
      url: "http://127.0.0.1:3000",
      data: {
        kk: '123'
      }
    })
  }
})