// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
  },

  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData

    this.setData({
      fileID,
      cloudPath,
      imagePath,
    })

  },
   download(){
      wx.cloud.downloadFile({
         fileID:this.data.fileID,
         success:res=>{
            console.log(res)
            this.setData({
               imagePaths:res.tempFilePath
            })
         },
         fail:err=>{
            console.log(err)
         }
      })
   }
})