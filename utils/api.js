// api域名
const apiUrl = 'https://gkzx.crtvup.com.cn/zxgk_v3/Api/Mobile';

// 请求
const wxRequest = (params, url) => {
  // wx.showLoading({
  //   title: 'loading',
  // })
  wx.request({
    url,
    method: params.method || 'POST',
    data: params.data || {},
    header: {
      Accept: 'application/json',
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

const WechatLogin = (params) => {
  wxRequest(params, `${apiUrl}/WeChatLogin`)
};
//const CheckUserInfo=(params)=>
//{
//  wxRequest(params, `${apiUrl}/CheckUserInfo`)
//};

const GetAllBooks = (params) => {
  wxRequest(params, `${apiUrl}/FindAllBook`)
};
const GetBook = (params) => {
  wxRequest(params, `${apiUrl}/FindOneBook`)
};
const GetBookBrief = (params) => {
  wxRequest(params, `${apiUrl}/FindOneBookBrief`)
};
const CollectionBook = (params) => {
  wxRequest(params, `${apiUrl}/CreateBookRelation`)
}
const CreateQuestion = (params) => {
  wxRequest(params, `${apiUrl}/CreateQuestion`)
}
const CreateAnswer = (params) => {
  wxRequest(params, `${apiUrl}/CreateAnswer`)
};
const CollectionQuestion = (params) => {
  wxRequest(params, `${apiUrl}/CreateQuestionRelation`)
}
const GetPhone = (params) => {
  wxRequest(params, `${apiUrl}/WeChatAESDecrypt`)
};
const GetAllAnswer = (params) => {
  wxRequest(params, `${apiUrl}/FindAllAnswer`)
};
const GetOneAnswer = (params) => {
  wxRequest(params, `${apiUrl}/FindOneQuestion`)
}
const GetAllQuestion = (params) => {
  wxRequest(params, `${apiUrl}/FindAllQuestion`)
}
const TeacherAskList = (params) => {
  wxRequest(params, `${apiUrl}/FindQuestionForTeach2`)
}
const GetUserInfo = (params) => {
  wxRequest(params, `${apiUrl}/WeChatAESDecrypt`)
}
const GetBookClass = (params) => {
  wxRequest(params, `${apiUrl}/FindBookClass`)
}
const MyCollectionBook = (params) => {
  wxRequest(params, `${apiUrl}/FindBookByRelation`)
}
const MyCollectionQuestion = (params) => {
  wxRequest(params, `${apiUrl}/FindQuestionByRelation`)
}
const GetBanners = (params) => {
  wxRequest(params, `${apiUrl}/FindAllBanner`)
}
const Pay = (params) => {
  wxRequest(params, `${apiUrl}/Pay`)
}
const QianDao = (params) => {
  wxRequest(params, `${apiUrl}/CreateSigin`)
}
const GetMyJiFen = (params) => {
  wxRequest(params, `${apiUrl}/FindMyIntegral`)
}
const ValidQuestion = (params) => {
  wxRequest(params, `${apiUrl}/ValidQuestion`)
}
const PayJiFen = (params) => {
  wxRequest(params, `${apiUrl}/InsertIntegralOrder`)
}
const SjFormid = (params) => {
  wxRequest(params, `${apiUrl}/InsertFormId`)
}
const JfMx = (params) => {
  wxRequest(params, `${apiUrl}/FindManyIntegralOrder`)
}
const GetProduct = (params) => {
  wxRequest(params, `${apiUrl}/FindAllAmountSet`)
}
const GetOneUser = (params) => {
  wxRequest(params, `${apiUrl}/FindOneUser`)
}
const BindMobile = (params) => {
  wxRequest(params, `${apiUrl}/BindMobile`)
}
const UpdateUser = (params) => {
  wxRequest(params, `${apiUrl}/WeChatUpdateUser`)
}
const CheckUserInfo = (params) => {
  wxRequest(params, `${apiUrl}/CheckUserInfo`)
}
const BindAuthorizationCode = (params) => {
  wxRequest(params, `${apiUrl}/BindAuthorizationCode`)
}
const GetBookClassByUserId = (params) => {
  wxRequest(params, `${apiUrl}/GetBookClassByUserId`)
}
const SendVerify = (params) => {
  wxRequest(params, `${apiUrl}/SMSVerification`)
}
const SnycApp = (params) => {
  wxRequest(params, `${apiUrl}/UpdateProfessionName`)
}

const GetCurrentClass = (params) => {
  wxRequest(params, `${apiUrl}/GetCurrentClass`)
}


const BindAppAccount = (params) => {
  wxRequest(params, `${apiUrl}/BindAppAccount`)
}

const FindQuestionForTeachTop100 = (params) => {
  wxRequest(params, `${apiUrl}/FindQuestionForTeachTop100`)
}
const UpdatePwd = (params) => {
  wxRequest(params, `${apiUrl}/UpdatePwd`)
}

// 获取学生的已授权图书
const getAuthedBooks = (params) => {
  wxRequest(params, `${apiUrl}/FindManyBookForStudent`)
}


module.exports = {
  //微信登陆
  WechatLogin,
  //CheckUserInfo,
  //获取所有图书（及搜索）
  GetAllBooks,
  //获取一本图书
  GetBook,
  // 获取一本书，仅限书名，出版社
  GetBookBrief,
  //收藏图书
  CollectionBook,
  //提问
  CreateQuestion,
  //回答
  CreateAnswer,
  //收藏问题
  CollectionQuestion,
  //获取手机号
  GetPhone,
  //获取所有答案(以及搜索)
  GetAllAnswer,
  //获取一个问题及答案
  GetOneAnswer,
  //获取所有问题
  GetAllQuestion,
  //教师问题列表
  TeacherAskList,
  //解密获取用户信息
  GetUserInfo,
  //获取图书分类
  GetBookClass,
  //我收藏的图书
  MyCollectionBook,
  //获取轮播图列表
  GetBanners,
  //与我相关的问题（收藏，点赞，吐槽，浏览）
  MyCollectionQuestion,
  //微信支付
  Pay,
  //签到发送模板消息
  QianDao,
  //查询我的积分
  GetMyJiFen,
  //验证是否可以看问题
  ValidQuestion,
  //查看问题扣除积分
  PayJiFen,
  //收集formid
  SjFormid,
  //查询积分明细
  JfMx,
  //获取所有商品
  GetProduct,
  //获取一个用户信息
  GetOneUser,

  // *****  二期从新接口从这里开始   ***************
  //绑定手机号
  BindMobile,
  // 微信授权后更新用户信息
  UpdateUser,
  //用户信息验证
  CheckUserInfo,
  //绑定授权码
  BindAuthorizationCode,
  //获取用户分类
  GetBookClassByUserId,
  //发送短信验证码
  SendVerify,
  //同步到app
  SnycApp,
  //获取当前分类
  GetCurrentClass,
  //用户登录
  BindAppAccount,
  //教师热门问题排行前100
  FindQuestionForTeachTop100,
  //忘记密码接口
  UpdatePwd,
  // 获取已授权的图书
  getAuthedBooks,
};
