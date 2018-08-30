//index.js
//获取应用实例
var app = getApp();
var api = require('../../utils/api.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasWxUserInfo: false
  },
  onLoad: function () {
    let that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              that.setData({
                userInfo: res.userInfo,
                hasWxUserInfo: true
              })
              app.globalData.wx_user_info = res.userInfo;
              wx.setStorageSync('wx_user_info', res.userInfo);
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    })
    // 页面初始值
    that.getData();
  },
  onShow: function () {
    let wxUserInfo = app.globalData.wx_user_info;
    if (wxUserInfo) {
      this.setData({
        userInfo: wxUserInfo,
        hasWxUserInfo: true
      })
    }
  },
  // 事件处理函数
  goMyInfoEvn: function () { // 点击用户头像跳到个人主页
    wx.navigateTo({
      url: '/pages/myinfo/myinfo'
    })
  },
  getData: function (index) {
    let that = this;
    let newIndex = index ? index : 1;
    let data = {
      'type': 1,
      'page': newIndex
    };
    api.satinGodApi({
      data,
      success: function (res) {
        console.log(res)
        let arr = res.data.data;
      }
    })
  }
})
