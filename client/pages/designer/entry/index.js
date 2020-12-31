import customServices from '../../../api/login'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
Img = services.Img,
Hosts = services.Hosts;

Page({
    data: {
        icon: Img['errorIcon'],
    },
    clienteleId: '',
    toHome(){
        wx.switchTab({url: '/pages/home/index'})
    },
    toApply(){
        wx.navigateTo({url: '/pages/designer/apply/index?clienteleId='+this.clienteleId})
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.clienteleId = options.id
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
