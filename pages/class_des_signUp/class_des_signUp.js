// pages/class_des/class_des.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data:{
    phoneNumber: app.globalData.ad_telephone,
    classid:null
  },
  GOclass_signUp:function(e)
  {
    var that = this;
    var classid = that.data.classid;
    console.log("详情页面的"+classid);
    wx.navigateTo({
      url: '../class_signUp/class_signUp?classid='+classid,
    })
  },
  call:function(e){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumber,
    })
  },
  //获取手机号码
  telInput: function (event) {
    this.setData({ tel: event.detail.value })
  },
  onPullDownRefresh: function () {
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
          console.log(res.data.data.hotline);
          that.setData({
            courseList: res.data.data,
            phoneNumber: res.data.data.hotline
          });
        }
      },
      fail(res) {
      }
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '快乐50课表',
      path: 'pages/class_des/class_des',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  onLoad: function (options) {
    var that = this;
    var classid = wx.getStorageSync("classid");
    that.setData({
      classid:classid
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
          console.log(res.data.data.hotline);
          that.setData({
            courseList: res.data.data,
            phoneNumber: res.data.data.hotline
          });
        }
      },
      fail(res) {
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})