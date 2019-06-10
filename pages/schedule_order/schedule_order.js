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
    classnumber:null,
    level:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var classid = that.options.classid;
    var coursename = that.options.coursename;
    var classnumber = that.options.classnumber;
    var level = that.options.level
    that.setData({
      classid: classid,
      coursename: coursename,
      classnumber: classnumber,
      level: level
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
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/schedule_order/schedule_order?shareStatus=' + shareStatus
    }
  },

  enterclass:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var courseList = that.data.courseList;
    var scheduleid = courseList[index].scheduleid;
    var classid = that.data.classid;
    wx.navigateTo({
      url: '../class_order/class_order?scheduleid=' + scheduleid + "&classid=" + classid
    })
  },

  notenterclass:function(){
    wx.showLoading();
    wx.hideLoading();
    setTimeout(() => {
      wx.showToast({
        title: '预约人数已满，不能预约',
        icon: "none",
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000)
    }, 0);
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