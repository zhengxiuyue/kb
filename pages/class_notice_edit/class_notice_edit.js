// pages/class_notice_edit/class_notice_edit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticetitle:"",
    noticecontent:"",
    classid:"",
    level:"",
    coursename:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var classid = that.options.classid
    var level = that.options.level
    var coursename = that.options.coursename
    that.setData({
      classid: classid,
      coursename:coursename,
      level:level
    })
    console.log(classid)
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
  noticetitleInput: function (event) {
    this.setData({
      noticetitle: event.detail.value.replace(/\s+/g, '')
    })
  },
  noticecontentInput: function (event) {
    this.setData({
      noticecontent: event.detail.value.replace(/\s+/g, '')
    })
  },

  returnnotice:function(e){

    var that = this;
    var requestIP = app.globalData.requestIP
    //判断评论是否为空
     if (that.data.noticetitle.length == 0) {
      wx.showToast({
        title: '请输入通知标题!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
     else if (that.data.noticecontent.length == 0) {
       wx.showToast({
         title: '请输入通知内容!',
         icon: 'none',
         duration: 1000
       })
       return false;
     }
    //发请求
    else {
       console.log(that.data.noticecontent)
       console.log(that.data.noticetitle)
      wx.request({
        url: requestIP + '/teacher/publishNotice',
        data: {
          classid: that.data.classid,
          content: that.data.noticecontent,
          title: that.data.noticetitle,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            }), 
            wx.navigateBack({
            })
          } else {
            console.log("请求失败");
          }
        },
      })
    }
  }
})