const { $Message } = require('../../dist/base/index');
var interval = null //倒计时函数
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    index:0,
    courseList:null,
    classList: null,//该课程的排期
    scheduleidList:null,
    scheduleid:null,
    reverseprice:0,//预约价格
    auth: "none",
    coursename:"",//课程名
    username: '',//姓名
    tel: '',//电话
    primarytel: '',//预留电话
    authcode: '',//验证码
    time: '获取验证码', //倒计时 
    currentTime: 60,//限制60s
    isClick: false,//获取验证码按钮，默认允许点击
    visible5: false,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '确认预约',
        color: '#ed3f14',
        loading: false
      }
    ]
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },

  onLoad: function (options) {
    var that = this;
    var classid = that.options.classid;
    var scheduleid = that.options.scheduleid;
    that.setData({
      classid: classid,
      scheduleid: scheduleid
    })
    that.getClassInfo();
    that.getMyInfo();
  },

  bindPickerChange(e) {
    var that = this;
    var scheduleidList = that.data.scheduleidList;
   // var classList = that.data.classList;
    var index = e.detail.value;
    this.setData({
      scheduleid: scheduleidList[index],
      index: e.detail.value
    })
  },

  getMyInfo: function (e) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        that.setData({
          //username: res.data.nickName,
          primarytel: res.data.tel,
          tel: res.data.tel
        })
      }
    })
    wx.getStorage({
      key: 'nickName',
      success(res) {
        that.setData({
          username: res.data
        })
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
    if (that.data.tel.length == 0) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    else if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 2000
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
    if (that.data.username.length == 0) {
      wx.showToast({
        title: '请填写姓名!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    else if (that.data.tel.length == 0) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    else if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    else if (!that.data.scheduleid) {
      wx.showToast({
        title: '请选择节次!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    else if (that.data.auth == "none")
      {
        that.order("*noneedforcode*");
      }
    
      else if (that.data.auth == "block")
      {
        if(that.data.authcode.length == 0){
          wx.showToast({
            title: '请输入验证码！',
            icon:'none',
            duration:2000
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
        } else {
          wx.showToast({
            title: '验证码发送失败!',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '验证码发送失败!',
          icon: 'none',
          duration: 2000
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
    that.getClassInfo();
    that.getMyInfo();
    that.getClassSchedule();
  },

  //预约
  order:function(e){
    var code = e;
    var that = this;
    var reverseprice = that.data.reverseprice;
    var schid = that.data.classid;
    var scheduid = that.data.scheduleid;
    var phone = that.data.tel;
    var name = that.data.username;
      wx.request({
        url: requestIP + '/student/subscribe',
        data: {
          schid: schid,//班级编号
          scheduid: scheduid,//节次编号
          phone: phone,//电话号码
          code: code,//验证码
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'userid': app.globalData.userid
        },
        success(res) {
          if (res.data.resultCode == '101') {
            if (res.data.data != 0) {
              //付费
              wx.request({
                url: requestIP + '/weixin/paySubscribe',
                data: {
                  schid: schid,//班级编号
                  scheduid: scheduid,//节次编号
                  phone: phone,//电话号码
                  name: name,//姓名
                  price: reverseprice
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded', // 默认值
                  'userid': app.globalData.userid
                },
                success(re) {
                  if (re.data.resultCode == '101') {
                    //调用微信API
                    wx.requestPayment({
                      timeStamp: re.data.data.timeStamp,
                      nonceStr: re.data.data.nonceStr,
                      package: re.data.data.package,
                      signType: re.data.data.signType,
                      paySign: re.data.data.paySign,
                      'success': function (res) {
                        /*$Message({
                          content: '预约成功！',
                        });
                        setTimeout(function () {
                          //跳到更多页面
                          wx.redirectTo({
                            url: '/pages/more/more',
                          })
                        }, 2000)*/
                        wx.navigateTo({
                          url: '/pages/message/message?flag=2',
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
                      content: '预约失败！',
                      type: 'error'
                    });
                  }
                },
                fail(re) {
                  $Message({
                    content: '预约失败！',
                    type: 'error'
                  });
                }
              })
            }
            else if (res.data.data == 0)
            {
              //免费
              wx.request({
                url: requestIP + '/student/payFirst',
                data: {
                  schid: schid,//班级编号
                  scheduid: scheduid,//节次编号
                  phone: phone,//电话号码
                  name: name,//姓名
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded', // 默认值
                  'userid': app.globalData.userid
                },
                success(re) {
                  if (re.data.resultCode == '101') {
                    /*$Message({
                      content: '预约成功！',
                    });
                    setTimeout(function () {
                      //跳到更多页面
                      wx.redirectTo({
                        url: '/pages/more/more',
                      })
                    }, 2000)*/
                    wx.navigateTo({
                      url: '/pages/message/message?flag=2',
                    })
                  }
                  else {
                    $Message({
                      content: '预约失败！',
                      type: 'error'
                    });
                  }
                },
                fail(re) {
                  $Message({
                    content: '预约失败！',
                    type: 'error'
                  });
                }
              })
            }
        /******************************** */
          }
          else if (res.data.resultCode == '216'){
            //验证码错误
            wx.showToast({
              title: '验证码错误!',
              icon: 'none',
              duration: 2000
            })
            $Message({
              content: '预约失败！',
              type: 'error'
            });
          } else if (res.data.resultCode == '209'){
            //旁听人数已达上限
            wx.showToast({
              title: '旁听人数已达上限!',
              icon: 'none',
              duration: 2000
            })
            $Message({
              content: '预约失败！',
              type: 'error'
            });
        }
          else if (res.data.resultCode == '225') {
            //旁听人数已达上限
            wx.showToast({
              title: '预约中，请勿重复预约!',
              icon: 'none',
              duration: 2000
            })
            $Message({
              content: '预约失败！',
              type: 'error'
            });
          }
      else if(res.data.resultCode == '224'){
      //不能旁听
      wx.showToast({
        title: '该课程不能旁听!',
        icon: 'none',
        duration: 2000
      })
      $Message({
        content: '预约失败！',
        type: 'error'
      });
    }else{
            $Message({
              content: '预约失败！',
              type: 'error'
            });
    }
        },
        fail(res) {
          //出错
          $Message({
            content: '预约失败！',
            type: 'error'
          });
        }
      })
  },

  getClassInfo: function () {
    var that = this;
    var classid = that.data.classid;
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
          that.setData({
            courseList: res.data.data,
            coursename: res.data.data.coursename,
          });
          if (res.data.data.reversefee) {
            that.setData({
              reverseprice: res.data.data.reversefee
            })
          }
        }
      },
      fail(res) {
      }
    })
  },

  orderclick:function(e){
    //选择课堂预约
    var that = this;
    var index = e.currentTarget.dataset.index;
    var courseList = that.data.courseList;
    var scheduleid = courseList[index].scheduleid
    that.setData({
      scheduleid: scheduleid
    })
    //改变样式
  }

});