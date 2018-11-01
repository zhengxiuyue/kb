// pages/class_comment/class_comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imgUrl": "/image/headphoto.png",
    "current":0,
    "like_num": "2",
    "comment_num": "3",
    "comment_content":""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
  changeTab(e) {
    let index = parseInt(e.currentTarget.dataset.index || 0)
    this.setData({
      current: index
    })
  },
  release:function(e){
    let that = this;
    if(that.data.comment_content.length == 0)
    {
      wx.showToast({
        title: '请输入评论!',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      }),
        that.onLoad()
    }
  }
})