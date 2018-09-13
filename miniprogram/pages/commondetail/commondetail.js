var app = getApp();
var api = require("../../utils/api.js");

Page({
  // 页面的初始数据
  data: {
    sourceId: 0, // 从首页跳过来时带的参数，评论的来源id
    sourceImg: null,
    sourceVideo: null,
    cdObj: [],
    hasCdDataFlag: false,
    cdObjOnceDataFlag: false,
    curTabIndex: 0,
    pageIndex: 1,
    pageTotal: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
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
    this.getCommonDetail();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let curPageIndex = this.data.pageIndex;
    let curTotalNum = this.data.pageTotal;
    if (curTotalNum > (20 * curPageIndex)) {
      curPageIndex++;
      this.setData({
        pageIndex: curPageIndex
      })
      this.getCommonDetail(curPageIndex);
    }
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
        if (res.data.data) {
          that.getCleanData(res.data.data)
        } else {
          that.setData({
            hasCdDataFlag: true
          })
          wx.hideLoading();
        }
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '加载失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          hasCdDataFlag: true
        })
        wx.hideLoading();
      }
    })
  },
  getCleanData: function (obj) { // 整理数据
    // console.log(obj)
    if (obj.hot.list.length == 0 && obj.normal.list.length == 0) {
      this.setData({
        hasCdDataFlag: true
      })
    }
    let oldCdObj = this.data.cdObj;
    for (var i in obj) {
      // console.log(i);
      if (i == 'hot' || i == 'normal') {
        let curObjData = obj[i];
        let curObjDataLen = obj[i].list.length;
        for (var curInd = 0; curInd < curObjDataLen; curInd++) {
          // obj[i].list[curInd].ctime = obj[i].list[curInd].ctime.split('T')[0];
          obj[i].list[curInd].ctime = obj[i].list[curInd].ctime.replace("T", " ");
          if (obj[i].list[curInd].user.username.length > 12) {
            obj[i].list[curInd].user.username = obj[i].list[curInd].user.username.slice(0, 12) + '...';
          }
        }
        if (Object.keys(oldCdObj).length > 0) {
          obj[i].list = oldCdObj[i].list.concat(obj[i].list)
        }
      }
    }
    this.setData({
      cdObj: obj
    })
    if (this.data.curTabIndex == 0) {
      this.setData({
        pageTotal: obj["hot"].info.count
      })
      if (obj["hot"].info.count == 0) {
        this.setData({
          cdObjOnceDataFlag: true
        })
      }
    } else {
      this.setData({
        pageTotal: obj["normal"].info.count
      })
    }
    wx.hideLoading();
  },
  selTabItem: function (e) { // 切换tab选项卡
    console.log(e);
    let curTabInd = e.currentTarget.dataset.id || e.target.dataset.id;
    this.setData({
      curTabIndex: curTabInd,
      cdObjOnceDataFlag: false
    })
    if (curTabInd == 0) {
      this.setData({
        pageTotal: this.data.cdObj.hot.info.count
      })
      if (this.data.cdObj.hot.info.count == 0) {
        this.setData({
          cdObjOnceDataFlag: true
        })
      }
    } else {
      this.setData({
        pageTotal: this.data.cdObj.normal.info.count
      })
      if (this.data.cdObj.normal.info.count == 0) {
        this.setData({
          cdObjOnceDataFlag: true
        })
      }
    }
  }
})