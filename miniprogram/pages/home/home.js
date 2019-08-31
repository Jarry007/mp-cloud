// pages/home/home.js
const text = { 'calendar': '预约', 'index': "首页", 'poster': '海报', 'handle': '接口','mine':'我的'}
Page({

   /**
    * 页面的初始数据
    */
   data: {
      curPage: 'calendar',
      title:'预约'
   },
   NavChange(e){
      wx.vibrateShort()
      this.setData({
         curPage: e.currentTarget.dataset.name,
         title: text[e.currentTarget.dataset.name]
      })
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },

  
   onReady: function () {

   },

   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})