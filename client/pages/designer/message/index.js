import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
Img = services.Img,
Hosts = services.Hosts;

Page({
    data:{
        finished: false,
        list: [],
        icon: Img['errorIcon'],
        total: 0,
    },
    params: {
        page: 1,
        pageSize: 10,
    },
    maxPage: 0,
    handleScroll(){
        if(this.loading){
            return;
        }
        if(this.params.page < this.maxPage){
            this.params.page++;
            this.getList()
        }
    },
    toComment(){
        wx.navigateTo({url: '/pages/designer/comment-list/index'})
    },
    toOrder({currentTarget: {dataset: {id}}}){
        wx.navigateTo({url: '/pages/designer/custom-detail/index?id='+id})
    },
    delMessage({currentTarget: {dataset: {id, title}}}){
        const dialog = this.selectComponent('#dialog');
        const _this = this
        dialog.show({
            title: '删除提示',
            content: `确定删除消息【${title}】吗？`,
            confirm: function(){
                _this.sendDel(id)
            }
        })

    },
    sendDel(id){
        return new Promise(resolve => {
            worksServices.messageDel({id}).then(({data})=>{
                let {msg} = data.data
                wx.showToast({title: msg, icon: 'none'})
                resolve()
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
    getList(){
        this.loading = true
        return new Promise((resolve, reject)=>{
            const params = this.getParams()
            worksServices.message(this.urlEncode(params)).then(({data}) => {
                this.maxPage = Math.ceil(data.data.total/this.params.pageSize);
                this.loading = false;
                this.total = data.data.total;
                const list = this.data.list.concat(data.data.list)
                this.setData({
                    total: data.data.total,
                    list,
                });
                if(this.params.page >= this.maxPage){
                    this.setData({
                        finished: true
                    })
                }
                resolve();
            }).catch(handleReqError);
        })
    },
    getParams(){
        const obj = {}
        for(let i in this.params){
            if(this.params[i] != ''){
                obj[i] = this.params[i]
            }
        }
        return obj
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.id = options.id
        this.getList()
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
