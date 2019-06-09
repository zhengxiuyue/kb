// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:1,//1是门店预约2课程预约3课程报名4活动报名
    message:"操作成功"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var flag = that.options.flag;
    that.setData({
      flag:flag
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
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/message/message?shareStatus=' + shareStatus
    }
  }
})