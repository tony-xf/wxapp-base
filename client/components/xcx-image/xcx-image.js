// components/xcx-image/xcx-image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    customStyle: {
      type: Object,
      default: null
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    borderRadius: {
      type: Number|String,
      default: 0
    },
    src: {
      type: String,
      default: '',
      observer: function(val) {
        val && this.setData({
          _src: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _src: "",
    error: !1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onError(e) {
      this.setData({
        _src: "/images/error_image.png"
      })
    },
  },
  attached() {
    this.setData({
      _src: this.data.src ? this.data.src : "/images/error_image.png",
      error: !0
    })
  }
})
