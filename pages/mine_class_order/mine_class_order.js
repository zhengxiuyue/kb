// pages/mine_class_order/mine_class_order.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:null,//预约列表
    Isclassspace:"none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     that.getMyShedule();
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

  getMyShedule:function(){
      var that = this;
      wx.request({
        url: requestIP + '/student/getMyShedule',
        data: {
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'userid': app.globalData.userid
        },
        success(res) {
          console.log(res.data.data);
          if (res.data.resultCode == '101') {
            that.setData({
              orderList: res.data.data
            });
          }else{
            that.setData({
              orderList: res.data.data
            });
          }
        },  
        fail(res) {
          that.setData({
            orderList: ""
          });
        }
      })
  }
})