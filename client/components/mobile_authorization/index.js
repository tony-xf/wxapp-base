import LoginService from '../../api/login'
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的对外属性，是属性名到属性设置的映射表
     */
    properties: {
       show: {
           type:Boolean,
           value:false
       }
    },

    /**
     * 组件的内部数据，和 properties 一同用于组件的模板渲染
     */
    data: {
       
    },

    /**
     * 组件生命周期函数-在组件实例刚刚被创建时执行，注意此时不能调用 setData )
     */
    created() {

    },

    /**
     * 组件生命周期函数-在组件实例进入页面节点树时执行)
     */
    attached() {

    },

    /**
     * 	组件生命周期函数-在组件布局完成后执行)
     */
    ready() {
        this._wxLogin()
    },

    /**
     * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行)
     */
    moved() {

    },

    /**
     * 组件生命周期函数-在组件实例被从页面节点树移除时执行)
     */
    detached() {

    },

    /**
     *  组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
     */
    methods: {
        getPhoneNumber(e){
          console.log('getPhoneNumber',e)
          if (e.detail.errMsg === 'getPhoneNumber:ok') {  
            if(this.loading){
              return;
            }
            const _this = this;
            const detail = e.detail
            const data = {
              code: this.code,
              iv: encodeURIComponent(detail.iv),
              encryptedData: encodeURIComponent(detail.encryptedData)
            }
            this.loading = true
            this._sendBindMobile(data)
          }
        },
        _wxLogin(){
            const _this = this
            wx.login({
                success (res) {
                    if (res.code) {
                        //发起网络请求
                        _this.code = res.code
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        },
        _sendBindMobile(data){
            wx.showLoading()
              LoginService.loginByWxMobile(
                  data
              ).then(({data:{code, data}})=>{
                 wx.hideLoading()
                  this._wxLogin() 
                  this.loading = false
                wx.setStorageSync('isBindMobile',true)
                this.triggerEvent('mobile',data)

              }).catch((res)=>{
              wx.hideLoading()
                  this._wxLogin()
                  this.loading = false
                //   handleReqError(res)
              })
          },
    }

});
