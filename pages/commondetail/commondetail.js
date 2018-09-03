var app = getApp();
var api = require("../../utils/api.js");

Page({
  // 页面的初始数据
  data: {
    sourceId: 0, // 从首页跳过来时带的参数，评论的来源id
    sourceImg: null,
    sourceVideo: null,
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
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '林下夕影',
      path: 'pages/commondetail/commondetail'
    }
  },
  // 事件处理函数
  getCommonDetail: function (index) {
    let newIndex = index ? index : 1;
  }
})