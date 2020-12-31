Component({
  options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    cancelTxt: {
      type:String,
      value: '取消'
    },
    confirmText: {
      type:String,
      value: '确定'
    },
    showClose: {
      type: Boolean,
      value: false
    },
    showCancel: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 这里是一些组件内部数据
    visible: false,
    title: '',
    content: '',
    confirm: null,
    cancel: null,
  },
  methods: {
    // 这里是自定义方法
    confirm() {
      if(this.data.confirm){
        this.data.confirm().then(()=>{
            this.close()
        })
      }else{
          this.close()
      }
    },
    cancel() {
        this.close()
        if(this.data.cancel){
            this.data.cancel()
        }
    },
    show({title = '', content = '', confirm = null, cancel = null}) {
      this.setData({
          visible: true,
          title,
          content,
          confirm,
          cancel
      })
    },
    close() {
      this.setData({
          visible: false
      })
    }
  }
})