// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: '老师',id:'0'},
      {value: '学生',id:'1'},
    ],
    uerId:null
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
  //修改全局变量selectCodition的值
  radioChange: function (e) {
    var con = e.detail.value
    app.globalData.userId=con
  },
  login:function(e){
    var con = app.globalData.userId
    if(con==1){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
    else if (con == 0){
      wx.redirectTo({
        url: '/pages/index/T_index',
      })
    }
    
  }
  
})