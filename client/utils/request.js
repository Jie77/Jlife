const app = getApp();
const baseUrl = app.globalData.baseUrl;

const request = (obj) => {
  let args = {
    path: '',
    method: 'get',
    data: {},
    success: null,
    fail: null,
    ...obj
  }
  let header = null;
  if(args.method.toLowerCase() === 'post') {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': app.globalData.token
    }
  }else if(args.method.toLowerCase() === 'get') {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': app.globalData.token
    }
  }
  
  wx.request({
    url: baseUrl + args.path,
    method: args.method,
    header: header,
    data: {
      ...args.data,
      openid: app.globalData.openid,
    },
    success: (res) => {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 1000,
        mask: true,
        success: () => {
          if(typeof args.success === 'function') {
            args.success(res)
          }
        }
      })
    },
    fail: (err) => {
      wx.showToast({
        title: '请求发生错误',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: () => {
          if(typeof args.fail === 'function') {
            args.fail(err)
          }
        }
      })
      console.log(err)
    }
  })
}

module.exports = request;



