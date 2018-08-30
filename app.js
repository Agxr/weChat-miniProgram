//app.js
var api = require('/utils/api.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7a556909ccb2818e&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
        //   success: function (res) {
        //     console.log(res)
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.wx_user_info = res.userInfo;
              wx.setStorageSync('wx_user_info', res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        } else { // 未授权跳到授权页
          wx.navigateTo({
            url: '/pages/authwxinfo/authwxinfo'
          })
        }
      }
    })
  },
  globalData: {
    wx_user_info: null, // 微信授权获取的信息
    userId: 0 // 用户id
  }
})