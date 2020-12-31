const app = getApp();
const services = app.services
const makeIconUrl = services.makeIconUrl
Component({
  /**
   * 组件的一些选项
   */
  options: {
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    customStyle: String,
    iconUrl: {
      type: String,
      value: ''
    },
    navTitle: {
      type: String,
      value: '金海岸'
    },
    bgColor: {
      type: String,
      value: '#fff'
    }, 
    textColor: {
      type: String,
      value: '#fff',
    },
    isCustom: {
      type: [Boolean, String],
      value: false
    },
    isBack: {
      type: [Boolean, String],
      value: true
    },
    useCunstonActionBar: {
      type: [Boolean, String],
      value: false
    },
    useTitleSlot: {
      type: [Boolean, String],
      value: false
    },
    showIcon: {
      type: [Boolean, String],
      value: false
    },
    bgImage: {
      type: String,
      value: ''
    },
    isCustom: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTapIcon() {
      this.triggerEvent('tapicon')
    },
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/home/index',
      })
    },
  },
  created() {
    console.log('attached')
  },
})