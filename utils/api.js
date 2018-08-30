// api域名
const apiUrl = 'https://www.apiopen.top';

// 请求
const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
        setTimeout(function () {
          wx.hideLoading()
        }, 3000)
      }
    },
  });
};
// 从csdn上找的免费API,网址:https://blog.csdn.net/c__chao/article/details/78573737
const satinApi = (params) => {  // /satinApi?type=1&page=1
  wxRequest(params, `${apiUrl}/satinApi`)
}
const satinGodApi = (params) => {  // url/satinGodApi?type=1&page=1
  wxRequest(params, `${apiUrl}/satinGodApi`)
}
const satinCommentApi = (params) => { // 随机推荐热门段子【神评版本】评论列表satinCommentApi?id=27610708&page=1
  wxRequest(params, `${apiUrl}/satinCommentApi`)
};


module.exports = {
// 随机推荐热门段子（包含文字、图片、GIF、视频）
  satinApi,
// 随机推荐热门段子【神评版本】（包含文字、图片、GIF、视频）
  satinGodApi,
// 随机推荐热门段子【神评版本】评论列表-->（上面接口中取到的soureid作为该接口的id）
  satinCommentApi
  
}
