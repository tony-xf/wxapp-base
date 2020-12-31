export const saveFile = (tempFilePath) => {
  return new Promise((resolve,reject) => {
    wx.saveFile({
        tempFilePath,
        success: (result)=>{
           resolve(result)
        },
        fail: (err)=>reject(err),
        complete: ()=>{}
    });
})
}
export const downloadFile = (url) => {
  return new Promise((resolve,reject) => {
      wx.downloadFile({
          url,
          success: (result)=>{
             resolve(result)
          },
          fail: (err)=>reject(err),
          complete: ()=>{}
      });
  })
}
export const openDocument = (filePath) => {
  return new Promise((resolve,reject) => {
      wx.openDocument({
          filePath,
          showMenu:true,
          success: (result)=>{
          },
          fail: (err)=>{},
          complete: ()=>{}
      });
  })
}
export const wxGetSetting = (o = {}) => {
  return new Promise((resolve, reject) => {
    o.success = function(res) {
      resolve(res)
    }
    o.fail = function(err) {
      reject(err)
    }
    wx.getSetting(o)
  })
}
export const wxOpenSetting = () => {
  return new Promise((resolve, reject) => {
      wx.openSetting({
          success: (result) => {
              resolve(result);
          },
          fail: (err) => {
              reject(err);
          }
      });
  })
}
export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    })
  })
}

export const isAuthUserInfo = () => {
  return wxGetSetting().then((res) => {
    return !!res.authSetting["scope.userInfo"]
  })
}
export const isAuthAddress = () => {
  return wxGetSetting().then((res) => {
    return !!res.authSetting["scope.address"]
  })
}
export const wxChooseAddress = () => {
  return new Promise((resolve, reject) => {
      wx.chooseAddress({
          success: (result) => {
              resolve(result);
          },
          fail: (err) => {
            reject(err);
          }
      });
  })
}

export const wxGetUserInfo = (o = {}) => {
  return new Promise(function(resolve, reject) {
      o.lang = "zh_CN"
      o.success = function(n) {
          resolve(n);
      },
      o.fail = function(n) {
        reject(n);
      }
      wx.getUserInfo(o)
  })
}
export const showToast = (msg) => {
  let o = {
    icon: 'none',
    mask: true
  }

  if (typeof msg === 'object' && msg !== null) {
    o = Object.assign(o, msg)
  } else {
    o['title'] = msg
  }
  return new Promise(function(resolve, reject) {
    o.success = function(n) {
        resolve(n);
    },
    o.fail = function(n) {
      reject(n);
    }
    wx.showToast(o)
})
}

export const wxRequestPayment = function wxRequestPayment(data) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: String(data.timeStamp),
      nonceStr: data.nonceStr,
      package: data.packageValue,
      signType: data.signType,
      paySign: data.paySign,
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

export const downloadImg = (url)=>{
    wx.downloadFile({
        url: url,
        success: function (res) {
            var benUrl = res.tempFilePath;
            //图片保存到本地相册
            wx.saveImageToPhotosAlbum({
                filePath: benUrl,
                //授权成功，保存图片
                success: function (data) {
                    wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000
                    })
                },
                //授权失败
                fail: function (err) {
                    if (err.errMsg) {//重新授权弹框确认
                        wx.showModal({
                            title: '提示',
                            content: '您好,请先授权，在保存此图片。',
                            showCancel: false,
                            success(res) {
                                if (res.confirm) {//重新授权弹框用户点击了确定
                                    wx.openSetting({//进入小程序授权设置页面
                                        success(settingdata) {
                                            if (settingdata.authSetting['scope.writePhotosAlbum']) {//用户打开了保存图片授权开关
                                                wx.saveImageToPhotosAlbum({
                                                    filePath: benUrl,
                                                    success: function (data) {
                                                        wx.showToast({
                                                            title: '保存成功',
                                                            icon: 'success',
                                                            duration: 2000
                                                        })
                                                    },
                                                })
                                            } else {//用户未打开保存图片到相册的授权开关
                                                wx.showModal({
                                                    title: '温馨提示',
                                                    content: '授权失败，请稍后重新获取',
                                                    showCancel: false,
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    })
}
export const systemInfo = wx.getSystemInfoSync()


