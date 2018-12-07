// pages/mine_setup/mine_setup.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    tel:"",
    newpassword: "",
    newpassword2: "",
    hiddenmodalput: true,
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    var requestIP = app.globalData.requestIP
    var tel = app.globalData.tel
    var username = app.globalData.name
    this.setData({
      tel: tel,
      username: username
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
  // onShareAppMessage: function () {
  // },
  //获取密码
  passwordInput: function (event) {
    this.setData({ newpassword: event.detail.value.replace(/\s+/g, '') })
  },

  //获取确认密码
  passwordInput2: function (event) {
    this.setData({ newpassword2: event.detail.value.replace(/\s+/g, '') })
  },

  exit:function(e){
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.clearStorageSync();
          wx.reLaunch({
            url: '/pages/login/login',
          })
          // 用户点击了确定 可以调用删除方法了
        } else if (sm.cancel) {
        }
      }
    })
  },

/**   * 弹窗   */  
showDialogBtn: function () { 
  this.setData({ showModal: true }) 
},  

/**   * 弹出框蒙层截断touchmove事件   */  
preventTouchMove: function () { },  

/**   * 隐藏模态对话框   */ 
hideModal: function () { 
  this.setData({ showModal: false }); 
},  
   
/**   * 对话框取消按钮点击事件   */  
onCancel: function () { 
  this.hideModal(); 
},  

/**   * 对话框确认按钮点击事件   */  
onConfirm: function () { 
  let that = this;
  var requestIP = app.globalData.requestIP
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
    wx.request({
      url: requestIP + '/user/resetPwdTwo',
      data: {
        repwd: that.data.newpassword2,
        pwd: that.data.newpassword,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          console.log("非101");
        }
      },
      fail: function () {
        console.log("请求失败");
      }
    })
 
  }
    this.hideModal()
    this.setData({ 
      newpassword2:''
    })
    this.setData({ 
      newpassword: '' 
    })
  }
})