//index.js
//获取应用实例
const app = getApp(),
services = app.services,
Hosts = services.Hosts,
User = services.User;

Page({
    data: {
        env: Hosts.ENV_PROD,
        envs: [
            {
                name: "prod",
                value: Hosts.ENV_PROD
            },
            {
                name: "dev",
                value: Hosts.ENV_DEV
            }
        ]
    },
    bindTapEnv() {
        Hosts.setEnvToStorage(this.data.env)
        User.removeSync()
        wx.reLaunch({
            url: "/pages/home/index"
        });
    },
    envChange(e) {
        this.setData({
            env: e.detail.value
        })
    },
    /**
     * 页面加载
     */
    onLoad(options) {
        var env = Hosts.getEnvFromStorage() || Hosts.ENV_PROD
        var appInfo = "用户信息: " + JSON.stringify(User)
        this.setData({
            appInfo,
            env
        })
    },

    /**
     * 页面展示
     */
    onShow() {
    },

    /**
     * 页面渲染成功
     */
    onReady() {
    },

    /**
     * 页面隐藏
     */
    onHide() {
    },

    /**
     * 页面卸载
     */
    onUnload() {
    },

});
