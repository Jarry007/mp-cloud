//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
     canIUse: wx.canIUse('button.open-type.getUserInfo'),
     imgUrl:''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
            //   this.setData({
            //     avatarUrl: res.userInfo.avatarUrl,
            //     userInfo: res.userInfo
            //   })
            
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
   getPhoneNumber(e){
      console.log(e)
      const cloudID = e.detail.cloudID
      wx.cloud.callFunction({
         name: 'getrun',
         data: {
            weRunData: wx.cloud.CloudID(cloudID), // 这个 CloudID 值到云函数端会被替换
            obj: {
               shareInfo: wx.cloud.CloudID(cloudID), // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
            }
         },
         success: res => {
            console.log('cloud res', res.result.event.weRunData.data)
         }
      })
   },
   bindGetUserInfo(e) {
      wx.cloud.callFunction({
         name:'getCode',
         data:{
            path: 'pages/home/home',
            line_color:{"r":"142","g":"86","b":"220"}
         },
         success:res=>{
            let imgUrl = wx.arrayBufferToBase64(res.result.buffer)
            this.setData({
               imgUrl: imgUrl
            })
            // 上传图片
            const cloudPath =  'dddds/'+new Date().valueOf() + '_' + Math.floor(Math.random() * 100) + '.png'
            console.log(cloudPath)
            wx.cloud.callFunction({
               name:'uploadBase',
               data:{
                  path:cloudPath,
                  file:imgUrl
               },
               success:res=>{
                  console.log('success',res)
               },
               fail:err=>{
                  console.log(err)
               }
            })
         }
      })
//       const APPID = 'wxffsdnfeoifh12jg515',
//          APPSECRET = '4848hjbvtyted47af4386tg'
//       let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

// let that = this
//       wx.request({
//          url: url,
//          method:'GET',
//          success:res=>{
//             console.log('res',res.data.access_token)
//             let token = res.data.access_token
//             let data_ = {
              
//                path: 'pages/home/home'
//             }
//             wx.request({
//                url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${token}`,
//                method:'POST',
//                responseType:'arraybuffer',
//                header: {
//                   'content-type': 'application/x-www-form-urlencoded'
//                },
//                data:JSON.stringify(data_),
//                success:e=>{
                  
//                   let imgUrl = wx.arrayBufferToBase64(e.data);
                
//                   that.setData({
//                      imgUrl: imgUrl
//                   })
//                }
//             })
//          }
//       })
//       console.log(e.detail.userInfo)
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
      app.globalData.userInfo = e.detail.userInfo
   },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    const openid = wx.getStorageSync('openid')
    if(openid){
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
         console.log(res.tempFilePaths)
        wx.showLoading({
          title: '上传中',
        })
      

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
         const cloudPath = openid+"/"+ new Date().valueOf() + '_' + Math.floor(Math.random()*100)  + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
       })
    }else{
       wx.redirectTo({
          url: '../sigle/login/login'
       })
    }
  },

})
