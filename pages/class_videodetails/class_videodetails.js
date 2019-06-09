// pages/class_videodetails/class_videodetails.js
var app = getApp();
var requestIP = app.globalData.requestIP
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:[],
    space: "/image/space.png",
    Isvideospace:"none",
    scheduleid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var scheduleid = that.options.scheduleid
    that.setData({
      scheduleid: scheduleid 
    })
    wx.request({
      url: requestIP + '/user/getVideo',
      data: {
        scheduleid: scheduleid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            video : res.data.data
          })
        }
        else if (res.data.resultCode == "204") {
          that.setData({
            video: [],
            Isvideospace: "block"
          })
        }
        else {
          wx.showToast({
            title: '请求失败',
            icon: 'none',
          })
        }
      },
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
    var that = this
    var coursename = that.data.coursename
    var classid = that.data.classid
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.shareStatus
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/class_videodetails/class_videodetails?shareStatus=' + shareStatus
    }
  },
  GovideoWebView: function (e) {
    var that = this;
    app.globalData.video_link = e.currentTarget.dataset.link
    wx.navigateTo({
      url: '/pages/videoWebView/videoWebView?scheduleid='+that.data.scheduleid,
    })
  },
})