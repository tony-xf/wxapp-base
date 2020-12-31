Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    visible: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    addText: {
      type:String,
      value:'进入首页'
    },
    cancelTxt: {
      type:String,
      value: '取消'
    },
    confirmText: {
      type:String,
      value: '确定'
    },
    addVisible: {
      type:Boolean,
      value:false
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    add() {
      this.triggerEvent('add','add')
    },
    // 这里是自定义方法
    confirm() {
      this.triggerEvent('confirm','confirm')
    },
    cancel({currentTarget:{dataset:{type}}}) {
      if(type == 'close') {type = 'close'}
      if(type == 'cancel') {type = 'cancel'}
      this.triggerEvent('cancel',type)
    }
  }
})