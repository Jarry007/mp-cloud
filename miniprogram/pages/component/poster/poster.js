// pages/component/poster/poster.js
const app = getApp()

Component({


   data: {
      bgImg: '',
      cWidth: '',
      cHeight: ''
   },

   attached() {
      const sysInfo = wx.getSystemInfoSync();
      const screenWidth = sysInfo.screenWidth;
      const screenHeight = sysInfo.screenHeight;
      
      this.setData({
         cWidth: screenWidth - 10,
         cHeight: screenHeight - 200
      })


     

   },

   methods: {
      addHeader() {
         const ctx = wx.createCanvasContext('poster', this)
         wx.getImageInfo({
            src: 'https://686f-hotel-ryl3f-1300107389.tcb.qcloud.la/ddd/1566900894822_86.jpg?sign=58f0d5bd2ce2a772e2a433ee8f8c5524&t=1566975579',
            success: res => {
               console.log(res)
               this.setData({
                  bgImg: res.path
               })
               let img_w = res.width,
                  img_h = res.height,
                  scale = img_w / img_h;
               if (scale > 1) {
                  var width = this.data.cWidth,
                     height = width / scale
               } else {
                  var height = this.data.cHeight,
                     width = scale * height
               }
               
               ctx.drawImage(res.path, 0, 0, width, height)

               wx.getImageInfo({
                  src: app.globalData.avatarUrl,
                  success: res => {
                     let avatar_w = 60,
                        avatar_h = 60,
                        avatar_x = 20,
                        avatar_y = 20;

                     //   ctx.save()
                     ctx.beginPath()
                     ctx.arc(avatar_x / 2, avatar_y / 2, avatar_w / 2, 0, 2 * Math.PI)
                     ctx.setFillStyle('black')
                     ctx.fill()
                     // ctx.clip()
                     console.log(res.path)
                     ctx.drawImage(res.path, avatar_x, avatar_y, avatar_w, avatar_h)
                     
                     ctx.font = 'normal normal 30px sans-serif';
                     ctx.setFillStyle('#ddd')
                     ctx.fillText(app.globalData.userInfo.nickName, 100, 150);
                     ctx.draw()
                     console.log('123')
                  }
               })
               
            }
         })
   }}

})