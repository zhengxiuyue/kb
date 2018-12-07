var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    phoneNumber: "",
    classid: null,
    coursename:""
  },
  GOclass_signUp: function (e) {
    var that = this;
    var classid = that.data.classid;
    wx.navigateTo({
      url: '../class_order/class_order?classid=' + classid,
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
    var num = 1
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
    wx.request({
      url: requestIP + '/student/getClassInfo',
      data: {
        classid: that.data.classid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.resultCode)
        if (res.data.resultCode == '101') {
          console.log(res.data.data);
          that.setData({
            courseList: res.data.data,
            phoneNumber:res.data.data.hotline,
            coursename: res.data.data.coursename            
          });
        }
      },
      fail(res) {
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    var classid = wx.getStorageSync("classid");
    var res_status = app.globalData.res_status;
    that.setData({
      classid: classid,
      res_status: res_status
    })
    console.log(classid);
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
        console.log(res.data.resultCode)
        if (res.data.resultCode == '101') {
          console.log(res.data.data);
          that.setData({
            courseList: res.data.data,
            phoneNumber: res.data.data.hotline,
            coursename: res.data.data.coursename 
          });
        }
      },
      fail(res) {
      }
    })
  }
})