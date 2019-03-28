// pages/activityDetail/activityDetail.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: null,
    ay_id: '2'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ay_id = options.ay_id;
    var that = this;
    if (ay_id) {
      that.setData({
        ay_id: ay_id
      })
    }
    that.getActivityDetail();
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
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    this.getActivityDetail();
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

  GoactivityWebView: function () {
    wx.navigateTo({
      url: '/pages/activityWebView/activityWebView',
    })
  },

  GoactivitySignUp: function () {
    wx.navigateTo({
      url: '/pages/activitySignUp/activitySignUp',
    })
  },

  getActivityDetail: function () {
    var that = this;
    var ay_id = that.data.ay_id;
    wx.request({
      url: requestIP + '/activity/getActivityDetail',
      data: {
        id: ay_id
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
            activity: res.data.data
          });
        } else {
          wx.showToast({
            title: "请重试！",
            icon: 'none'
          });
        }
      },
      fail(res) {
      }
    })
  }
})