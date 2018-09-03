var app = getApp();
var api = require("../../utils/api.js");

Page({
  data: {
    userInfo: {}, // 用户微信授权信息
    hasWxUserInfo: false, // 是否有微信授权
    newsArrObj: [],
    newsArrSel: [],
    selTabIndex: 'tech', // 选中的tab变量
    newsLinkStr: 'https://www.gexuerui.top', // 新闻链接地址
    newsLinkFlag: false
  },
  onLoad: function (options) {
    let wxUserInfo = app.globalData.wx_user_info;
    if (wxUserInfo && Object.keys(wxUserInfo).length) {
      this.setData({
        userInfo: wxUserInfo,
        hasWxUserInfo: true
      })
    }
    this.getNewsFun();
  },
  onShow: function () {
    let wxUserInfo = app.globalData.wx_user_info;
    if (wxUserInfo && (wxUserInfo.nickName != this.data.userInfo.nickName)) {
      this.setData({
        userInfo: wxUserInfo,
        hasWxUserInfo: true,
        newsArrObj: [],
        newsArrSel: [],
        selTabIndex: 'tech'
      })
      this.getNewsFun();
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
        hasWxUserInfo: true
      })
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
  getNewsFun: function () { // 获取新闻数据
    let that = this;
    wx.showLoading({ // 显示loading图
      title: '努力加载中...',
      mask: true
    })
    api.newsAPi({
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
  getCleanData: function (obj) { // 整理数据
    let that = this;
    let oldObj = that.data.newsArrObj;
    // console.log(obj)
    for (var key in obj) {
      // console.log(obj[key])
      let curLen = obj[key].length;
      for (var i = 0; i < curLen; i++) {
        if (obj[key][i].digest) {
          obj[key][i].digest += "...";
        }
      }
      for (var oldKey in oldObj) {
        console.log(oldKey)
        if (oldKey == key) {
          obj[key] = oldObj[oldKey].concat(obj[key])
        }
      }
    }
    this.setData({
      newsArrObj: obj,
      newsArrSel: obj[that.data.selTabIndex]
    })
    wx.hideLoading(); // 隐藏loading图
  },
  goMyInfoEvn: function () {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo'
    })
  },
  selTabType: function (e) { // 切换新闻tab
    // console.log(e);
    let curTabType = e.currentTarget.dataset.type || e.target.dataset.type;
    this.setData({
      newsArrSel: this.data.newsArrObj[curTabType],
      selTabIndex: curTabType
    })
  },
  seeNewsDetail: function (e) { // 查看新闻详情
    // console.log(e)
    let newLink = e.currentTarget.dataset.link || e.target.dataset.link;
    this.setData({
      newsLinkStr: newLink,
      newsLinkFlag: true
    })
  },
  seeImgDetail: function (e) { // 查看图片详情
    let newSrc = e.currentTarget.dataset.src || e.target.dataset.src;
    wx.previewImage({
      current: newSrc, // 当前显示图片的http链接
      urls: [newSrc] // 需要预览的图片http链接列表
    })
  },
  hideNewsFixed: function () { // 隐藏新闻详情链接浮层
    this.setData({
      newsLinkFlag: false
    })
  }
})