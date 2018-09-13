var app = getApp();
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) { },
  getUserInfo: function (e) {
    // console.log(e)
    let resMsg = e.detail.errMsg;
    if (resMsg.indexOf('ok') > -1) { // 授权成功
      app.globalData.wx_user_info = e.detail.userInfo;
      wx.setStorageSync('wx_user_info', e.detail.userInfo);
      wx.showModal({
        title: '温馨提示',
        content: '恭喜您，授权成功',
        showCancel: false,
        success: function () {
          util.goBack();
        }
      })
    } else { // 授权失败
      wx.showToast({
        title: '授权失败，影响后续使用体验',
        icon: 'none',
        duration: 2000
      })
    }
  },
  goBackEvn: function () {
    util.goBack();
  }
})