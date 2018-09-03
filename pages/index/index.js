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
    if (wxUserInfo && wxUserInfo.nickName) {
      this.setData({
        userInfo: wxUserInfo,
        hasWxUserInfo: true
      })
    }
  },
  onReachBottom: function () {
    // console.log("触底");
    let cutPageIndex = this.data.pageIndex;
    this.setData({
      pageIndex: cutPageIndex
    })
    this.getData(cutPageIndex);
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '林下夕影',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
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
    wx.showLoading({ // 显示loading图
      title: 'Loading...',
      mask: true
    })
    api.satinGodApi({
      data,
      success: function (res) {
        // console.log(res);
        // let arr = res.data.data;
        that.getCleanData(res.data.data); // 整理数据
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '加载失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
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
    let newArr = this.data.hotCommonArr;
    if (arrLen) {
      newArr = newArr.concat(arr);
    }
    this.setData({
      hotCommonArr: newArr
    })
    wx.hideLoading(); // 隐藏loading图
  },
  goCommonDetail: function (e) { // 点击进去详情页
    // console.log(e)
    let curSource = e.currentTarget.dataset.soureid || e.target.dataset.soureid;
    let curImg = e.currentTarget.dataset.img || e.target.dataset.img;
    let curVideo = e.currentTarget.dataset.video || e.target.dataset.video;
    wx.navigateTo({
      url: '/pages/commondetail/commondetail?sourceid=' + curSource + '&img=' + curImg + '&video=' + curVideo
    })
  },
  seeBigImg: function (e) { // 点击预览大图
    // console.log(e)
    let curSrc = e.currentTarget.dataset.src || e.target.dataset.src;
    wx.previewImage({
      current: 'curSrc', // 当前显示图片的http链接
      urls: [curSrc] // 需要预览的图片http链接列表
    })
  }
})
