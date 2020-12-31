

import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
KeyToUrl = services.KeyToUrl,
Hosts = services.Hosts;

Page({
    id: '',
    loading: false,
    data: {
        curTab: 'desc',
        tabTop: 0,
        fixTab: false,
        designer: {},
        goodsList: []
    },
    params: {
        page: 1,
        pageSize: 30
    },
    total: 0,
    maxPage: 0,
    changeTab({currentTarget:{dataset:{tab}}}){
        this.setData({
            curTab: tab
        })
    },
    toGoodsDetail({currentTarget: {dataset: {id}}}){
        wx.navigateTo({
            url:'/pages/designer/goods-detail/index?id='+id
        });
    },
    handleAttention({currentTarget:{dataset:{val}}}){
        const status = (val == 1)
        const data = {
            designerId: this.id,
            status: status,
        }
        worksServices.designerAttention(data).then(({data})=>{
            let { msg } = data.data
            this.setData({
                'designer.attention': status
            })
            wx.showToast({title: msg, icon: 'none'})
        })
    },
    setTabTop(){
        const _this = this;
        const query = wx.createSelectorQuery()
        query.select('#tabPane').boundingClientRect(function(rect){
            console.log(rect.top)
            _this.setData({
                tabTop: rect.top
            });
        }).exec();
    },
    onPageScroll({scrollTop}){
        if(scrollTop > this.data.tabTop){
            if(!this.data.fixTab){
                this.setData({
                    fixTab: true
                })
            }
            return;
        }
        if(this.data.fixTab){
            this.setData({
                fixTab: false
            })
        }
    },
    onReachBottom(){
        if(this.loading){
            return;
        }
        if(this.params.page < this.maxPage){
            this.params.page++;
            this.getProduct()
        }
    },
    getDesigner(){
        worksServices.designerDetail(this.id).then(({data})=>{
            this.setData({
                designer: data.data
            })
        })
    },
    urlEncode(param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + param;
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += this.urlEncode(param[i], k, encode)
            }
        }
        return paramStr;
    },
    getProduct(){
        this.loading = true
        return new Promise((resolve, reject)=>{
            const str = JSON.stringify(this.params)
            const data = JSON.parse(str);
            data.designerId = this.id
            worksServices.getWorksIndex(this.urlEncode(data)).then(({data}) => {
                this.maxPage = Math.ceil(data.data.total/this.params.pageSize);
                this.loading = false;
                this.total = data.data.total;
                this.setData({
                    goodsList: data.data.list,
                });
                resolve();
            });
        })
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.id = options.id
        this.getDesigner()
        this.getProduct()
    },
    /**
     * 页面展示
     */
    onShow() {
        this.setTabTop()
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
