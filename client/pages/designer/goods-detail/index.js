import worksServices from '../../../api/works.js'
import WxParse from '../../../libs/wxParse/wxParse.js'
import commonServices from '../../../api/login'
const app = getApp();
const services = app.services,
Util = services.Util,
KeyToUrl = services.KeyToUrl,
User = services.User;

Page({
    loading: false,
    data: {
        inited: !1,
        title: 'page',
        confirm: {
            visible: false,
            title: '',
            content: ''
        },
        customer_service: KeyToUrl['customer_service'],
        KeyToUrl,
        tabActive: 0,
        comment: {
            type:'all',
            curIndex:0,
            list:[],
            all:0,
            like:0,
            pics:0,
            append:0
        },
        commentContent: '',
        detailVisible: false,
        liked: false,
        likeQuantity: 0,
        product: {},
        imgList: [],
        designer: {},
        finished:false,
        loading:false
    },
    info: {
        mode: '',
        packagePostData: {}
    },
    params: {
        page: 1,
        pageSize: 20,
    },
    total: 0,
    maxPage: 0,
    toggleDetail(){
        this.setData({
            detailVisible: !this.data.detailVisible
        })
    },
    handleLike(){
        const data = {
            worksId: this.data.id,
            status: !this.data.liked
        }
        worksServices.like(data).then(({data})=>{
            let { msg } = data.data;
            const count = this.data.liked ? this.data.likeQuantity-1: this.data.likeQuantity+1
            this.setData({
                liked: !this.data.liked,
                likeQuantity: count
            })
            wx.showToast({title: msg, icon: 'none'});
        })
    },
    getCommentList() {
        if(this.loading) return
        this.loading = true
        worksServices.getWorksComment({
            ...this.params,
            worksId: this.data.id
        })
        .then(({data: {data}}) => {
            this.setData({
                'comment.list':this.data.comment.list.concat(data.list),
                'commentCount.all': data.total
            })
            this.total = data.total
            this.maxPage = Math.ceil(this.total/this.params.pageSize)
            this.loading = false
            if(this.params.page === this.maxPage){
                this.setData({finished: true})
            }
        })
    },
    toDesignerDetail(){
        wx.navigateTo({url: '/pages/designer/index/index?id='+this.data.designer.id})
    },
    inputComment(e){
        this.setData({
            commentContent: e.detail.value
        })
    },
    commentLike({currentTarget:{dataset:{index}}}){
        worksServices.commentLike({
            commentId: this.data.comment.list[index].commentId,
            status: !this.data.comment.list[index].liked
        }).then(({data})=>{
            const d = this.data.comment.list[index];
            const count = d.liked ? d.likeQuantity - 1: d.likeQuantity + 1;
            this.setData({
                ['comment.list[' + index + '].liked']: !d.liked,
                ['comment.list[' + index + '].likeQuantity']: count
            })
            wx.showToast({title: data.data.msg, icon: 'none'})
        })
    },
    submitComment(){
        const dialog = this.selectComponent('#dialog');
        if(this.data.commentContent === ''){
            wx.showToast({title:'请输入评价', icon: 'none'})
            return;
        }
        const params = {
            worksId: this.data.id,
            content: this.data.commentContent
        }
        worksServices.commentStore(params).then(({data})=>{
            dialog.show({
                title: '提交成功',
                content: '评价已提交成功，审核后发布'
            })
        })
    },
    initPage() {
        this.data.id && worksServices.getWorksDetail(this.data.id).then(({data}) => {
            let {likeQuantity, designer, liked, product} = data.data
            const arr = []
            product.images.forEach(item=>{
                arr.push({url: item})
            })
            this.setData({
                inited: !0,
                product,
                liked,
                designer,
                likeQuantity,
                imgList:　arr
            })
            WxParse.wxParse('goodsDesc', 'html', product.desc, this);
        })
        this.getCommentList()
        //itemServices.getProductHistory()
    },
    rpx2px(rpx) {
        return rpx & ratio
    },
    handleTabClick({currentTarget: {dataset: {type}}}) {
        this.setData({
            tabActive: type
        })
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
    reachBottom(){
        if(this.loading){
            return;
        }
        if(this.params.page < this.maxPage){
            this.params.page++;
            this.getCommentList()
        }
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        if(options.id) this.setData({id: decodeURIComponent(options.id)}),this.initPage()
        
    },


    /**
     * 页面展示
     */
    onShow() {
        
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

        const data = this.data,
        curPages =  getCurrentPages(),
        page = curPages[curPages.length - 1].route;
        return {
            title: data.name,
            imageUrl: data.image,
            path: `/${page}?id=${data.id}`
        }
    },
});
