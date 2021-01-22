import utils from './utils/index.js'
import Constants from './config/index.js'
import Event from './libs/event.js'
import hosts from './common/services/hosts.js'
import mapKeyToImgUrl from './common/services/mapKeyToImgUrl.js'
import User from './global/user.js'

/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
function checkUpdateVersion() {
  //创建 UpdateManager 实例
  const updateManager = wx.getUpdateManager()
  //检测版本更新
  updateManager.onCheckForUpdate(function(res) {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      //监听小程序有版本更新事件
      updateManager.onUpdateReady(function() {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(function() {
        // 新版本下载失败
        wx.showModal({
          title: '已经有新版本咯~',
          content:
            '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~'
        })
      })
    }
  })
}

function refreshLogin() {
  const LAST_LOGIN = wx.getStorageSync('LAST_LOGIN')
  ;(LAST_LOGIN && Date.now() - LAST_LOGIN <= 36e5) ||
    wx.login({
      success: function({code}) {
        User.code2login({code})
      }
    })
}

// 注意： 使用es6 import记得加上文件后缀
App({
  event: new Event(),
  globalData: {
    userInfo: null
  },
  type:'',
  services: {
    Hosts: hosts,
    Utils: utils,
    ApiCreater: utils.apiCreater,
    Util: utils.util,
    KeyToUrl: mapKeyToImgUrl,
    User,
  },
  isDebug: Constants.APP_DEBUG,
  onLaunch() {
    Constants.APP_DEBUG && hosts.initEnv()
    checkUpdateVersion()
  //   User.id
  //     ? refreshLogin()
  //     : wx.login({
  //         success: function({code}) {
  //           User.code2login({code})
  //         }
  //       })
  }
})
