Component({

    /**
     * 组件的对外属性，是属性名到属性设置的映射表
     */
    properties: {
        paymentMode: {
            type: Array,
            value: []
        },
        currentPaymentMode: {
            type: Object,
            observer: function({payPlatformMode}) {
                this.selectedMode = payPlatformMode
            }
        }
    },

    /**
     * 组件的内部数据，和 properties 一同用于组件的模板渲染
     */
    data: {
        channelLogo: {
            yibao_xcx: '/images/pay_wechatpay.png',
            yibao: '/images/pay_yeepay.png'
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
        this.payType = this.selectComponent('#payType')
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

    /**
     *  组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
     */
    methods: {
        radioChange({detail: {value}}) {
            this.selectedMode = value
        },
        confirm(e) {
            const mode = this.selectedMode
            const currentPaymentMode = this.data.currentPaymentMode
       
            if (mode == currentPaymentMode.payPlatformMode) {
                this.close()
                return
            }

           this.triggerEvent('confirm', mode)
        },
        close() {
            this.payType.close()
        },
        show() {
            this.payType.show()
        }
    }

});
