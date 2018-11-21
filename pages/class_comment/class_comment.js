// pages/class_comment/class_comment.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "imgUrl": "/image/headphoto.png",
    "current":0,
    "like_num": "2",
    "comment_num": "",
    "comment_content":"",
    "dis_id": "",
    "dis_time": "",
    "content": "",
    "name": "",
    "Iscommentspace":"none",
    "space":"/image/space.png",
    "comment":[],
    "openid":""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var requestIP = app.globalData.requestIP
    var openid = app.globalData.openid
    var dis_id =that.options.dis_id
    var dis_time = that.options.dis_time
    var content = that.options.content
    var name = that.options.name
    console.log(dis_id + dis_time + content + name)
    this.setData({
      dis_id: dis_id,
      dis_time: dis_time,
      name: name,
      content: content,
      openid: openid
    })
    wx.request({
      url: requestIP + '/user/getReplyInfo',
      data: {
        discussid: that.data.dis_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'openid': app.globalData.openid
      },// 设置请求的 header
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            comment: []
          })
          console.log(res.data.data.length)
          for (var i = 0, len = res.data.data.length; i < len; i++) {
            that.data.comment[i] = res.data.data[i]
          }
          that.setData({
            comment: that.data.comment,
            comment_num: res.data.data.length
          })
          console.log(that.data.comment)
        } 
        else if (res.data.resultCode == "204"){
          that.setData({
            Iscommentspace:"block",
            comment_num: 0
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
  commentInput: function (event) {
    this.setData({ comment_content: event.detail.value })
  },
 
  release:function(e){
    let that = this
    var requestIP = app.globalData.requestIP
    if(that.data.comment_content.length == 0)
    {
      wx.showToast({
        title: '请输入评论!',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.request({
        url: requestIP + '/user/replyDiscuss',
        data: {
          discussid: that.data.dis_id,
          recontent: that.data.comment_content
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            console.log(res.data.data)
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              comment_content:""
            })
            that.onLoad()
          }
          else {
            console.log("请求失败");
          }
        },
      })
     
        that.onLoad()
    }
  }
})