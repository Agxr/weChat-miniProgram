//index.js
//获取应用实例
var app = getApp();
var api = require('../../utils/api.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}, // 用户微信授权信息
    hasWxUserInfo: false, // 是否有微信授权
    hotCommonArr: [], // 热门评论列表
    pageIndex: 1 // 分页
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
  onReachBottom: function () {
    // console.log("触底");
    let cutPageIndex = this.data.pageIndex;
    cutPageIndex++;
    this.setData({
      pageIndex: cutPageIndex
    })
    this.getData(cutPageIndex);
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
    wx.showLoading({ // 显示loading图
      title: '正在努力加载中...',
      mask: true
    })
    api.satinGodApi({
      data,
      success: function (res) {
        // console.log(res);
        // let arr = res.data.data;
        that.getCleanData(res.data.data); // 整理数据
      }
    })
  },
  getCleanData: function (arr) {
    let arrLen = arr.length;
    for(var i = 0; i < arrLen; i++) {
      arr[i].passtime = arr[i].passtime.substring(0, 10);
      if(arr[i].username.length > 15) {
        arr[i].username = arr[i].username.substring(0, 15) + '...';
      }
    }
    let newArr = this.data.hotCommonArr
    if (arr.length) {
      newArr = newArr.concat(arr);
    }
    this.setData({
      hotCommonArr: newArr
    })
    wx.hideLoading(); // 隐藏loading图
  }
})
