const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const goBack = len => { // 路由跳转，后退
  let newLen = len ? len : 1;
  wx.navigateBack({
    delta: newLen
  })
}

module.exports = {
  formatTime: formatTime,
  goBack: goBack
}
