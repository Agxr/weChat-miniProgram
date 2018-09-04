var app = getApp();
var api = require("../../utils/api.js");

Page({
  // 页面的初始数据
  data: {
    sourceId: 0, // 从首页跳过来时带的参数，评论的来源id
    sourceImg: null,
    sourceVideo: null,
    cdObj: null,
    hasCdDataFlag: false,
    pageIndex: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.video.indexOf("http") > -1) {
      this.setData({
        sourceVideo: options.video
      })
    }
    if (options.img.indexOf("http") > -1) {
      this.setData({
        sourceImg: options.img
      })
    }
    this.setData({
      sourceId: options.sourceid
    })
    this.getCommonDetail()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    let sourceid = this.data.sourceId;
    let sourcevideo = this.data.sourceVideo;
    let sourceimg = this.data.sourceImg;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '林下夕影',
      path: 'pages/commondetail/commondetail?sourceid=' + sourceid + '&video=' + sourcevideo + '&img=' + sourceimg
    }
  },
  // 事件处理函数
  getCommonDetail: function (index) {
    let that = this;
    let newIndex = index ? index : 1;
    let data = {
      id: that.data.sourceId,
      page: newIndex
    };
    wx.showLoading({ // 显示loading图
      title: 'Loading...',
      mask: true
    })
    api.satinCommentApi({
      data,
      success: function (res) {
        // console.log(res.data.data)
        that.getCleanData(res.data.data)
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
    console.log(obj)
    if (obj.hot.list.length == 0 && obj.normal.list.length == 0) {
      this.setData({
        hasCdDataFlag: true
      })
    }


    this.setData({
      cdObj: obj
    })
    wx.hideLoading();
  }
})