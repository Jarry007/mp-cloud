const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
  },
  /**
   * 组件的初始数据
   */
  attached(){
     if (app.globalData.barInfo.StatusBar){
        this.setData({
           StatusBar: app.globalData.barInfo.StatusBar,
           CustomBar: app.globalData.barInfo.CustomBar,
           Custom: app.globalData.barInfo.Custom
        })
     }else{
        console.log('callbackkkkkk')
        app.sysCallBack=e=>{
           let custom = wx.getMenuButtonBoundingClientRect();
           this.setData({
              StatusBar: e.statusBarHeight,
              CustomBar: custom.bottom + custom.top - e.statusBarHeight,
              Custom: custom
           })
        }
     }
  },
  data: {
    StatusBar: app.globalData.barInfo.StatusBar,
     CustomBar: app.globalData.barInfo.CustomBar,
     Custom: app.globalData.barInfo.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})