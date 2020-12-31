import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
Img = services.Img,
Hosts = services.Hosts;

Page({
    data: {
        keyword: '',
        list: [],
        options: {
            page: 1,
            pageSize: 20,
            likeCode: '',
            type: '',
            status: '',
            assignStartTime: '',
            assignEndTime: ''
        },
        total: 0,
        finished: false,
        filterList:[],
        timeIcon: Img['timeIcon'],
        icon: Img['errorIcon'],
        minDate: new Date(1970).getTime(),
        maxDate: new Date().getTime(),
    },
    loading: false,
    total: 0,
    maxPage: 1,
    filterIdArr: [],
    handleInput(e){
        this.setData({
            'options.likeCode': e.detail.value
        },()=>{
            this.data.options.page = 1;
            this.data.list = []
            this.getList()
        })
    },
    confirmTime(e){
        const key = 'options.'+e.currentTarget.dataset.mode
        this.setData({
            [key]: e.detail.value
        })
    },
    handleScroll(){
        if(this.loading){
            return
        }
        if(this.data.options.page < this.maxPage){
            this.data.options.page++;
            this.getList()
        }
    },
    getList(){
        const params = this.getParams()
        worksServices.customOrder(params).then(({data})=>{
            const d = data.data
            const list = this.data.list.concat(d.list)
            this.total = d.total
            this.maxPage = Math.ceil(d.total/this.data.options.pageSize)
            this.setData({
                list,
                total: d.total
            })
            if(this.data.options.page >= this.maxPage){
                this.setData({
                    finished: true
                })
            }
        })
    },
    getParams(){
        const obj = {}
        this.tidyFilterRes();
        for(let i in this.data.options){
            if(this.data.options[i] !== ''){
                obj[i] = this.data.options[i]
            }
        }
        return obj
    },
    tidyFilterRes(){
        this.data.options.type = ''
        this.data.options.status = ''
        this.filterIdArr.forEach(item=>{
            this.data.options[item.pid] = item.id
        })
    },
    getFilterOption(){
        Promise.all([this.getEnumOptions('type'), this.getEnumOptions('status')]).then((data)=>{
            this.setData({
                filterList: data
            })
            console.log(data)
        })
    },
    getEnumOptions(key){
        const map = {
            type: '类型',
            status: '状态'
        }
        return new Promise((resolve, reject)=>{
            worksServices.getEnum(key).then(({data})=>{
                data.data.forEach(item=>{
                    item.id = item.value
                    item.name = item.label
                });
                resolve({id: key, label: map[key], isAll: true, attribute: data.data})
            }).catch(handleReqError);
        })
    },
    toOrderDetail(e){
        wx.navigateTo({
            url:'/pages/designer/custom-detail/index?id='+e.currentTarget.dataset.id
        });
    },
    confirmFilter(e){
        const component = this.selectComponent('#filterView')
        component.close()
        this.data.options.page = 1
        this.data.list = []
        if(e.detail && e.detail.mode === 'reset'){
            this.setData({
                'options.assignEndTime': '',
                'options.assignStartTime': '',
            },()=>{
                this.getList()
            })
        }else{
            this.getList()
        }
    },
    clearFilter(){
        const component = this.selectComponent('#filterView')
        component.reset()
    },
    showFilter(){
        const component = this.selectComponent('#filterView')
        component.show()
    },
    handleSelected(e){
        this.filterIdArr = e.detail.value
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.getList()
        this.getFilterOption()
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
