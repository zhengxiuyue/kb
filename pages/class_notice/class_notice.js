// pages/xiuyue/xiuyue.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    time:"2018年10月6号",
    content:"原11月12日模特课取消！原11月12日模特课改为11月13号同一时间同一地点上课！原11月12日模特课改为11月13号同一时间同一地点上课！",
    title:"课堂延迟通知",
    teacher: "赵雅涵老师",
    userstatus: app.globalData.userstatus
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    uerstatus = app.globalData.uerstatus;
    console.log("ss");
    console.log(uerstatus);
    console.log(app.globalData.uerstatus);
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

  }
})