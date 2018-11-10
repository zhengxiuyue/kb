var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    windowHeight:null,
    username:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    //创建节点选择器
    var query = wx.createSelectorQuery();    //选择id    
    var that = this;
    var requestIP = app.globalData.requestIP
    query.select('.page').boundingClientRect(function (rect) {      // 
      console.log(rect.height)
      that.setData({
        windowHeight: rect.height + 45 + 'px'
      })
    }).exec();

    wx.request({
      url: requestIP+'/user/getMyInfo',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'openid': app.globalData.openid
      },// 设置请求的 header
      success: function (res) {
        if (res.data.resultCode == "101") {
          console.log(res.data.data.name)
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
        'openid': app.globalData.openid
      },// 设置请求的 header
      success: function (res) {
        if (res.data.resultCode == "101") {
          console.log(res.data)
        } else {
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
    this.setData({
      current: index
    })
    console.log(this.data.current);
    wx.request({
      url: 'http://localhost:8080/happyschedule/student/getMyClass',
      data: {
        state: this.data.current
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'openid': app.globalData.openid
      },// 设置请求的 header
      success: function (res) {
        if (res.data.resultCode == "101") {
          console.log(res.data)
        } else {
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




