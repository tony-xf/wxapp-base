const env = typeof __wxConfig !== 'undefined' ? __wxConfig.envVersion || 'release' : 'release'
const IS_PROD = env === 'release'
const APP_DEBUG = env !== 'release'
export default {
  IS_PROD,
  APP_DEBUG
}
