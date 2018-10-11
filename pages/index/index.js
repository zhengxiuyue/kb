// pages/xiuyue/xiuyue.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取全局变量
  onLoad: function (options) {
    app.editTabBar();
    var that = this;
    var userId=app.globalData.userId
    this.setData({
      userid: userId
    })
    console.log(options.title)
    this.setData({
      msgList: [
        { url: "url", title: "原11月12日模特课改为11月13号同一时间同一地点上课！" },
        { url: "url", title: "原11月12日模特课取消！" },
        { url: "url", title: "原11月12日模特课改为11月13号同一时间同一地点上课！" }]
    });
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
  more:function(){
    wx.redirectTo({
      url: '/pages/more/more'
    })
  },
  notice: function () {
    wx.navigateTo({
      url: '/pages/notice/notice',
    })
  },
  enterclass:function(){
    wx.navigateTo({
      url: '/pages/class_students/class_students',
    })
  }
})