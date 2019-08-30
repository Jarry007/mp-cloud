const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
cloud.init({
   env: 'jarry007-b8c893'
})

exports.main = async (event, context) => {

   try {
      return await cloud.uploadFile({
         cloudPath: event.path,
         fileContent: new Buffer(event.file, 'base64')
      })
   } catch (e) {
      return e;
   }
}