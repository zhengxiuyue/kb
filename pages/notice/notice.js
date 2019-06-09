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
    errortips:"暂无相关通知",
    noticeList:"",
    imgUrl: "/image/photo.png"
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
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    this.getNotice();
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
      path: '/pages/notice/notice?shareStatus=' + shareStatus
    }
  },
  //获取通知
  getNotice: function (e) {
    var that = this;
    var province = wx.getStorageSync("Nprovince");
    var areaname = wx.getStorageSync("Nareaname");
    var city = wx.getStorageSync("Ncity");
    wx.request({
      url: requestIP + '/student/getNotice',
      data: {
        province: province,
        areaname: areaname,
        city: city
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
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