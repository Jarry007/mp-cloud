// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const wxContext = cloud.getWXContext()
exports.main = async (event, context) => {
   try {
      const result = await cloud.openapi.templateMessage.getTemplateList({
         offset: 0,
         count: 10
      })
      // let tempID = result.list[1]

      // const msg = await cloud.openapi.templateMessage.send({
      //    touser: wxContext.OPENID,
      //    data: {
      //       keyword1: {
      //          value: '云顶之弈'
      //       },
      //       keyword2: {
      //          value: '2019年08月30日 20:30'
      //       },
      //       keyword3: {
      //          value: '我要吃鸡'
      //       },
      //       keyword4: {
      //          value: '德玛西亚'
      //       }
      //    },
      //    templateId: tempID,
      //    formId: event.formId
      // })

      return result

      
   } catch (err) {
      console.log(err)
      return err
   }
}