// pages/xiuyue/xiuyue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imgUrl": "/image/headphoto.png",
    "like":"/image/like.png",
    "dislike": "/image/dislike.png",
    "comment":"/image/comment.png",
    "edit": "/image/edit.png",
    islike:1,
    "like_num":"2",
    "comment_num": "3"
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
  edit:function(e){
    wx.navigateTo({
      url: '/pages/class_chat_edit/class_chat_edit',
    })
  },
  comment:function(e){
    wx.navigateTo({
      url: '/pages/class_comment/class_comment',
    })
  },
  changelike(e) {
    let that = this;
    if(that.data.islike==0)
    {
      console.log(that.data.islike)
      that.data.islike = 1
    }
    else if (that.data.islike == 1)
    {
      console.log(that.data.islike)
      that.data.islike = 0
      console.log(that.data.islike)
    }
  }
})