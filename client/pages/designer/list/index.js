import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
KeyToUrl = services.KeyToUrl,
Hosts = services.Hosts;

Page({
    data: {
        list: [],
        total: 1
    },
    toDetail({currentTarget:{dataset:{id}}}){
        wx.navigateTo({url: '/pages/designer/index/index?id='+id})
    },
    getList(){
        worksServices.attentionList().then(({data})=>{
            this.setData({
                list: data.data,
                total: data.data.length
            })
        })
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.getList();
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
