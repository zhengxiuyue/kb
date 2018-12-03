const { $Message } = require('../../dist/base/index');
var interval = null //倒计时函数
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    auth: "none",
    courseList: null,
    coursename:"",
    username: '',
    tel: '',
    reservationCode:'',//预约码
    primarytel: '',
    authcode: '',
    time: '获取验证码', //倒计时 
    currentTime: 60,//限制60s
    isClick: false,//获取验证码按钮，默认允许点击
    visible5: false,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '确认报名',
        color: '#ed3f14',
        loading: false
      }
    ]
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var that = this
    var coursename = that.data.coursename
    var classid = that.data.classid
    var nickname = app.globalData.nickName
    var num = 1
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      path: '/pages/class_order/class_order?classid=' + classid + '&num=' + num
    }
  },

  onLoad: function (options) {
    var that = this;
    var classid = options.classid;
    that.setData({
      classid: classid
    })
    console.log(classid);
    wx.request({
      url: requestIP + '/student/getClassInfo',
      data: {
        classid: classid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.resultCode)
        if (res.data.resultCode == '101') {
          console.log(res.data)
          that.setData({
            courseList: res.data.data,
            coursename: res.data.data.coursename
          });
        }
      },
      fail(res) {
      }
    })
    this.getMyInfo();
  },

  getMyInfo: function (e) {
    var that = this;
    wx.request({
      url: requestIP + '/user/getMyInfo',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data);
        if (res.data.resultCode == '101') {
          that.setData({
            username: res.data.data.name,
            primarytel: res.data.data.username,
            tel: res.data.data.username
          });
        }
      }
    })
  },

  //获取用户名
  usernameInput: function (event) {
    this.setData({ username: event.detail.value })
  },
  //获取预约码
  reservationCodeInput:function(e){
    this.setData({ reservationCode: e.detail.value })
  },

  //获取手机号码
  telInput: function (e) {
    var that = this;
    console.log(e.detail.value);
    console.log(that.data.primarytel);
    if (e.detail.value == that.data.primarytel) {
      that.setData({
        auth: "none"
      });
    }
    else {
      that.setData({
        auth: "block"
      });
    }
    this.setData({ tel: e.detail.value })
  },

  //获取验证码
  authcodeInput: function (event) {
    this.setData({ authcode: event.detail.value })
  },


  //验证
  gainAuthCodeAction: function () {
    let that = this;
    //第一步：验证手机号码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
    console.log("手机号" + that.data.tel);
    if (that.data.tel.length == 0) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    else if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
  that.sendCode();

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
  },

  //预约
  signUp: function (e) {
    let that = this;
    //第一步：验证手机号码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
    console.log("手机号" + that.data.tel);
    if (that.data.username.length == 0) {
      wx.showToast({
        title: '请填写姓名!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    else if (that.data.tel.length == 0) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    else if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    else if (that.data.auth == "none")
      {
      if (that.data.reservationCode.length == 0) {
        wx.showToast({
          title: '请填写预约码!',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
      else{
        that.order("*noneedforcode*");
        }
      }
    
      else if (that.data.auth == "block")
      {
        if(that.data.authcode.length == 0){
          wx.showToast({
            title: '请输入验证码！',
            icon:'none',
            duration:1000
          })
          return false;
        }
        else if (that.data.reservationCode.length == 0) {
          wx.showToast({
            title: '请填写预约码!',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        else{
        that.order(that.data.authcode);
        }
      }
  },
  //验证验证码
  sendCode:function(e){
    var that = this;

    wx.request({
      url: requestIP + '/student/sendCode',
      data: {
        phone: that.data.tel,
        type: 2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },// 设置请求的 header
      success: function (res) {
        if (res.data.resultCode == "101") {
          console.log(res.data.data);
        } else {
          wx.showToast({
            title: '验证码发送失败!',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '验证码发送失败!',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    var that = this;
    wx.request({
      url: requestIP + '/student/getClassInfo',
      data: {
        classid: classid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.resultCode)
        if (res.data.resultCode == '101') {
          console.log(res.data)
          that.setData({
            courseList: res.data.data,
            coursename: res.data.data.coursename
          });
        }
      },
      fail(res) {
      }
    })
  },
  //预约
  order:function(e){
    console.log(e);
    var code = e;
    var that = this;
    wx.request({
      url: requestIP + '/student/subscribe',
      data: {
        schid: that.data.classid,
        name:that.data.username,
        phone:that.data.tel,
        code: code,
        reservation:that.data.reservationCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.resultCode+res.data.data);
        if (res.data.resultCode == '101') {
         /* $Message({
            content: '预约成功！',
            type: 'success'
          });*/
          wx.showToast({
            title: '预约成功！!',
            icon: 'success',
            duration: 1000
          })
          wx.navigateTo({
            url: '../more/more',
          })
        } else if (res.data.resultCode == '216'){
          wx.showToast({
            title: '验证码错误!',
            icon: 'none',
            duration: 1000
          })
        }
        else {
          $Message({
            content: '预约失败！',
            type: 'fail'
          });
        }
      },
      fail(res) {
        $Message({
          content: '预约失败！',
          type: 'fail'
        });
      }
    })
  }

});