// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
   try {
      const result = await cloud.openapi.wxacode.get({
         path:event.path,
         line_color:event.line_color
      })
      console.log(result)
      return result
   } catch (err) {
      console.log(err)
      return err
   }
}