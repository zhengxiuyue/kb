// pages/authorizetel/authorizetel.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getPhoneNumber')
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
  //获取手机号码
  getPhoneNumber:function(e){
    console.log(e)
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
    app.globalData.iv = e.detail.iv
    app.globalData.encryptedData = e.detail.encryptedData
    // wx.login({
    //   success: res => {
    //     console.log(res.code);
    //     wx.request({
    //       url: 'https://你的解密地址',
    //       data: {
    //         'encryptedData': encodeURIComponent(e.detail.encryptedData),
    //         'iv': e.detail.iv,
    //         'code': res.code
    //       },
    //       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //       header: {
    //         'content-type': 'application/json'
    //       }, // 设置请求的 header
    //       success: function (res) {
    //         if (res.status == 1) {//我后台设置的返回值为1是正确
    //           //存入缓存即可
    //           wx.setStorageSync('phone', res.phone);
    //         }
    //       },
    //       fail: function (err) {
    //         console.log(err);
    //       }
    //     })
    //   }
    // })
    wx.redirectTo({
      url: '/pages/login/login',
    })
  
  }

})