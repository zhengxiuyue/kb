// pages/schedule_order/schedule_order.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error_noClass:'none',
    courseList:null,
    classid:null,
    coursename:null,
    classnumber:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var classid = that.options.classid;
    var coursename = that.options.coursename;
    var classnumber = that.options.classnumber;
    console.log(classid + classnumber + coursename);
    that.setData({
      classid: classid,
      coursename: coursename,
      classnumber: classnumber
    })
    that.getClassSchedule();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.getClassSchedule();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getClassSchedule: function (e) {
    var that = this;
    var classid = that.data.classid;
    var classnumber = that.data.classnumber;
    var coursename = that.data.coursename;
    wx.request({
      url: requestIP + '/student/getInSchedule',
      data: {
        classid: classid,
        coursename: coursename,
        classnumber: classnumber
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
            error_noClass: 'none',
            courseList: res.data.data
            })
        }else{
          that.setData({
            error_noClass: 'block',
            courseList:null
          }) 
        }
      },
      fail(res) {
        that.setData({
          error_noClass: 'block',
          courseList: null
        }) 
      }
    })
  }
})