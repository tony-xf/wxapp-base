export default function(err) {
  let errMsg = err.errMsg || ''
  err.statusCode !== 200 && err.errMsg === 'request:ok' && (errMsg = err.data.msg)
  err.statusCode === 200 && (errMsg = err.data.msg || errMsg)
  typeof err.statusCode === 'undefined' && (errMsg = err.errMsg || err.data.msg)
  if (errMsg !== 'login:cancel') {
    wx.showToast({
      title: errMsg,
      icon: 'none'
    })
  }
  return Promise.reject()
}
