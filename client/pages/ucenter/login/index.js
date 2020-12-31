import LoginService from '../../../api/login'
import WorkService from '../../../api/works'
import handleReqError from "../../../utils/handleReqError";
import {isTabBar} from "../../../utils/tools";
const app = getApp()
const event = app.event
Page({
  loading: false,
  code: '',
  data: {
	  isAuthorization: false,
    isBindMobile: false,
  },
  /**
   * 页面加载
   */
  onLoad(options) {
    if(app.type==='designer') {
      this.fromDesigner = true
    }
    // if(this.getPages().route.indexOf('pages/designer')>-1&&this.getPages().route!='pages/designer/list/index'){
    //   this.fromDesigner = true
    // }
	  this.successUrl = options.successUrl && decodeURIComponent(options.successUrl)
	  this._wxLogin()
  },
  /**
   * 页面卸载
   */
  onUnload() {
	this.loginCompleted || event.emit('login', { errMsg: 'login:cancel' })
    event.emit('login.close')
  },

  /**
   * 页面展示
   */
  onShow() {
    console.log('onshow',this.loading)
  },

  /**
   * 页面渲染成功
   */
  onReady() {},

  /**
   * 页面隐藏
   */
  onHide() {},
  getPages() {
    const pages = getCurrentPages()
    return pages[pages.length - 2]
},
  getUserInfo(e){
    if (e.detail.errMsg === 'getUserInfo:ok') {
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
      //判断是否是处于设计师页面 走不同的状态
      this.fromDesigner? this._sendDesignerAuthorization(data):this._sendAuthorization(data)
      
    }
  },
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
        encryptedData: encodeURIComponent(detail.encryptedData),
        gender:this.data.gender,
        nick:this.data.nick,
        tempId:this.data.tempId,
        avatar:this.data.avatar
      }
      this.loading = true
      this.fromDesigner? this._sendDesignerBindMobile(data):this._sendBindMobile(data)

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
  _authSuccess(data){
    data.errMsg = 'login:ok'
	this.loginCompleted = true
    event.emit('login', data)
    setTimeout(() => {
      this.successRedirect()
	}, 1100);
	
  },
  successRedirect() {
    // console.log(this.successUrl)
    // debugger
    if (this.successUrl) {
      isTabBar(this.successUrl) ?  wx.switchTab({url: this.successUrl}) : wx.redirectTo({ url: this.successUrl })
    } else {
      wx.navigateBack()
    }
  },
  _sendAuthorization(data){
      wx.showLoading()
      LoginService.authorization(
          data
      ).then(({data:{code, data}})=>{
         wx.hideLoading()
      	  this._wxLogin()
          this.loading = false;
		  if(data.isBinding){
        wx.setStorageSync('token', data.token)
			  this._authSuccess(data)
		  }else {
			  this.setData({
				  isAuthorization: true,
          isBindMobile: data.isBinding,
          gender:data.gender,
          nick:data.nick,
          tempId:data.tempId,
          avatar:data.avatar
			  })
		  }

      }).catch((res)=>{
        wx.hideLoading()
        this._wxLogin()
        this.loading = false
        // handleReqError(res)
      })
  },
  _sendDesignerAuthorization(data){
      wx.showLoading()
      WorkService.designerAuthorization(
          {data}
      ).then(({data:{code, data}})=>{
         wx.hideLoading()
      	  this._wxLogin()
          this.loading = false;
          if(data.success) {
              wx.setStorageSync('token', data.token)
              this._authSuccess(data)
              return;
              // wx.redirectTo({
              //   url:'/pages/designer/center/index'
              // })
          }
          //未绑手机
		  if(!data.mobileFlag){
        return this.setData({ 
				  isAuthorization: true,
          isBindMobile: data.mobileFlag,
          clienteleId:data.clienteleId
			  })
     
      }
      //未申请
      if(!data.applied) {
        wx.redirectTo({
          url:`/pages/designer/entry/index?id=${data.clienteleId}`
        })
      }
      //申请过 判断审核状态
      if(data.applied) {
        //audit 0待审核   1审核通过    2审核不通过
          wx.redirectTo({url:`/pages/designer/apply-complete/index?id=${data.clienteleId}`})
      }
      //登录成功

      // else {
			//   this.setData({
			// 	  isAuthorization: true,
      //     isBindMobile: data.mobileFlag,
      //     clienteleId:data.clienteleId
			//   })
		  // }

      }).catch((res)=>{
        wx.hideLoading()
        this._wxLogin()
        this.loading = false
        // handleReqError(res)
      })
  },
  _sendDesignerBindMobile(data){
    wx.showLoading()
    data = Object.assign(data,{clienteleId:this.data.clienteleId})
    WorkService.designerLoginByMobile(
          data
      ).then(({data:{code, data}})=>{
        wx.hideLoading()
        this._wxLogin() 
        this.loading = false
        if(!data.applied) {
          wx.redirectTo({
            url:`/pages/designer/entry/index?id=${data.clienteleId}`
          })
        }
          this.setData({
			      isBindMobile: true
          })
	  }).catch((res)=>{
      wx.hideLoading()
		  this._wxLogin()
		  this.loading = false
		//   handleReqError(res)
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
      wx.setStorageSync('token',data.customerInfo.token)
      // data.token = data.customerInfo.token
		  this._authSuccess(data)
          this.setData({
			  isBindMobile: true
          })
	  }).catch((res)=>{
      wx.hideLoading()
		  this._wxLogin()
		  this.loading = false
		//   handleReqError(res)
	  })
  },
})
