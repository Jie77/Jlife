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
    wx.navigateTo({
      url: "notification/notification"
    })
  }
})