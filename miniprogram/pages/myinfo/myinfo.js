var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserPhone: false,
    userPhone: '认证手机'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.wx_user_info
    })
  },
  // 事件处理函数
  getPhoneNumber: function (e) { // 获取用户授权手机号
    console.log(e)
  },
  calling: function () { // 拨打电话
    wx.makePhoneCall({
      phoneNumber: '15832515739',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
})