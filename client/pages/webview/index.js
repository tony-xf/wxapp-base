//index.js
//获取应用实例
const app = getApp(),
services = app.services,
User = services.User;

Page({
    data: {
        webviewLink: ''
    },

    /**
     * 页面加载
     */
    onLoad(options) {
       
        var memberLink = options.memberLink,
        url = options.url,
        withToken = options.withToken,
        token=wx.getStorageSync('token')
        if (memberLink) {
            let url = decodeURIComponent(memberLink)
            url.indexOf("?") > -1 ? url += "&" : url += "?"
            //url += `t=${new Date().getTime()}`
            // User.SID && (url += "token=" + User.SID)
            token && (url += "token=" + token)
            this.setData({
                webviewLink: url
            })
        } else if(url) {
            let mallUrl = decodeURIComponent(url)
            mallUrl.indexOf("?") > -1 ? mallUrl += "&" : mallUrl += "?"
            //mallUrl += `t=${new Date().getTime()}`
            // withToken && (User.SID && (mallUrl += "&token=" + User.SID))   
            withToken && (token && (mallUrl += "&token=" + token))   
            this.setData({
                webviewLink: mallUrl
            })
        }

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
