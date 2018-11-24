// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    windowHeight:null,
    username:"",
    item: [],//定义变长数组课堂信息
    Isclassspace:"none",
    userstatus:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();

    //page高度加高
    //创建节点选择器
    var query = wx.createSelectorQuery();    //选择id    
    var that = this;
    query.select('.page').boundingClientRect(function (rect) {      // 
      that.setData({
        windowHeight: rect.height + 45 + 'px'
      })
    }).exec();

    var userstatus = app.globalData.userstatus
    this.setData({
      userstatus: userstatus,
    })
    console.log(that.data.userstatus)
   
    var requestIP = app.globalData.requestIP

    wx.request({
      url: requestIP+'/user/getMyInfo',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            username: res.data.data.name
          })
        } else {
          console.log("请求失败");
        }
      },
    })

    wx.request({
      url: requestIP + '/student/getMyClass',
      data: {
        state: this.data.current
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            item: [],
            Isclassspace: "none"
          })
          for (var i = 0, len = res.data.data.length; i < len; i++) 
          { 
            that.data.item[i] = res.data.data[i]
          } 
          that.setData({ 
            item: that.data.item
          })
        } 
        else if (res.data.resultCode == "204") {
          // console.log(res.data.resultCode)
          that.setData({
            item: [],
            Isclassspace:"block"
          })
        } 
        else {
          console.log("请求失败");
        }
      },
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
        //显示自定义的底部导航
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

  changeTab(e) {
    let index = parseInt(e.currentTarget.dataset.index || 0)
    let that = this
    this.setData({
      current: index
    })
    var requestIP = app.globalData.requestIP
    wx.request({
      url: requestIP + '/student/getMyClass',
      data: {
        state: this.data.current
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            item: [],
            Isclassspace: "none"
          })
          for (var i = 0, len = res.data.data.length; i < len; i++) {
            that.data.item[i] = res.data.data[i]
          }
          that.setData({
            item: that.data.item
          })
          console.log(that.data.item)
        }
        else if (res.data.resultCode == "204") {
          that.setData({
            item: [],
            Isclassspace:"block"
          })
        } 
        else {
          console.log("请求失败");
        }
      },
    })
  },
  dropDown:function(e){
    wx.navigateTo({
      url: '/pages/mine_setup/mine_setup',
    })
  }
})




