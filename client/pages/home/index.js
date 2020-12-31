
import homeServices from '../../api/login.js'
import loginServices from '../../api/login'
import cardServices from '../../api/login'
import { isAuthUserInfo, wxGetUserInfo, wxLogin } from '../../wxUtil/wxUtil'
import config from '../../config/index.js'
import handleReqError from '../../utils/handleReqError'
import ENV_CONSTANTS from '../../config/env'

//获取应用实例
const app = getApp(),
services = app.services,
KeyToUrl = services.KeyToUrl,
Hosts = services.Hosts;

Page({
    data: {
        title: 'page',
        inited: 1,
        KeyToUrl,
        header_icon: KeyToUrl['header_icon'],
        right: '120',
        APP_DEBUG: config.APP_DEBUG,
        defaultAvatar: '/images/default_avatar.png',
        cardShow:true,
        userInfo:{},
        device:0,
        advertisement:[],
        isLogin:false,
        banner:[],
        box:['','',''],
        release: ENV_CONSTANTS.IS_PROD,


    },
    code:'',
    checkLoginStatus() {
        loginServices.checkLoginStatus()
        .then(({data:{data}}) => {
            this.setData({
                isLogin:data.isLogin
            })
            if(this.data.isLogin) { 
                this.getUserInfo()
            }

            else {return this.tryLogin()}
        })
    },
    //尝试静默登录
    tryLogin() {
        wxLogin().then((res) => {
            console.log('wxLogin',res)
          if (res.errMsg === "login:ok") {
            this.code = res.code
          }
          return isAuthUserInfo()
        }).then((auth) => {
            console.log('wxGetUserInfo',auth)
          return auth && wxGetUserInfo()
        }).then((res) => {
            console.log('authorization',res)
          return res.errMsg === 'getUserInfo:ok' && this.authorization(res)
        }).then(({data:{data:res}}) => {
          if (res) {
            let data = res.data
            wx.setStorageSync('isBindMobile',res.flag)
            this.setData({isLogin:true})
              wx.setStorageSync("token", res.token)
              this.getUserInfo()
            // if(data.flag) {
            // this.setData({isLogin:true})
            //   wx.setStorageSync("token", data.token)
            //   this.getUserInfo()
            // } else {
            // }
          } else {
            this.getIndex()
          }
        }).catch((e) => {
            this.getIndex()
        })
      },
      authorization({iv,encryptedData}){
        return loginServices.authorization({
              iv:encodeURIComponent(iv),
              encryptedData:encodeURIComponent(encryptedData),
              code: this.code 
        })
    },

    getIndex() {
        homeServices.getIndex()
        .then(({data:{data}}) => {
            data.F1.map(val => {
                val.url = val.img
                return val
            })
            this.setData(data)
        })
    },
    getUserInfo() {
        loginServices.getUserInfo()
        .then(({data:{data}}) => {
            app.globalData.userInfo = data
            this.setData({
                userInfo:data,
                defaultAvatar:data.avatar
            })
            this.getIndex()
        })
    },
    jumpLink({currentTarget: {dataset: {url}}}) {
        url && url.startsWith('/') && wx.navigateTo({url}) 
        url && url.startsWith('http') && wx.navigateTo({url: `/pages/webview/index?url=${encodeURIComponent(url)}`})
    },
    handleClickImg({currentTarget:{dataset:{url}}}) {
        wx.navigateTo({url:'/' + decodeURIComponent(url)})
    },
    login() {
        if(!this.data.userInfo.nickName) return wx.navigateTo({url:'/pages/ucenter/login/index'})
    },
    handleTap(e) {
        e.currentTarget.dataset.url = this.data.F1[e.detail.index].href
        this.handleClickImg(e)
    },
    handleImgErr(e) {
        const i = e.detail.i,
        errImg = e.detail.errorImg,
        imageList = this.data.imageList
        imageList[i].url = errImg
        this.setData({
            imageList
        })
    },
    switchEnv() {
        wx.navigateTo({ url: '/pages/setting/setting' })
    }, 
    /**
     * 页面加载
     */
    onLoad(options) {
        // this.getIndex()
        // this.getUserInfo()
        //api.getHomeData()
        //this.pageInited()
    },

    /**
     * 页面展示
     */
    onShow() {
        // this.getIndex()
        this.checkLoginStatus()

        // this.pageInited()
    },

    /**
     * 页面渲染成功
     */
    onReady() {
    },

    /**
     * 页面隐藏
     */
    onHide() {

    },

    /**
     * 页面卸载
     */
    onUnload() {
    },
    onShareAppMessage(e) {
        const product = this.data.product,
        curPages =  getCurrentPages(),
        page = curPages[curPages.length - 1].route;
        return {
            title: '金海岸',
            imageUrl: '../../images/category/logo-seat.jpg',
            path: `/${page}`
        }
    },
    onPageScroll() {
        if(this.timer) {
            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                this.setData({
                    right: '20rpx'
                })
                clearTimeout(this.timer)
                this.timer = null
            },300)
            return
        }
        this.timer = setTimeout(() => {
            this.setData({
                right: '-120rpx'
            })
        },0)
    }
});
