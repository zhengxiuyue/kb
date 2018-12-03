const { $Message } = require('../../dist/base/index');
var interval = null //倒计时函数
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    auth:"none",
    courseList:null,
    classname:"",
    price:"",
    improveprice:"",
    username: '',
    tel: '',
    primarytel:'',
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
            courseList: res.data.data
          });
        }
      },
      fail(res) {
      }
    })
  },

  handleOpen5() {
    var that = this;
    that.setData({
      visible5: true
    });
  },

  handleClick5({ detail }) {
    var that = this;

    if (detail.index === 0) {
      that.setData({
        visible5: false
      });
    } else {

    that.pay();
    
    }
  },
  //发起支付
  pay:function(e){
    var that = this;
    const action = [...that.data.actions5];
    action[1].loading = true;

    that.setData({
      actions5: action
    });

    wx.request({
      url: requestIP + '/student/signup',
      data: {
        classid:that.data.classid,
        classname:that.data.classname,
        userid: app.globalData.userid,
        improveprice: that.data.improveprice,
        price: that.data.price
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
        if (res.data.resultCode == '101') {
          var merchantNumber = res.data.data;
          wx.request({
            url: requestIP + '/weixin/pay',
            data: {
              merchantNumber: merchantNumber
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'userid': app.globalData.userid
            },
            success(re) {
              console.log(re.data.resultCode);
              if (re.data.resultCode == '101') {

                //调用微信API
                wx.requestPayment({
                  timeStamp: re.data.data.timeStamp,
                  nonceStr: re.data.data.nonceStr,
                  package: re.data.data.package,
                  signType: re.data.data.signType,
                  paySign: re.data.data.paySign,
                  'success': function (res) {
                    $Message({
                      content: '报名成功！',
                      type: 'success'
                    });
                    wx.navigateTo({
                      url: '/pages/class/class',
                    })
                  },
                  'fail': function (res) {
                    if (res.errMsg == "requestPayment:fail cancel") {
                      wx.showModal({
                        title: '提示',
                        content: '您已经取消了本次支付',
                        showCancel: false
                      })
                    }
                    else {
                      wx.showModal({
                        title: '提示',
                        content: '网络错误，请重试',
                        showCancel: false
                      })
                    }
                  }
                })

              }
              else {
                $Message({
                  content: '报名失败！',
                  type: 'error'
                });
              }
            },
            fail(re) {
              $Message({
                content: '报名失败！',
                type: 'error'
              });
            }
          })

        }
        else {
          $Message({
            content: '报名失败！',
            type: 'error'
          });
        }
      },
      fail(res) {

        $Message({
          content: '报名失败！',
          type: 'error'
        });
        
      }
    })

    setTimeout(() => {
      action[1].loading = false;
      that.setData({
        visible5: false,
        actions5: action
      });

    }, 2000);

  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var that = this
    var classid = that.data.classid
    var num = 1
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      path: '/pages/class_signUp/class_signUp?classid=' + classid + '&num=' + num
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
        if (res.data.resultCode == '101') {
          console.log(res.data)
          that.setData({
            courseList: res.data.data,
            classname:res.data.data.classname,
            price:res.data.data.price,
            improveprice:res.data.data.improveprice
          });
        }
      },
      fail(res) {
      }
    })
    that.getMyInfo();
  },

  getMyInfo:function(e){
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
        console.log("获取个人信息" + res.data.resultCode)
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
    that.setData({ tel: e.detail.value })
  },

  //获取验证码
  authcodeInput: function (event) {
    this.setData({ authcode: event.detail.value })
  },


  //验证
  gainAuthCodeAction: function () {
    let that = this;
    var requestIP = app.globalData.requestIP
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

  //报名
  signUp: function (e) {

    let that = this;

    if (that.data.username.length == 0)
    {
      wx.showToast({
        title: '请填写姓名!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    that.setData({
      visible5:true
    });
  }
});