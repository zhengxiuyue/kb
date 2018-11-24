const { $Message } = require('../../dist/base/index');
var interval = null //倒计时函数
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    auth: "none",
    courseList: null,
    username: '',
    tel: '',
    reservationCode:'',//预约码
    primarytel: '',
    auth: '',
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

  handleOpen5() {
    this.setData({
      visible5: true
    });
  },

  handleClick5({ detail }) {
    if (detail.index === 0) {
      this.setData({
        visible5: false
      });
    } else {
      //判断手机号是否正确
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
      //判断验证码是否正确

    }
  },
  pay: function (e) {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {

      },
      fail(res) {
        const action = [...this.data.actions5];
        action[1].loading = true;

        this.setData({
          actions5: action
        });

        setTimeout(() => {
          action[1].loading = false;
          this.setData({
            visible5: false,
            actions5: action
          });
          $Message({
            content: '报名失败！',
            type: 'success'
          });
        }, 2000);
      }
    })
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
            courseList: res.data.data
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
    this.setData({ reservationCode: event.detail.value })
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

    wx.request({
      url: requestIP + '/student/sendCode',
      data: {
        phone: that.data.tel,
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
          console.log("请求失败");
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

    else if (that.data.reservationCode.length == 0){
      wx.showToast({
        title: '请填写预约码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    else{
      if (that.data.auth == "none")
      {
        that.order("noneedforcode");
      }
      else if (that.data.auth == "block")
      {
        that.sendCode();
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
        code: that.data.authcode,
        type: 2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
        if (res.data.resultCode == '101') {
          that.order();
        }
        else {
          wx.showToast({
            title: '验证码错误!',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '验证码错误!',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  //预约
  order:function(e){
    console.log(e);
    var code = e;
    wx.request({
      url: requestIP + '/student/getRecentClass',
      data: {
        schid: that.data.classid,
        name:that.data.username,
        phone:taht.data.tel,
        code: code,
        reservation:that.data.reservationCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
        if (res.data.resultCode == '101') {
          $Message({
            content: '预约成功！',
            type: 'success'
          });
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