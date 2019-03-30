const app = getApp();
const baseUrl = app.globalData.baseUrl;

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
  },
  // onShow: function() {
  //   wx.request({
  //     url: baseUrl + "/getUnreadNotifyNum",
  //     success: (res) => {
  //       console.log(res);
  //     }
  //   })
  // }
})