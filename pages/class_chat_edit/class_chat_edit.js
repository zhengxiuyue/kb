// pages/class_chat_edit/class_chat_edit.js
var app = getApp();
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatcontent:"",
    chattime:""
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

  chatInput: function (event) {
    this.setData({ 
      chatcontent: event.detail.value.replace(/\s+/g, '') 
    })
  },

  returnchat: function (e) {
    let that = this;
    var requestIP = app.globalData.requestIP
    //判断评论是否为空
    if (that.data.chatcontent.length == 0) {
      wx.showToast({
        title: '请输入评论!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //发请求
    else {
      // 调用函数时，传入new Date()参数，返回值是日期和时间  
      var time = util.formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据  
      that.setData({
        chattime: time
      });
      console.log(that.data.chattime) 
      wx.request({
        url: requestIP + '/user/addDiscuss',
        data: {
          classid: "c866bf76b4ef11e8ab8e00163e00299d",
          content:that.data.chatcontent,
          time: that.data.chattime
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.navigateBack({
            })
            console.log(res.data.data)
            console.log(res.data)
          } else {
            console.log("请求失败");
          }
        },
      })
    }
   
  }
})