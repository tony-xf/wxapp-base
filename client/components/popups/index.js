Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的对外属性，是属性名到属性设置的映射表
     */
    properties: {
        position: {
            type: String,
            value: 'bottom'
        },
        duration: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的内部数据，和 properties 一同用于组件的模板渲染
     */
    data: {
        display: false,
        visible: false,
        animationBg: null,
        animationCover: null,
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

    /**
     *  组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
     */
    methods: {
        onTouchmove(){
            return false;
        },
        onAnimationend () {
            if(!this.data.visible) {
                this.setData({
                    display: false
                })
            }
        },
        _close() {
            this.close()
        },
        close() {
            this.setData({
                visible: false,
            }, () => {
              this.setData({display: false})
              this._closeAnimation();
            })
        },
        show() {
            this.setData({
                visible: true,

            }, () => {
                this.setData({display: true})
                this._showAnimation();
            })
        },

        _showAnimation() {
            this.setData({
                animationBg: 'fade-enter',
                animationCover: `${this.data.position}-enter`
            })
        },

        _closeAnimation() {
            this.setData({
                animationBg: 'fade-leave',
                animationCover: `${this.data.position}-leave`
            })
        },
    }

});
