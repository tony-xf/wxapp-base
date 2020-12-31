import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
import { isAuthUserInfo, wxGetUserInfo, wxLogin } from '../../../wxUtil/wxUtil'
//获取应用实例
const app = getApp(),
services = app.services,
Img = services.Img,
Hosts = services.Hosts;


Page({
    data: {
        headerBg: Img['designerBg'],
        infoIcon: Img['designerInfoIcon'],
        allWorkIcon: Img['designerAllWorkIcon'],
        orderIcon: Img['designerOrderIcon'],
        msgIcon: Img['designerMsgIcon'],
        workIcon: Img['designerWorkIcon'],
        designer: {
            id: 'a7fe670e-c75f-dab6-dd2d-f1e885992225'
        },
        isLogin: false
    },
    getDetail(){
        worksServices.designerInfo().then(({data})=>{
            this.setData({
                designer: data.data
            })
        }).catch(handleReqError)
    },
    checkLoginStatus() {
        worksServices.checkLoginStatus()
            .then(({data:{data}}) => {
                this.setData({
                    isLogin:data.isLogin
                })
                if(this.data.isLogin) {
                    this.getDetail()
                }else {
                    this.tryLogin()
                }
            })
    },
    tryLogin(){
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
                wx.setStorageSync('isBindMobile',res.flag)
                this.setData({isLogin:true})
                wx.setStorageSync("token", res.token)
                this.getDetail()
            }
        })
    },
    authorization({iv,encryptedData}){
        return worksServices.authorization({
            iv:encodeURIComponent(iv),
            encryptedData:encodeURIComponent(encryptedData),
            code: this.code
        })
    },
    toPage({currentTarget: {dataset: {url}}}){
        if(url){
            wx.navigateTo({url})
        }
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        app.type = 'designer'
        console.log('--------')
        this.checkLoginStatus()
    },
    /**
     * 页面展示
     */
    onShow() {
    },

    /**
     * 页面隐藏
     */
    onHide() {

    },
    /**
     * 渲染完成
     */
    onReady(){

    },
    /**
     * 页面卸载
     */
    onUnload() {
    },
    onShareAppMessage(e) {
       
    },
});
