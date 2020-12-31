import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
    services = app.services,
    KeyToUrl = services.KeyToUrl;

Page({
    data: {
        title: 'page',
        pageInited: !1,
        goodsList: [],
        height: '',
        loadAll: false,
        selectShow:false,
        filterShow:false,
        selectOrderText:'默认排序',
        min:'',
        max:'',
        total:'',
        adList:[],
        attributeList:[],
        attributeIdsArr:[],
        categoryId:'',
        topNum:0,
        filterList:[],
        options: {
            page: 1,
            pageSize: 10,
            order:'all',
            categoryId: '',
            attribute: ''
        },
        orderOptions: [{
            key: 'all',
            value: '默认排序'
        },{
            key: 'like_asc',
            value: '点赞从低到高'
        },{
            key: 'like_desc',
            value: '点赞从高到低'
        },{
            key: 'focus_asc',
            value: '关注从低到高'
        },{
            key: 'focus_desc',
            value: '关注从高到低'
        }],
        hasFilter: false
    },
    filterIdArr: [],
    maxPage: 1,
    total: 1,
    toGoodsDetail({currentTarget: {dataset: {id, status}}}){
        if(status == 4){
            wx.navigateTo({
                url:'/pages/designer/goods-detail/index?id='+id
            });
        }
    },
    handleSelected(e){
        this.filterIdArr = e.detail.value
        let hasFilter = false;
        if(this.filterIdArr.length > 0){
            hasFilter = true
        }
        this.setData({
            hasFilter
        })
    },
    selectMenu(){
        this.setData({
            selectShow:!this.data.selectShow
        });
    },
    clearDropDown(){
        this.data.goodsList.forEach(item=>{
            item.visible = false
        })
        this.setData({
            goodsList: this.data.goodsList
        })
    },
    showTool({currentTarget: {dataset: {index}}}){
        const visible = this.data.goodsList[index].visible;
        this.setData({
            ['goodsList[' + index + '].visible']: !visible
        })
    },
    worksAdd(){
        wx.navigateTo({
            url:'/pages/designer/work-upload/index'
        });
    },
    worksEdit({currentTarget: {dataset: {status, work}}}){
        wx.navigateTo({
            url:'/pages/designer/work-upload/index?worksId='+work+'&again='+(status==3 ? '1': 0)
        });
    },
    worksDel({currentTarget: {dataset: {id,name}}}){
        const dialog = this.selectComponent('#dialog');
        const _this = this;
        dialog.show({
            title: '删除提示',
            content: `确定删除作品【${name}】吗？`,
            confirm:function(){
                return new Promise((resolve)=>{
                    worksServices.designerWorksDel(id).then(({data})=>{
                        let {msg } = data.data
                        wx.showToast({title: msg, icon: 'none'});
                        resolve()
                    })
                })
            }
        })
    },
    handleOrder({currentTarget: {dataset: {order}}}){
        this.setData({
            ['options.order']: order.key ,
            selectOrderText: order.value
        },()=>{
            this.data.options.page = 1
            this.data.goodsList = []
            this.getList()
        })
    },
    confirmFilter(){
        const component = this.selectComponent('#filterView')
        component.close()
        this.data.options.page = 1
        this.data.goodsList = []
        this.getList()
    },
    clearFilter(){
        const component = this.selectComponent('#filterView')
        component.reset()
    },
    showFilter(){
        const component = this.selectComponent('#filterView')
        component.show()
    },
    lower() {
        if(this.loading){
            return;
        }
        if(this.data.options.page < this.maxPage){
            this.data.options.page++
            this.getList()
        }
    },
    pageInited() {
        this.setData({
            pageInited: !0
        });
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
        if(this.loading){
            return;
        }
        this.loading = true
        return new Promise((resolve, reject)=>{
            const params = this.getParams()
            worksServices.designerWorks(this.urlEncode(params)).then(({data}) => {
                this.loading = false
                data.data.list.forEach(item=>{
                    item.visible = false
                })
                const goodsList = this.data.goodsList.concat(data.data.list)
                this.total = data.data.total;
                this.maxPage = Math.ceil(this.total/this.data.options.pageSize)
                this.setData({
                    goodsList,
                    total: data.data.total,
                });
                if (this.data.options.page >= this.maxPage) {
                    this.setData({
                        loadAll: true
                    });
                }
                resolve();
            }).catch((res)=>{
                this.loading = false
                handleReqError(res)
            });
        })
    },
    tidyParams(){
        const obj = {};
        this.data.options.categoryId = '';
        this.data.options.worksStatus = '';
        this.filterIdArr.forEach(item=>{
            if(item.pid === 'categoryId' || item.pid === 'worksStatus'){
                this.data.options[item.pid] = item.id
            }else{
                obj[item.pid] = [item.id]
            }
        })
        this.data.options.attribute = JSON.stringify(obj)
    },
    getParams(){
        this.tidyParams();
        const obj = {}
        for(let i in this.data.options){
            if(this.data.options[i] !== ''){
                obj[i] = this.data.options[i]
            }
        }
        if(obj.order === 'all'){
            delete obj['order']
        }
        return obj
    },
    getFilter(){
        worksServices.getWorksFilter().then(({data:{data}})=>{
            const arr = []
            data.categories.forEach(jtem=>{
                jtem.chooseStatus=false;
            })
            const category = {
                id: 'categoryId',
                label: '分类',
                isAll: false,
                attribute: data.categories
            }
            arr.push(category)
            data.attributes.forEach(item=>{
                item.isAll=false;
                item.attribute.forEach(jtem=>{
                    jtem.chooseStatus=false;
                })
                arr.push(item)
            });
            this.setData({
                filterList: arr
            }, ()=>{
                this.getWorksStatus();
            })
        })
    },
    getWorksStatus(){
        worksServices.worksStatus().then(({data})=>{
            data.data.forEach(item=>{
                item.id = item.value;
                item.name = item.label
            })
            const d = {
                id: 'worksStatus',
                label: '状态',
                isAll: true,
                attribute: data.data
            }
            this.data.filterList.unshift(d)
            this.setData({
                filterList: this.data.filterList
            })
        })
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.pageInited();
        this.setData({
            pageInited: !0,
        });
        this.getList()
        this.getFilter();
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    height: res.windowHeight-75
                })
            }
        });
    },

    /**
     * 页面展示
     */
    onShow() {
        wx.setStorage({
            key:'categoryUnreset',
            data:true
        });
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

});
