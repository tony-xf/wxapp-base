const app = getApp();
const services = app.services,
KeyToUrl = services.KeyToUrl;
Component({

    /**
     * 组件的对外属性，是属性名到属性设置的映射表
     */
    properties: {
        list: Array,
        autoplay: Boolean,
        height: {
            type: Number,
            value: 350
        },
        current: Number,
        duration: {
            type: Number,
            value: 200
        },
        circular: {
            type: Boolean,
            value: false
        },
        dots: {
            type: Boolean,
            value: true
        },
        dotsColor: {
            type: String,
            value: '#d9d9d9'
        },
        dotsActiveColor: {
            type: String,
            value: '#4A608E'
        },
        video: {
            type:String,
            value:''
        }
    },
    /**
     * 组件的内部数据，和 properties 一同用于组件的模板渲染
     */
    data: {
        activeIndex: 0,
        // errorImg: KeyToUrl['errorImg']
        errorImg: 'https://wpl.jentian.com/image//order/comment/2020-10/5b2eee3cf3ec3.png'

    },
    methods: {
        handleTap: function(e) {
            var index = e.currentTarget.dataset.index;
            wx.previewImage({
                current: this.properties.list[index].url,
                urls: this.properties.list.map(val => val.url),
                success: (result)=>{
                    
                },
                fail: ()=>{},
                complete: ()=>{}
            });
            this.triggerEvent("tapslide", {
                index
            });
        },
        handleAnimationFinish: function(t) {
            //this.triggerEvent("didchange", t.detail.current);
        },
        handleChange: function(t) {
            if(this.properties.video) {
                 const video = wx.createVideoContext('video',this)
                 console.log(video)
                t.detail.current !== 0&&video.pause()
            }
            // this.setData({
            //     activeIndex: t.detail.current
            // }), 
            // this.triggerEvent("tapslideStat", t.detail.current);
        },
        handleTransition: function(t) {
            //this.triggerEvent("slidetransition", t.detail);
        },
        handleErr:function (e) {
            const i = e.currentTarget.dataset.index
            this.triggerEvent('imgErr',{i,errorImg:this.data.errorImg})
            // myList = this.data.myList
            // myList[i].url = this.data.errorImg
            // console.log(myList)
            // this.setData({
            //     myList
            // })
        }
    },

    /**
     * 组件生命周期函数-在组件实例刚刚被创建时执行，注意此时不能调用 setData )
     */
    created() {
    },

    /**
     * 组件生命周期函数-在组件实例进入页面节点树时执行)
     */
    attached() {
    },

    /**
     * 	组件生命周期函数-在组件布局完成后执行)
     */
    ready() {
        
    },

    /**
     * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行)
     */
    moved() {

    },

    /**
     * 组件生命周期函数-在组件实例被从页面节点树移除时执行)
     */
    detached() {

    },

});
