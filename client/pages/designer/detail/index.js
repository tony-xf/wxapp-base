import worksServices from '../../../api/works'
import handleReqError from '../../../utils/handleReqError'
//获取应用实例
const app = getApp(),
services = app.services,
Img = services.Img,
Hosts = services.Hosts;

Page({
    data: {
        designer: {
            id: 'a7fe670e-c75f-dab6-dd2d-f1e885992225',
            sex: '1',
        },
        form:{
            avatar: '',
            idCard: '',
            sex: '1',
            email: '',
            style: '',
            school: '',
            address: {},
            introduction: ''
        },
        region: []
    },
    loading: false,
    handleInput(e){
        const name = e.currentTarget.dataset.name;
        const key = 'form.'+name
        this.setData({
            [key]: e.detail.value
        })
    },
    changeRadio(e){
        this.setData({
            'form.sex': e.detail
        })
    },
    changeArea(e){
        const area = e.detail.value.join('')
        const areaCode = e.detail.code.join(',')
        this.setData({
            'form.address.areaCode': areaCode,
            'form.address.address': '',
            'form.address.area': area
        })
    },
    beforeRead(event){
        const { file, callback } = event.detail;
        callback(file.size < 5242880);
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
            formData: { type: 'image',species: 'avatar' },
            success(res) {
                const d = JSON.parse(res.data)
                if(d.code === 0){
                    _this.setData({
                        'form.avatar': d.data.url
                    })
                }else{
                    wx.showToast({title:d.msg, icon: 'none'})
                }
            },
        });
    },
    handleSubmit(){
        if(this.loading){
            return;
        }
        this.loading = true
        const check = this.checkForm()
        if(check){
            worksServices.designerUpdate(this.data.form).then(({data})=>{
                this.loading = false
                let {msg} = data.data
                wx.showToast({title: msg, icon: 'none'})
            }).catch((res)=>{
                this.loading = false
                handleReqError(res)
            });
        }
    },
    checkForm(){
        const d = this.data.form;
        if(d['idCard'] && !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(d['idCard'])){
            wx.showToast({title: '请输入正确格式的身份证号', icon: 'none'})
            return false;
        }
        if(d['mobile'] && !/^1[0-9]{10}$/.test(d['mobile'])){
            wx.showToast({title: '请输入正确格式手机号码', icon: 'none'})
            return false;
        }
        if(d['email'] && !/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(d['email'])){
            wx.showToast({title: '请输入正确格式邮箱', icon: 'none'})
            return false;
        }
        return true;
    },
    getDetail(){
        worksServices.designerInfo().then(({data})=>{
            for(let i in this.data.form){
                if(data.data[i]){
                    this.data.form[i] = data.data[i]
                }
            }
            this.data.form.sex = data.data.sex+''
            this.setData({
                designer: data.data,
                form: this.data.form
            })
        }).catch(handleReqError)
    },
    toPage({currentTarget: {dataset: {url}}}){
        wx.navigateTo({url})
    },
    /**
     * 页面加载
     */
    onLoad(options) {
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
