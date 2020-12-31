import createService from '../utils/createService'
import hosts from '../common/services/hosts.js'

// const api = {
//   designerAuthorization: params => http.post(url + 'designer/authorization', params),
//   designerLoginByMobile: params => http.post(url + 'designer/mobile', params),
//   getWorksIndex: (params) => http.get('works/index', params),
//   getWorksDetail: (params) => http.get('works/'+params),
//   getWorksFilter: () => http.get('works/filter'),
//   getWorksComment: (params) => http.get('works-comment/index', params),
//   commentStore: (params) => http.post('works-comment/store', params),
//   commentLike: (params) => http.post('works-comment/like', params),
//   like: (params) => http.post('works/like', params),
//   designerAttention: (params) => http.post('designer/attention', params),
//   attentionList: (params) => http.get('designer/attention', params),
//   designerDetail: (params) => http.get('designer/'+params),
//   designerInfo: () => http.get(url+'designer/personal-center'),
//   designerUpdate: (params) => http.put(url+'designer/update', params),
//   designerComment: (params) => http.get(url+'designer/works-comment', params),
//   designerWorks: (params) => http.get(url+'designer/works', params),
//   worksStatus: (params) => http.get(url+'works/status', params),
//   designerWorksDel: (params) => http.delete(url+'designer/works/'+params),
//   designerReply: (params) => http.post(url+'designer/reply', params),
//   category: (params) => http.get(url+'works-apply/category'),
//   upload: (params) => http.get(url+'designer-apply/upload'),
//   applyStore: (params) => http.post(url+'designer-apply/store', params),
//   applyCheck: (params) => http.get(url+'designer-apply/show/'+params),
//   customOrder: (params) => http.get(url+'designer/demand-custom-order', params),
//   customOrderDetail: (params) => http.get(url+'demand-custom-order/'+params),
//   getEnum: (params) => http.get(url+'demand-custom-order/'+params),
//   messageDel: (params) => http.delete(url+'designer/message', params),
//   message: (params) => http.get(url+'designer/message', params),
//   worksAttribute: (params) => http.get(url+'works-apply/attribute/'+params),
//   worksExtension: (params) => http.get(url+'works-apply/extension-field/'+params),
//   uploadWorks: (params) => http.post(url+'works-apply/upload-works',params),
//   updateWorks: (params) => http.post(url+'works-apply/update-works',params),
//   worksEditDetail: (params) => http.get(url+'works-apply/edit/'+params),
//   checkLoginStatus: () => http.get(url+'designer/status'),
//   authorization: (params) => http.post(url+'designer/silent-login', params),
// };

export default createService({
  host: hosts.getApiHost().DESIGNER_HOST,
  methods: [{
    name: 'designer/authorization.json',
    alias: 'designerAuthorization',
    method: 'POST'
  },{
    name: 'designer/mobile.json',
    alias: 'designerLoginByMobile'
  },{
    name: 'works/index.json',
    alias: 'getWorksIndex'
  },{
    name: 'designer/status.json',
    alias: 'checkLoginStatus'
  },{
    name: 'designer/silent-login.json',
    alias: 'authorization'
  }]
});
