import createService from '../utils/createService'
const service = createService({
  prefix: 'login',
  methods: [{
    name: 'silent-login',
    alias: 'code2login'
  }]
})
export default service
