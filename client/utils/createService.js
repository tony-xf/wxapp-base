import hosts from '../common/services/hosts.js'

const createService = function(obj){
  const host = hosts.getApiHost().API_HOST;
  const apiObj = {}
  const options = {
    host,
    prefix: '',
    methods: [],
    ...obj
  }
  options.methods.forEach(function(item) {
    const o = {
      host: item.host || options.host,
      prefix: item.prefix || options.prefix,
      method: 'GET' || item.method,
      header: {}
    }
    let _o = {...o};
    if(typeof _o === 'string'){
      _o = {
        ...o,
        name: item
      }
    }
    _o = Object.assign({}, _o, item)
    apiObj[_o.name] = function(option = {}){
      let paramKeys = option.params && Object.keys(option.params)
      _o.pathName = _o.name
      paramKeys &&
        paramKeys.forEach((v) => {
          let reg = new RegExp(`:${v}`)
          _v.pathName = _v.name.replace(reg, option.params[v])
        })
      let token = wx.getStorageSync('token')
      console.log(_o)
      _o.header['Cookie'] = token ? 'sid='+token: '';
      _o.header['access-token'] = token || ''
      return new Promise((resolve, reject)=>{
        wx.showNavigationBarLoading()
        wx.request({
          url: _o.host + (_o.prefix ? _o.prefix+'/':'') + _o.pathName,
          method: _o.method,
          header: _o.header,
          data: option.data,
          success: function(res) {  
            wx.hideNavigationBarLoading()
            if (res.statusCode === 200 && res.data.code === 0) {
              return resolve(res.data)
            } else if (res.statusCode === 401 && res.data.code === 401) {
              //.....
              wx.navigateTo({
                url: hosts.AUTHORIZATION_PAGE
              })
            } else {
              return reject(res)
            }
          },
          fail: function(err) {
            wx.hideNavigationBarLoading()
            reject(err)
          },
          complete: function() {
            wx.hideNavigationBarLoading()
          }
        })
      })
    }
    _o.alias && (apiObj[_o.alias] = apiObj[_o.name])
  });
  return apiObj
}
export default createService
