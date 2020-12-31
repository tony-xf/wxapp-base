
import ENV_CONSTANTS from '../../config/index'
function getEnv() {
    return ENV_CONSTANTS.APP_DEBUG ? ENV : prod;
}

function setEnv(e) {
  ENV = e;
}

var network = "network_env",
prod = "prod",
beta = "beta",
dev = "dev",
prodHosts = {
    API_HOST: "http://jha.lrz.dev.jentian.com/applet/",
    DESIGNER_HOST: "http://jha.lrz.dev.jentian.com/designer/",
    HOST: "https://m.baoyuyoujia.com/",
    MEMBER_HOST: 'https://wx9b33e8e31047ea37.baoyuyoujia.com/'
},
devHosts = {
    API_HOST: "http://jha.sjj.dev.jentian.com/applet/",
    DESIGNER_HOST: "http://jha.lrz.dev.jentian.com/designer/",
    HOST: "http://jade-mall-wap.lrz.develop.csmall.com",
    MEMBER_HOST: 'http://wx3260515a4514ec94.member-c.try.csmall.com/'
},
defaultEnv = prod, 
ENV = defaultEnv; 
export default {
    NETWORK_ENV: network,
    ENV_PROD: prod,
    ENV_BETA: beta,
    ENV_DEV: dev,
    ENV_DEFAULT: defaultEnv,
    AUTHORIZATION_PAGE: '/pages/ucenter/login/index',
    initEnv: function() {
        var env = defaultEnv;
        try {
            var envFromStorage = wx.getStorageSync(network);
            envFromStorage && (env = envFromStorage);
        } catch (e) {}
        setEnv(env);
    },
    getApiHost: function() {
        switch (getEnv()) {
          case prod:
            return prodHosts;
          case beta:
            return betaHosts;
          case dev:
            return devHosts;
          default:
            return prodHosts;
        }
    },
    setEnvToStorage: function(e) {
        wx.setStorageSync(network, e),
        setEnv(e);
    },
    getEnvFromStorage: function() {
        return config.APP_DEBUG ? wx.getStorageSync(network) : Promise.resolve(prod);
    }
};
