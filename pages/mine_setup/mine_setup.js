// pages/mine_setup/mine_setup.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"赵雅涵",
    tel:"15171411165",
    password:"****",
    newpassword: "",
    newpassword2: ""
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
  //获取密码
  passwordInput: function (event) {
    // console.log("password==", event.detail.value)
    this.setData({ newpassword: event.detail.value.replace(/\s+/g, '') })
  },

  //获取确认密码
  passwordInput2: function (event) {
    // console.log("password==", event.detail.value)
    this.setData({ newpassword2: event.detail.value.replace(/\s+/g, '') })
  },

  //提交
  submit:function(e){
    let that = this;
    if (that.data.newpassword.length == 0) {
      wx.showToast({
        title: '请输入新密码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    else if (that.data.newpassword2.length == 0) {
      wx.showToast({
        title: '请输入确认密码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    else if (that.data.newpassword != that.data.newpassword2) {
      wx.showToast({
        title: '两次密码请保持一致!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    else {
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000
      })  
    }
  },
  exit:function(e){
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else if (sm.cancel) {
        }
      }
    })
  }
})