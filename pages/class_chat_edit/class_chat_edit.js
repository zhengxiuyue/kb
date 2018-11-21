// pages/class_chat_edit/class_chat_edit.js
var app = getApp();
// var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatcontent:"",
    chattime:"",
    classid:"",
    level:"",
    coursename:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var classid = that.options.classid
    var level = that.data.items.level
    var coursename = that.data.items.coursename
    that.setData({
      coursename:coursename,
      classid:classid ,
      level:level
    })
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

  chatInput: function (event) {
    this.setData({ 
      chatcontent: event.detail.value.replace(/\s+/g, '') 
    })
  },

  returnchat: function (e) {
    var that = this;
    var requestIP = app.globalData.requestIP
    //判断评论是否为空
    if (that.data.chatcontent.length == 0) {
      wx.showToast({
        title: '请输入评论!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //发请求
    else {
      wx.request({
        url: requestIP + '/user/addDiscuss',
        data: {
          classid: that.data.classid,
          content:that.data.chatcontent,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
            })
            
          } else {
            console.log("请求失败");
          }
        },
      })
    }
  }
})