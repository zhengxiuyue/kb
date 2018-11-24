// pages/forget/forget.js
var interval = null //倒计时函数
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:'',
    password: '',
    password2: '',
    authcode: '',
    time: '获取验证码', //倒计时 
    currentTime: 60,//限制60s
    isClick: false,//获取验证码按钮，默认允许点击
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
  telInput: function (event) {
    this.setData({ tel: event.detail.value })
  },

  //获取密码
  passwordInput: function (event) {
    // console.log("password==", event.detail.value)
    this.setData({ password: event.detail.value.replace(/\s+/g, '') })
  },

  //获取确认密码
  passwordInput2: function (event) {
    // console.log("password==", event.detail.value)
    this.setData({ password2: event.detail.value.replace(/\s+/g, '') })
  },

  //获取验证码
  authcodeInput: function (event) {
    // console.log("password==", event.detail.value)
    this.setData({ authcode: event.detail.value })
  },


  //验证
  gainAuthCodeAction: function () {
    let that = this;
    var requestIP = app.globalData.requestIP
    //第一步：验证手机号码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
    if (that.data.tel.length == 0) {
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    wx.request({
      url: requestIP +'/user/sendCode',
      data: {
        phone: that.data.tel,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
        } else {
          console.log("index.js wx.request CheckCallUser statusCode");
        }
      },
    })  
    //第二步：设置计时器
    // 先禁止获取验证码按钮的点击
    that.setData({
      isClick: true,
    })
    //60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;//减
      that.setData({
        time: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 60,
          isClick: false
        })
      }
    }, 1000);
    /*第三步：请求验证码接口，并记录服务器返回的验证码用于判断，这里服务器也可能不返回验证码，那验证码的判断交给后台
    else{      
      wx.request({       
        data: {},        
        'url': 接口地址,        
        success(res) {          
          console.log(res.data.data)          
          _this.setData({            
            iscode: res.data.data          
          })          
          var num = 61;          
          var timer = setInterval(function () 
          {            
            num--;            
            if (num <= 0) {              
              clearInterval(timer);              
              _this.setData({                
                codename: '重新发送',                
                disabled: false              
              })             
            } else 
            {             
               _this.setData({                
                 codename: num + "s"              
              })           
            }          
        }, 1000)
    */
    // wx.request({})
  },
  //注册验证
  sure: function (e) {
    let that = this;
    var requestIP = app.globalData.requestIP
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号
    //判断手机号码
    if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //判断验证码 服务端！！！
    else if (that.data.authcode.length != 6) {
      wx.showToast({
        title: '请填写正确的验证码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //判断密码
    else if (that.data.password.length == 0) {
      wx.showToast({
        title: '请填写正确的密码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //判断确认密码
    else if (that.data.password != that.data.password2) {
      wx.showToast({
        title: '两次密码请保持一致!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    else {
      wx.request({
        url: requestIP + '/user/resetPwd',
        data: {
          phone: that.data.tel,
          pwd: that.data.password,       
          verification: that.data.authcode,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showToast({
              title: '重置成功',
              icon: 'success',
              duration: 2000
            }),
              wx.navigateBack({
                url: '/pages/login/login'
              })
          } else {
            console.log("index.js wx.request CheckCallUser statusCode");
          }
        },
        fail: function () {
          console.log("index.js wx.request CheckCallUser fail");
        }
      })
    }
  }
})