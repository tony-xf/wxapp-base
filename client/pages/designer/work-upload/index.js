import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
KeyToUrl = services.KeyToUrl,
Hosts = services.Hosts;

Page({
    loading: false,
    data: {
        form:{
            worksId: '',
            name: '',
            worksImage: [],
            detailImage: []
        },
        visible: false,
        actions: [],
        categoryOptions: [],
        worksList: [],
        detailList: [],
        attrRes: {
            categoryId: '',
            categoryAttribute: [],
            categoryExtensionField: [],
        },
        categoryText: ''
    },
    again: 0, //是否再次申请
    handleInput(e){
        const name = e.currentTarget.dataset.name
        const key = 'form.'+name;
        this.setData({
            [key]: e.detail.value
        })
    },
    onCancel(){
        this.setData({visible: false})
    },
    onSelect(e){
        const id = e.detail.id
        this.getAttr(id)
        this.getExtension(id)
    },
    selectAttr(){
        const attrView = this.selectComponent('#selectAttr');
        attrView.show(this.data.attrRes)
    },
    handleDelete(e) {
        const mode = e.currentTarget.dataset.mode;
        const index = e.detail.index;
        let fileList = this.data[mode]
        fileList.splice(index, 1)
        this.setData({
            [mode]: fileList
        })
    },
    beforeRead(event){
        const { file, callback } = event.detail;
        if(file.size >= 2097152){
            wx.showToast({title: '图片不能大于2M', icon:'none'})
        }
        callback(file.size < 2097152);
    },
    afterRead(event) {
        const { file } = event.detail;
        const host = services.Hosts.getApiHost().DESIGNER_HOST
        let token = wx.getStorageSync('token')
        const _this = this;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
            url: host+'works-apply/upload.json',
            name: 'file',
            filePath: file.url,
            header: {
                'Cookie': token ? 'sid='+token: '',
                'access-token': token || ''
            },
            success(res) {
                const d = JSON.parse(res.data)
                if(d.code === 0){
                    const { worksList = [] } = _this.data;
                    worksList.push({ ...file, url: d.data });
                    _this.setData({ worksList });
                }else{
                    wx.showToast({title: d.msg, icon:'none'})
                }
            },
        });
    },
    afterReadDetail(event){
        const { file } = event.detail;
        const host = services.Hosts.getApiHost().DESIGNER_HOST
        let token = wx.getStorageSync('token')
        const _this = this;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
            url: host+'/works-apply/upload.json',
            name: 'file',
            filePath: file.url,
            header: {
                'Cookie': token ? 'sid='+token: '',
                'access-token': token || ''
            },
            success(res) {
                const d = JSON.parse(res.data)
                if(d.code === 0){
                    const { detailList = [] } = _this.data;
                    detailList.push({ ...file, url: d.data });
                    _this.setData({ detailList });
                }else{
                    wx.showToast({title: d.msg, icon:'none'})
                }
            },
        });
    },
    confirmAttr(e){
        const obj = e.detail.value;
        const d =Object.assign(this.data.form, obj)
        this.setData({
            form: d,
            attrRes: obj,
            categoryText: e.detail.categoryText
        })
    },
    submit(){
        if(this.loading){
            return;
        }
        this.tidyFormData();
        const checked = this.checkForm()
        if(checked){
            this.loading = true;
            if(this.data.form.worksId){
                this.workUpdate()
            }else{
                this.workAdd()
            }
        }
    },
    workAdd(){
        return new Promise((resolve, reject)=>{
            worksServices.uploadWorks(this.data.form).then(({data})=>{
                let { msg } = data.data
                wx.showToast({title: msg, icon: 'none'})
                resolve()
                this.loading = false;
                setTimeout(()=>{
                    wx.navigateTo({
                        url:'/pages/designer/goods-list/index'
                    });
                }, 2000)
            }).catch((res)=>{
                this.loading = false
                handleReqError(res)
            })
        })
    },
    workUpdate(){
        return new Promise((resolve, reject)=>{
            const d = {...this.data.form}
            if(this.again == 1){
                d.id = this.data.form.worksApplyId
            }
            worksServices.updateWorks(d).then(({data})=>{
                let { msg } = data.data
                wx.showToast({title: msg, icon: 'none'})
                resolve()
                this.loading = false
                setTimeout(()=>{
                    wx.navigateTo({
                        url:'/pages/designer/goods-list/index'
                    });
                }, 2000)
            }).catch((res)=>{
                this.loading = false
                handleReqError(res)
            })
        })
    },
    tidyFormData(){
        const works = [];
        const detail = []
        this.data.worksList.forEach(item=>{
            works.push(item.url.url)
        })
        this.data.detailList.forEach(item=>{
            detail.push(item.url.url)
        })

        this.setData({
            'form.worksImage': works,
            'form.detailImage': detail

        })
    },
    checkForm(){
        if(!this.data.form.name){
            wx.showToast({title: '请输入作品名称', icon: 'none'})
            return false
        }
        if(!this.data.form.categoryId){
            wx.showToast({title: '请填写资料', icon: 'none'})
            return false
        }
        if(this.data.form.worksImage.length < 1){
            wx.showToast({title: '请上传作品图片', icon: 'none'})
            return false
        }
        return true
    },
    getCategory(){
        worksServices.category().then(({data})=>{
            data.data.forEach(item=>{
                item.selected = false
            })
            this.setData({
                categoryOptions: data.data
            })
        })
    },
    setDefault(){
        const works = [];
        const detail = [];
        const form = this.data.form
        form.detailImage.forEach(item=>{
            detail.push({deletable: true,thumb: item,isImage: true,url: {url:item}})
        })
        form.worksImage.forEach(item=>{
            works.push({deletable: true, thumb: item,isImage: true,url: {url:item}})
        })
        for(let i in this.data.attrRes){
            if(this.data.form[i]){
                this.data.attrRes[i] = this.data.form[i]
            }
        }
        this.setData({
            detailList: detail,
            worksList: works,
            attrRes: this.data.attrRes
        })
    },
    getDetail(id){
        worksServices.worksEditDetail(id).then(({data})=>{
            this.setData({
                form: data.data
            })
            this.setDefault()
        }).catch(handleReqError)
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.getCategory()
        if(options.worksId){
            this.again = options.again
            this.getDetail(options.worksId)
        }
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
