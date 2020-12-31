import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
import { downloadImg } from '../../../wxUtil/wxUtil'
//获取应用实例
const app = getApp(),
services = app.services,
KeyToUrl = services.KeyToUrl,
Hosts = services.Hosts;

Page({
    data: {
        id: '',
        infoVisible: true,
        order: {}
    },
    getDetail(){
        worksServices.customOrderDetail(this.id).then(({data})=>{
            console.log(data)
            this.setData({
                order: data.data
            })
        })
    },
    toggleInfo(){
        this.setData({
            infoVisible: !this.data.infoVisible
        })
    },
    showImg({currentTarget:{dataset:{url}}}){
        if(url){
            wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: [url] // 需要预览的图片http链接列表
            })
        }
    },
    handleDownload({currentTarget:{dataset:{url}}}){
        downloadImg(url)
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.id = options.id
        this.getDetail()
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
