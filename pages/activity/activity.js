// pages/activity/activity.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,//当前请求页号
    xiala: '',
    activityList:[],//活动列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    var that = this
    that.showActivityList()
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
    var that = this
    if (that.data.xiala != '已经加载出全部'){
      var pageIndex = that.data.pageIndex + 1; //获取当前页数并+1
      that.setData({
        pageIndex: pageIndex, //更新当前页数
        xiala: "加载中..."
      })
      that.showActivityList()
    }    
  },

  GoactivityDetail:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var activityList = that.data.activityList;
    var ay_id = activityList[index].ay_id;
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?ay_id=' + ay_id,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showActivityList:function(){ 
    var that = this
    wx.request({
      url: requestIP + '/activity/getActivityList',
      data: {
        pageNumber: that.data.pageIndex,
        pageSize:6
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          var arr1 = that.data.activityList; //从data获取当前guessList数组
          var arr2 = res.data.data; //从此次请求返回的数据中获取新数组
          arr1 = arr1.concat(arr2); //合并数组  
          that.setData({
            activityList: arr1
          })
        }
        else if (res.data.resultCode == "204") {
          that.setData({
            xiala: "已经加载出全部"
          })
        }
        else {
          console.log("请求失败");
        }
      },
    })
  }
})