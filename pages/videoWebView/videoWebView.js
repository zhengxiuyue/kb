// pages/videoWebView/videoWebView.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_link:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      video_link: app.globalData.video_link
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
  onShow: function (options) {
    if (options.num == 4) {
      wx.request({
        url: requestIP + '/user/IsClass',
        data: {
          userid: app.globalData.userid,
          classid: options.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res) {
          if (res.data.resultCode == '101') {
           
          }
          else {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '服务器异常',
            icon: 'none'
          })
        }
      })
    }
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
    var nickname = app.globalData.nickName
    var num = 4
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/videoWebView/videoWebView?video_link=' + that.data.video_link + '&classid=' + wx.getStorageSync('classid') + '&num=' + num
    }
  }
})