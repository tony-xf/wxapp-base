const env = typeof __wxConfig !== 'undefined' ? __wxConfig.envVersion || 'release' : 'release'
const IS_PROD = env === 'release'
const IS_DEBUG = env !== 'release'
export default {
  IS_PROD,
  IS_DEBUG
}
