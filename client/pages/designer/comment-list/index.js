import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
Img = services.Img,
Hosts = services.Hosts;

Page({
    loading: false,
    data:{
        finished: false,
        curTab: 'all',
        tabOptions: [{
            key: 'all',
            value: '全部'
        },{
            key: '1',
            value: '待回复'
        },{
            key: '2',
            value: '审核中'
        },{
            key: '3',
            value: '已回复'
        }],
        list: [],
        replyIcon: Img['designerReply'],
        icon: Img['errorIcon'],
        replayForm: {
            content: '',
            nick: ''
        },
        total: 0,
    },
    params: {
        page: 1,
        pageSize: 10,
        replyStatus: '',
    },
    maxPage: 0,
    changeTab({currentTarget:{dataset:{tab}}}){
        if(this.loading){
            return;
        }
        this.setData({
            curTab: tab
        })
        this.params.replyStatus = '';
        this.params.page = 1
        this.data.list = []
        if(tab !== 'all'){
            this.params.replyStatus = tab
        }
        this.getList()
    },
    inputReply(e){
        this.setData({
            'replayForm.content': e.detail.value
        })
    },
    commentReply({currentTarget:{dataset:{index, id}}}){
        const dialog = this.selectComponent('#dialog');
        const _this = this
        const nick = this.data.list[index].customerNick
        this.setData({
            'replayForm.content': '',
            'replayForm.nick': nick,
        })
        dialog.show({
            confirm: function(){
                if(!_this.data.replayForm.content){
                    wx.showToast({title: '请输入回复内容', icon: 'none'});
                    return;
                }
                return new Promise((resolve, reject)=>{
                    const commentId = id
                    const d = {
                        commentId,
                        content: _this.data.replayForm.content,
                    }
                    worksServices.designerReply(d).then(({data})=>{
                        let { msg } = data.data
                        wx.showToast({title: msg, icon: 'none'});
                        this.replyList();
                        resolve()
                    }).catch(handleReqError)
                })
            }
        })
    },
    replyList(){
        this.setData({
            tab: '2'
        })
        this.params.replyStatus = 2;
        this.params.page = 1
        this.data.list = []
        this.getList()
    },
    handleScroll(){
        if(this.loading){
            return;
        }
        if(this.params.page < this.maxPage){
            this.params.page++;
            this.getList()
        }
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
            worksServices.designerComment(this.urlEncode(params)).then(({data}) => {
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
            }).catch((res)=>{
                this.loading = false
                handleReqError(res)
            });
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
