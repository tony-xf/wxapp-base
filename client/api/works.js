import createService from '../utils/createService'
import hosts from '../common/services/hosts.js'

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
