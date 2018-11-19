// pages/class_des/class_des.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    courseList:null,
    courseid:null,
    visible1: false,
   // ordername:null,
    order_phonenumber:"17671260413",
    actions1: [
      {
        icon:null,
        name: "负责人电话"
      },
      {
        icon: 'mobilephone',
        name: ' 电话预约',
      }
    ]
  },
  handleClickItem1({ detail }) {
    const index = detail.index + 1;
    if (index == 2) {
      wx.makePhoneCall({
        phoneNumber: this.data.order_phonenumber
      });
    }
  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  onLoad: function (options) {
    var that = this;
    var classid = wx.getStorageSync("classid")
    console.log(classid);
    wx.request({
      url: requestIP + '/student/getClassInfo',
      data: {
        classid: classid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'openid': app.globalData.openid
      },
      success(res) {
        console.log(res.data.resultCode)
        if (res.data.resultCode == '101') {
          that.setData({
            courseList: res.data.data,
          //  actions1[0].name: res.data.data.teachername,
            //order_phonenumber: res.data.data.phone
          });
        }
      },
      fail(res) {
      }
    })
  }
})