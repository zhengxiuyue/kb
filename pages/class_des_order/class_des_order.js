var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    Count: -1,//用户预约次数
    phoneNumber: "",
    classid: null,
    coursename:"",
    reverseprice:0,
    courseList:null
  },
  GOschedule_order: function (e) {
    var that = this;
    var classid = that.data.classid;
    var coursename = that.data.coursename;
    var classnumber = that.data.courseList.classnumber
    var level = that.data.courseList.level
    console.log(classid + classnumber + coursename);
    wx.navigateTo({
      url: '../schedule_order/schedule_order?classid=' + classid + "&coursename=" + coursename + "&classnumber=" + classnumber + "&level=" + level
    })
  },
  call: function (e) {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumber,
    })
  },
  //获取手机号码
  telInput: function (event) {
    this.setData({ tel: event.detail.value })
  },
  onShareAppMessage: function (ops) {
    var that = this
    var coursename = that.data.coursename
    var classid = that.data.classid
    var nickname = app.globalData.nickName
    var num = 2
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      path: '/pages/class_des_order/class_des_order?classid=' + classid + '&num=' + num
    }
  },
  
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    var that = this;
    that.getClassInfo();
    that.SubCount();
  },

  onLoad: function (options) {
    var that = this;
    var classid = wx.getStorageSync("classid");
    that.setData({
      classid: classid,
    })
    that.getClassInfo();
    that.SubCount();
  },

  order_ing: function(){
    wx.showToast({
      title: '您的预约申请正在处理中，请勿重复预约!',
      icon: 'none',
      duration: 1000
    })
  },

  order_ed:function(){
    wx.showToast({
      title: '您已预约该课程，请勿重复预约!',
      icon: 'none',
      duration: 1000
    })
  },

  getClassInfo:function(){
    var that = this;
    var classid = that.data.classid;
    wx.request({
      url: requestIP + '/student/getClassInfo',
      data: {
        classid: classid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
        if (res.data.resultCode == '101') {
          that.setData({
            courseList: res.data.data,
            phoneNumber: res.data.data.hotline,
            coursename: res.data.data.coursename,
          });
          if (res.data.data.reversefee) {
            that.setData({
              reverseprice: res.data.data.reversefee
            })
          }
        }
      },
      fail(res) {
      }
    })
  },

  SubCount: function () {
    var that = this;
    wx.request({
      url: requestIP + '/student/subCount',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data)
        if (res.data.resultCode == '101') {
          that.setData({
            Count: res.data.data
          })
        }
      },
      fail(res) {
      }
    })
  }
})