// pages/notice/notice.js
var app = getApp();
var requestIP = app.globalData.requestIP;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userstatus: app.globalData.userstatus,
    error_noNotice:"none",
    errortips:"暂时没有通知",
    noticeList:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotice();
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
  //获取通知
  getNotice: function (e) {
    var that = this;
    wx.request({
      url: requestIP + '/student/getNotice',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          console.log("通知"+res.data.data)
          that.setData({
            noticeList: res.data.data,
             error_noNotice: "none"
          });
        }
        else{
          that.setData({
            noticeList:null,
            error_noNotice: "block"
          });
        }
      }
    })
  }

})