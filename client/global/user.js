import loginServices from '../api/login.js'

function userIdGenerator() {
    return (1482645606622 * Math.random()).toString(36).slice(0, 8)
  }
  
  class User {
    constructor(){
      this.data = {}
      this.loadSync()
    }
    code2login(o) {
      var self = this
      return loginServices.code2login(o).then(({data: {data,code}}) => {
        // {data, code}
        if(code === 0) {
          let user_info = {}
          let {cookie,customerInfo,isBinding} = data
          if(isBinding) {
            let cookieId = cookie['jade-mall']
            self.data.cookie = cookieId
            customerInfo.user_id = userIdGenerator()
            user_info = customerInfo
            self.data.user_info = user_info
            self.data.bind_status = isBinding
            wx.setStorageSync('cookie', cookieId)
            wx.setStorageSync('USER', self.data)
            wx.setStorageSync("LAST_LOGIN", Date.now())
            return Promise.resolve(self.data)
          }
          return Promise.reject({key: 'LOGIN_FAIL',msg: '登录失败'})
        } else {
          return Promise.reject()
        }
      }).catch((err) => {
        return Promise.reject(err)
      })
    }
    //loginByMobile
    authorization(o) {
      var self = this
      return loginServices.authorization(o).then(
        ({data: {data,code}}) => {
          if (code === 0) { 
            let user_info = {}
            let {avatar, isBinding,nick,success,tempId,customerInfo,cookie} = data
            if(isBinding) {
              let cookieId = cookie['jade-mall'];
              this.data.cookie = cookieId
              customerInfo.user_id = userIdGenerator()
              user_info = customerInfo
              wx.setStorageSync('cookie', cookieId)
            } else {
              user_info.avatar = avatar
              user_info.nick = nick
            }
            self.data.bind_status = isBinding
            self.data.user_info = user_info
            success && (wx.setStorageSync('USER', self.data))
            return isBinding ? Promise.resolve(self.data) : Promise.resolve({
              key: 'WECHAT_NOT_BIND_JADE_ACCOUNT',
              message: '这个微信号没有绑定jade-mall',
              tempId: tempId
            })
            //isBinding ? Promise.resolve(data) : ''
            // Promise.reject({
            //   key: 'WECHAT_NOT_BIND_COLOUR_LIFE_ACCOUNT',
            //   message: '这个微信号没有绑定彩之云账号'
            // })
          } else {
            return Promise.reject()
          }
        },
      ).catch((err) => {
        return Promise.reject(err)
      })
    }
    loginByWxMobile(o) {
      var self = this
      return loginServices.loginByWxMobile(o).then(({data: {data, code}}) => {
        if(code === 0) {
          let user_info = {}
          let {cookie,customerInfo,success} = data
          if(success) {
            let cookieId = cookie['jade-mall'];
            self.data.cookie = cookieId
            customerInfo.user_id = userIdGenerator()
            user_info = customerInfo
            self.data.user_info = user_info
            wx.setStorageSync('cookie', cookieId)
            wx.setStorageSync('USER', self.data)
            return Promise.resolve(self.data)
          }
          return Promise.reject({key: 'LOGIN_FAIL',msg: '登录失败'})
        } else {
          return Promise.reject()
        }
      }).catch((err) => {
        return Promise.reject(err)
      })
    }
    loginByMobile(o) {
      var self = this
      return loginServices.loginByMobile(o).then(({data: {data, code}}) => {
        if(code === 0) {
          let user_info = {}
          let {cookie,customerInfo,success} = data
          if(success) {
            let cookieId = JSON.parse(cookie)['jade-mall'];
            self.data.cookie = cookieId
            customerInfo.user_id = userIdGenerator()
            user_info = customerInfo
            self.data.user_info = user_info
            wx.setStorageSync('cookie', cookieId)
            wx.setStorageSync('USER', self.data)
            return Promise.resolve(self.data)
          }
          return Promise.reject({key: 'LOGIN_FAIL',msg: '登录失败'})
        } else {
          return Promise.reject()
        }
      }).catch((err) => {
        return Promise.reject(err)
      })
    }
    loadSync() {
      const User = wx.getStorageSync('USER') || {}
      User && (this.data = User)
    }
    removeSync() {
      try {
        wx.removeStorageSync('USER')
        wx.removeStorageSync('token')
        this.data = {}
      } catch (err) {
      }
    }
    get SID () {
      return this.data.cookie
    }
    get info() {
      return this.data.user_info || {}
    }
    get id () {
      return this.info.user_id
    }
  }
  
  export default new User()
  