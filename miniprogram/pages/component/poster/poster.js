// pages/component/poster/poster.js
const app = getApp()
const promise = (url)=>{
   return new Promise((resolve,reject)=>{
      wx.getImageInfo({
         src: url,
         success:res=>{
            resolve(res)
         },
         fail:err=>{
            reject(err)
         }
      })
   })
}

Component({

   options: {
      addGlobalClass: true
     
   },
   data: {
      bgImg: '',
      cWidth: '',
      cHeight: ''
   },

   attached() {
      const sysInfo = wx.getSystemInfoSync();
      const screenWidth = sysInfo.screenWidth;
      const screenHeight = sysInfo.screenHeight;
      let code = wx.getStorageSync('erCode')
      this.setData({
         cWidth: screenWidth - 20,
         cHeight: screenHeight - 200
      })

      wx.cloud.downloadFile({
         fileID: code,
         success: res => {
            promise(res.tempFilePath).then(e => {
               console.log('promise', e)
               this.setData({
                  erCode: e.path
               })
            })

         }
      })
     

   },
   ready(){
      let  code = wx.getStorageSync('erCode')
      console.log(code)
   },
   methods: {
      exportImg() {
         wx.showLoading({
            title: '正在保存',
            mask: true
         })
         setTimeout(() => {
            wx.canvasToTempFilePath({
               canvasId: 'poster',
               success: res => {
                  wx.hideLoading()
                  let posterImg = res.tempFilePath;
                  wx.saveImageToPhotosAlbum({
                     filePath: posterImg,
                     success: e => {
                        wx.showToast({
                           title: '成功',
                           icon: 'success'

                        })
                        this.setData({
                           show:false
                        })
                     }
                  })
               }
            }, this)
         }, 1000)
      },
      showModal() {
         this.setData({
            show: true
         })
      },
      hideModal() {
         this.setData({
            show:false
         })
      },
      addHeader() {
         let that = this
        
         let info = wx.getStorageSync('userinfo'),
            avatar = info.avatarUrl,
            nickname = info.nickName;
            wx.showLoading({
               title: '生成中....',
            })
         const ctx = wx.createCanvasContext('poster', this)
         wx.getImageInfo({
            src: 'https://686f-hotel-ryl3f-1300107389.tcb.qcloud.la/oAXn74jMliGEDSPVDUQf853JPCTk/1567048834458_14.png?sign=712cadc3b6b0bb286254c57aa77353c5&t=1567048887',
            success: res => {
              
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
               ctx.beginPath()
               ctx.setFillStyle('#5e00ff')
               ctx.rect(0,0,this.data.cWidth,this.data.cHeight)
               ctx.fill()
              
               ctx.drawImage(res.path, 0, 0, width, height)
              
              
                  wx.getImageInfo({
                     src: avatar,
                     success: res => {
                        let avatar_w = 60,
                           avatar_h = 60,
                           avatar_x = 20,
                           avatar_y = 20;
                     //头像
                        ctx.save()
                        ctx.beginPath()
                        ctx.arc(avatar_x+avatar_w/2, avatar_h /2 + height+avatar_y  , avatar_w / 2, 0, 2 * Math.PI)
                        ctx.clip()
                        ctx.drawImage(res.path, avatar_x, avatar_y+height, avatar_w, avatar_h)
                        
                        //昵称
                        ctx.restore()
                        ctx.font = 'normal normal 16px PingFangSC-Medium sans-serif';
                        ctx.setFillStyle('#FFF')
                        ctx.fillText(nickname, avatar_x + avatar_w + 10, avatar_h / 2 + height + avatar_y/2);
                        //介绍
                        ctx.setFillStyle('#ddd')
                        ctx.setFontSize(12)
                        ctx.fillText('AIoT @与时俱进', avatar_x + avatar_w + 10,height+avatar_y+avatar_h-10)

                     //二维码下方文字
                        ctx.setFontSize(12)
                        ctx.setFillStyle('#F2F2F2')
                        const text_ = '长按或扫码进入小程序'
                        const metrics = ctx.measureText(text_)
                       
                        console.log(metrics.width)
                        ctx.fillText(text_, width - metrics.width- 10 , that.data.cHeight - 10)
                     //二维码   
                        ctx.save()
                        ctx.beginPath()
                        ctx.arc(width-(metrics.width+10)/2, that.data.cHeight -80, 50, 0, 2 * Math.PI)
                        ctx.setFillStyle('#fff')
                        ctx.fill()
                        ctx.clip()
                        ctx.drawImage(that.data.erCode, width - (metrics.width + 10) / 2 -50, that.data.cHeight-130, 100, 100)

                     //文字内容x
                        ctx.restore()
                        ctx.font = 'normal normal bold 18px sans-serif';
                        ctx.setFillStyle('#fff')
                        ctx.fillText('云上的新世界', avatar_x , height + 120);
                        ctx.setFontSize(17)
                        ctx.fillText('我们已经进入了', avatar_x, height + 150);
                        ctx.fillText('万物互联的时代...', avatar_x, height + 170);
                        ctx.draw()
                      

                        that.setData({
                           show: true
                        })

                        wx.hideLoading()
                     }
                  })
               
            }
         })
   }},
  

})