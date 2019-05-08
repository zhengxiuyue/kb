var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error_noClass: 'none',
    courseList: '',//近1周课表列表
    userstatus: null,
  },

  //获取全局变量
  onLoad: function (options) {
    var that = this;
    //创建节点选择器

    app.editTabBar2();
    var userstatus = app.globalData.userstatus
    this.setData({
      userstatus: userstatus,
    })

    this.getMyCourse();
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
    this.getMyCourse();
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
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
    }
  },
  
  enterclass: function (e) {
    var index = e.currentTarget.dataset.index;
    var courseList = this.data.courseList;
    var classid = courseList[index].classid;
    wx.navigateTo({
      url: '/pages/class/class?classid=' + classid,
    })
  },

  //获取我的课表
  getMyCourse: function (e) {
    var that = this;
    wx.request({
      url: requestIP + '/assistant/getMyCourse',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          that.setData({
            courseList: res.data.data
          });
          that.setData({
            error_noClass: "none"
          });
        }
        else {
          that.setData({
            courseList: null
          });
          that.setData({
            error_noClass: "block"
          });
        }
      },
      fail(res) {
        that.setData({
          courseList: null
        });
        that.setData({
          error_noClass: "block"
        });
      }
    })
  },
})