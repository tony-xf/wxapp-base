Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
	/**
	 * 组件的对外属性，是属性名到属性设置的映射表
	 */
	properties: {
		placeholder: {
			type: String,
			value: ''
		},
		placeholderStyle: {
			type: String,
			value: ''
		},
		maxlength: {
			type: [String, Number]
		},
		value: {
			type: String,
			value: '',
			observer: function(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.setDeault(newVal)
				}
			}
		}
	},

	/**
	 * 组件的内部数据，和 properties 一同用于组件的模板渲染
	 */

	data: {
		hidden: true,   // 控制弹窗显示隐藏
		content:'',
		textareaVal: '',        // textarea的文本值
		Focus:false,

	},
	/**
	 * 组件生命周期函数-在组件实例刚刚被创建时执行，注意此时不能调用 setData )
	 */
	created() {},

	/**
	 * 组件生命周期函数-在组件实例进入页面节点树时执行)
	 */
	attached() {},

	/**
	 * 	组件生命周期函数-在组件布局完成后执行)
	 */
	ready() {
		this.setData({
			textareaVal: this.data.value,
			content: this.data.value
		})
	},

	/**
	 * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行)
	 */
	moved() {},

	/**
	 * 组件生命周期函数-在组件实例被从页面节点树移除时执行)
	 */
	detached() {},
	/**
	 *  组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
	 */
	methods: {
		//聚焦的时候
		isFocus: function () {
			this.setData({
				hidden: false,
				Focus:true
			})
		},
		//失去焦点的时候，隐藏textarea，给view赋值内容，通过中间变量，在textarea隐藏的时候再赋值。
		getOut(e){
			this.setData({
				hidden: true,
				Focus: true,
				textareaVal: this.data.content,
			})
		},
		setDeault(val){
			this.setData({
				content: val
			})
		},
		//textarea显示的时候，获取他的内容
		textarea: function (e) {
			this.setData({
				content: e.detail.value
			})
			this.triggerEvent('change', e.detail.value)
		},
	}
})
