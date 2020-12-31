import createService from '../utils/createService'
const service = createService({
  prefix: 'login',
  methods: [{
    name: 'silent-login',
    alias: 'code2login'
  }]
})
export default service
// const api = {
//   isBindMobile:() => http.get('login/bind-mobile'),
//   checkLoginStatus:() => http.get('login/status'),
//   authorization: params => fly.post('login/memberAuthorization', params),
//   designerAuthorization: params => fly.post('designer/authorization', params),
//   designerLoginByMobile: params => http.post('designer/mobile', params),
//   // authorization: params => fly.post('login/authorization', params),
//   code2login: params => fly.post('login/silent-login', params),
//   loginByWxMobile: params => http.post('login/memberMobileLogin', params),
//   // loginByWxMobile: params => http.post('login/bind-mobile', params),
//   loginByMobile: params => http.post('login/verifyShortLogin', params),
//   sendSms: params => http.post('login/sendSms', params),
//   checkLoginVerifyCode: params =>
//     http.get('login/checkVerifyCode/smsSignIn/' + params),
//   getUserInfo:() => http.get('login/user'),
//   editUserInfo:(params) => http.post('login/user',params),
//   loginVerifyCode: () =>
//     new Promise((resolve, reject) => {
//       wx.request({
//         url: Hosts.getApiHost().API_HOST + 'login/verifyCode/smsSignIn',
//         responseType: 'arraybuffer',
//         success: resolve,
//         fail: reject
//       })
//     })
// }

// export default api
