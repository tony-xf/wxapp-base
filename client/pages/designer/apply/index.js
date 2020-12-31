import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
KeyToUrl = services.KeyToUrl,
Hosts = services.Hosts;

Page({
    data: {
        form:{
            id: '',
            clienteleId: '',
            name: '',
            idCard: '',
            email: '',
            label: '',
            resume: []
        },

    },
    loading: false,
    handleInput(e){
        const name = e.currentTarget.dataset.name
        const key = 'form.'+name;
        this.setData({
            [key]: e.detail.value
        })
    },
    beforeRead(event){
        const { file, callback } = event.detail;
        if(file.type !== 'file' || file.name.indexOf(".pdf") < 0){
            wx.showToast({title: '仅支持上传pdf文件', icon: 'none'})
            callback(false);
        }
        if(file.size > 5242880){
            wx.showToast({title: '文件大小不能超过5MB', icon: 'none'})
            callback(false);
        }
        callback(true);
    },
    afterRead(event) {
        const { file } = event.detail;
        const host = services.Hosts.getApiHost().DESIGNER_HOST
        let token = wx.getStorageSync('token')
        const _this = this;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
            url: host+'designer-apply/upload.json', // 仅为示例，非真实的接口地址
            name: 'file',
            filePath: file.url,
            header: {
                'Cookie': token ? 'sid='+token: '',
                'access-token': token || ''
            },
            formData: { type: 'file',species: 'resume' },
            success(res) {
                const d = JSON.parse(res.data)
                if(d.code === 0){
                    d.data.label = file.name
                    _this.setData({
                        'form.resume': [d.data]
                    })
                }else{
                    wx.showToast({title: d.msg, icon: 'none'})
                }
            },
        });
    },
    clearResume(){
        this.setData({
            'form.resume': []
        })
    },
    handleSubmit(){
        this.loading = true;
        const d = this.getParams()
        const check = this.checkForm()
        if(check){
            worksServices.applyStore(d).then(({data})=>{
                let { msg } = data.data;
                const dialog = this.selectComponent('#dialog');
                const _this = this
                dialog.show({
                    title: '提交成功',
                    content: '您的申请已收到，我们会尽快审核，请留意您微信绑定的手机号或提交的邮箱地址，我们将会与您联系，如有疑问请咨询客服。',
                    confirm:function(){
                        return new Promise((resolve, reject)=>{
                            wx.navigateTo({url: '/pages/designer/apply-complete/index?id='+_this.data.form.clienteleId})
                            resolve()
                        })
                    }
                })
                this.loading = false
            }).catch((res)=>{
                this.loading = false
                handleReqError(res)
            })
        }
    },
    getParams(){
        const obj = {}
        for(let i in this.data.form){
            if(this.data.form[i] !== ''){
                obj[i] = this.data.form[i]
            }
        }
        return obj
    },
    checkForm(){
        const map = {
            name: '请输入姓名',
            idCard: '请输入身份证号',
            email: '请输入邮箱',
        }
        const d = this.getParams()
        for(let i in map){
            if(!d[i]){
                wx.showToast({title: map[i], icon: 'none'})
                return false
            }
        }
        if(!/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(d['idCard'])){
            wx.showToast({title: '请输入正确格式的身份证号', icon: 'none'})
            return false;
        }
        if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(d['email'])){
            wx.showToast({title: '请输入正确格式邮箱', icon: 'none'})
            return false;
        }
        if(d.resume.length < 1){
            wx.showToast({title: '请上传简历附件', icon: 'none'})
            return false;
        }
        return true
    },
    toHome(){
        wx.switchTab({url: '/pages/home/index'})
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        this.data.form.clienteleId = options.clienteleId
        this.data.form.id = options.id || '';
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
