var app = getApp();
var api = require("../../utils/api.js");

Page({
  data: {
    userInfo: {}, // 用户微信授权信息
    hasWxUserInfo: false, // 是否有微信授权
    hotMeituArr: [], // 热门评论列表
    pageIndex: 1 // 分页
  },
  onLoad: function (options) {
    let wxUserInfo = app.globalData.wx_user_info;
    if (wxUserInfo && Object.keys(wxUserInfo).length) {
      this.setData({
        userInfo: wxUserInfo,
        hasWxUserInfo: true
      })
    }
    let curPageIndex = Math.ceil(Math.random() * 5);
    // console.log(curPageIndex);
    this.setData({
      pageIndex: curPageIndex
    })
    this.getHotMeitu(curPageIndex);
  },
  onShow: function () {
    let wxUserInfo = app.globalData.wx_user_info;
    if (wxUserInfo && (wxUserInfo.nickName != this.data.userInfo.nickName)) {
      this.setData({
        userInfo: wxUserInfo,
        hasWxUserInfo: true,
        hotMeituArr: []
      })
      this.getHotMeitu();
    }
  },
  onReachBottom: function () {
    // console.log("触底");
    let cutPageIndex = this.data.pageIndex;
    if (this.data.hasWxUserInfo) {
      cutPageIndex++;
      this.setData({
        pageIndex: cutPageIndex
      })
      this.getHotMeitu(cutPageIndex);
    }
  },
  // 事件处理函数
  getUserInfo: function (e) {
    // console.log(e)
    let that = this;
    let resMsg = e.detail.errMsg;
    if (resMsg.indexOf('ok') > -1) { // 授权成功
      that.setData({
        userInfo: e.detail.userInfo,
        hasWxUserInfo: true,
        hotMeituArr: []
      })
      that.getHotMeitu();
      app.globalData.wx_user_info = e.detail.userInfo;
      wx.setStorageSync('wx_user_info', e.detail.userInfo);
      wx.showModal({
        title: '温馨提示',
        content: '恭喜您，授权成功',
        showCancel: false
      })
    } else { // 授权失败
      wx.showToast({
        title: '授权失败，影响后续使用体验',
        icon: 'none',
        duration: 2000
      })
    }
  },
  getHotMeitu: function (index) {
    let that = this;
    let newIndex = index ? index : 1;
    let data = {
      'page': newIndex
    };
    wx.showLoading({ // 显示loading图
      title: '努力加载中...',
      mask: true
    })
    api.meituApi({
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
    for (var i = 0; i < arrLen; i++) {
      arr[i].createdAt = arr[i].createdAt.split("T")[0];
    }
    let newArr = this.data.hotMeituArr;
    if (arrLen) {
      newArr = newArr.concat(arr);
    }
    if (!this.data.hasWxUserInfo) {
      newArr = newArr.slice(0, 4);
    }
    this.setData({
      hotMeituArr: newArr
    })
    wx.hideLoading(); // 隐藏loading图
  },
  likeSeeDetail: function (e) { // 点击预览大图
    // console.log(e)
    let curSrc = e.currentTarget.dataset.src || e.target.dataset.src;
    wx.previewImage({
      current: curSrc, // 当前显示图片的http链接
      urls: [curSrc] // 需要预览的图片http链接列表
    })
  }
})