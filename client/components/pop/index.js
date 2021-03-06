import LoginService from '../../api/login'
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的对外属性，是属性名到属性设置的映射表
     */
    properties: {
       show: {
           type:Boolean,
           value:false
       },
       name: {
         type: String,
         value:''
       }
    },

    /**
     * 组件的内部数据，和 properties 一同用于组件的模板渲染
     */
    data: {
       
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
      handleInput({detail:{value}}) {
        value = value.replace(' ','')
        this.triggerEvent('popInput',value)
      },
      cancel() {
        this.triggerEvent('cancel')
      },
      confirm() {
        this.triggerEvent('confirm')
      },
    }

});
