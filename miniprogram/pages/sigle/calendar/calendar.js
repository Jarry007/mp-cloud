const weeks = ['日', '一', '二', '三', '四', '五', '六']
function getWeelDay(year, month, day) {
   return new Date(year)
}
Page({

   /**
    * 页面的初始数据
    */
   data: {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      datePick: false
   },
   start_(e) {
      this.setData({
         Start: e.touches[0].pageX,
         animation: false
      })
      console.log('start', this.data.Start)
   },
   move_(e) {
      let x = e.touches[0].pageX - this.data.Start
      if (x > -100 && x < 0) {
         this.setData({
            movex: x
         })
      }

      this.setData({
         show: e.touches[0].pageX - this.data.Start > 0 ? 'hide' : 'show'
      })
      console.log('move', x)
   },
   end_(e) {
      if (this.data.show == 'show') {
         this.setData({
            movex: -100,
            animation: true
         })
      } else {
         this.setData({
            movex: 0,
            animation: true
         })
      }
      // this.setData({
      //    ListTouchDirection: null
      // })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      // let date = new Date()
      // let currentYear = date.getFullYear(),
      // currentMonth = date.getMonth(),
      // currentDay = date.getDate()

      // let monthNum = new Date(currentYear,currentMonth+1,0).getDate()
      // let week = new Date(currentYear, currentMonth, 1).getDay()
      // this.setData({
      //    currentYear:currentYear,
      //    currentMonth:currentMonth,
      //    currentDay:currentDay,
      //    monthNum: monthNum,
      //    week: week,
      //    nowYear: currentYear,
      //    nowMonth: currentMonth,
      //    nowDay: currentDay
      // })
      this.initDay()

   },
   initDay() {
      let date = new Date()
      let currentYear = date.getFullYear(),
         currentMonth = date.getMonth(),
         currentDay = date.getDate()

      let monthNum = new Date(currentYear, currentMonth + 1, 0).getDate()
      let week = new Date(currentYear, currentMonth, 1).getDay()
      this.setData({
         currentYear: currentYear,
         currentMonth: currentMonth,
         currentDay: currentDay,
         monthNum: monthNum,
         week: week,
         nowYear: currentYear,
         nowMonth: currentMonth,
         nowDay: currentDay
      })

   },
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },
   bindChange(e) {
      console.log(e.detail.value[0], e.detail.value[1])
      this.setData({
         choseHours: e.detail.value[0],
         choseMin: e.detail.value[1]
      })
   },
   choseDay(e) {
      let index_ = e.currentTarget.dataset.day
      if (index_ > 0) {
         if (this.data.choseMonth == this.data.currentMonth && this.data.choseDay == index_) {
            this.setData({
               choseDay: '',
               choseYear: '',
               choseMonth: '',
               choseDay: '',
               datePick: false
            })
         } else {
            console.log(this.data.currentYear, this.data.currentMonth, index_)
            let choseDate = this.data.currentYear + '' + this.data.currentMonth + '' + index_
            this.setData({
               choseDate: choseDate,
               choseYear: this.data.currentYear,
               choseMonth: this.data.currentMonth,
               choseDay: index_,
               datePick: true
            })
         }

      }

   },
   lastMonth() {
      this.setData({
         anmation:true
      })
      let Remainder = this.data.currentMonth % 12;
      if (this.data.currentMonth < 1) {
         var currentYear = this.data.currentYear - 1 - parseInt(this.data.currentMonth / 12)
         var currentMonth = 12 - Math.abs(Remainder) - 1
      } else {
         var currentYear = this.data.currentYear + parseInt(this.data.currentMonth / 12)
         var currentMonth = Remainder - 1
      }
      let monthInt = parseInt(this.data.currentMonth / 12)

      // let currentDay = this.data.currentDay;
      let monthNum = new Date(currentYear, currentMonth + 1, 0).getDate()
      let week = new Date(currentYear, currentMonth, 1).getDay()
      this.setData({
         currentYear: currentYear,
         currentMonth: currentMonth,
         monthNum: monthNum,
         week: week
      })
      setTimeout(()=>{
         this.setData({
            anmation:false
         })
      },1000)
      console.log(currentYear, currentMonth, week, monthNum)
   },
   nextMonth() {
      this.setData({
         anmation:true
      })
      let Remainder = (this.data.currentMonth + 1) % 12;
      if (Remainder < 0) {
         var currentYear = this.data.currentYear - 1 - parseInt(Remainder / 12)
         var currentMonth = 12 - Math.abs(Remainder)
      } else {
         console.log(Remainder)
         var currentYear = Remainder == 0 ? this.data.currentYear + 1 : this.data.currentYear + parseInt(Remainder / 12)
         var currentMonth = Remainder
      }
      let monthInt = parseInt(this.data.currentMonth / 12)

      // let currentDay = this.data.currentDay;
      let monthNum = new Date(currentYear, currentMonth + 1, 0).getDate()
      let week = new Date(currentYear, currentMonth, 1).getDay()
      this.setData({
         currentYear: currentYear,
         currentMonth: currentMonth,

         monthNum: monthNum,
         week: week
      
      })
      setTimeout(() => {
         this.setData({
            anmation: false
         })
      }, 1000)
      console.log(currentYear, currentMonth, week, monthNum)
   }
})