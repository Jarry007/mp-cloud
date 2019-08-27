// pages/getUser/getUser.js
function toDate(date){
   const year = date.getFullYear()
   const month = date.getMonth() + 1
   const day = date.getDate()
   const hour = date.getHours()
   const minute = date.getMinutes()
   const second = date.getSeconds()

   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
   n = n.toString()
   return n[1] ? n : '0' + n
}

const db = wx.cloud.database()
Page({

   /**
    * 页面的初始数据
    */
   data: {

   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
   getId(){
      wx.cloud.callFunction({
         name:'login',
         data:{},
         success:res=>{
            console.log('res',res.result.event.userInfo)
            wx.setStorageSync('openid', res.result.event.userInfo.openId)

           db.collection('user').add({
              data:{
                 openid: res.result.event.userInfo.openId,
                 timestamp:toDate(new Date())
              },
              success:res=>{
                 console.log(res)
              }
           })
         }
      })
   },
   queryAll(){
      db.collection('user').get().then(res=>{
         console.log(res.data)
      })
   },
   queryUser(){
      const openid = wx.getStorageSync('')
      db.collection('user').where({

      })
   },
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
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