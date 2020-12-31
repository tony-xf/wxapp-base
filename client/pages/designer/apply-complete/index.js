import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
Img = services.Img,
Hosts = services.Hosts;

Page({
    data: {
        noPass: Img['noPass'],
        review: Img['review'],
        pass: Img['pass'],
        status: 3,
        detail: {}
    },
    clienteleId: '',
    toHome(){
        wx.switchTab({url: '/pages/home/index'})
    },
    toApply(){
        wx.navigateTo({url: '/pages/designer/apply/index?clienteleId='+this.clienteleId+'&id='+this.data.detail.id})
    },
    toDesigner(){
        wx.navigateTo({url: '/pages/designer/center/index'})
    },
    getCheck(){
        worksServices.applyCheck(this.clienteleId).then(({data})=>{
            this.setData({
                detail: data.data
            })
        })
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.clienteleId = options.id
        this.getCheck()
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
