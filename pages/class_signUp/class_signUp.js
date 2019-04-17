const { $Message } = require('../../dist/base/index');

var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    classid:"",
    courseList:null,
    coursename:"",
    price:"",
    improveprice:"",
    username: '',
    tel: '',
    primarytel:'',
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
    that.getClassInfo();
  },

  handleOpen5() {
    var that = this;
    that.setData({
      visible5: true
    });
  },

  handleClick5({ detail }) {
    var that = this;

    /*if (detail.index === 0) {
      that.setData({
        visible5: false
      });
    } else {

      const action = [...that.data.actions5];
      action[1].loading = true;

      that.setData({
        actions5: action
      });*/

      setTimeout(() => {
        action[1].loading = false;
        that.setData({
          visible5: false,
          actions5: action
        });

      }, 2000);
  
   // }
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
      path: '/pages/class_des_signUp/class_des_signUp?classid=' + classid + '&num=' + num
    }
  },

  onLoad: function (options) {
    var that = this;
    var classid = that.options.classid;
    that.setData({
      classid: classid
    });
   that.getClassInfo();
    that.getMyInfo();
  },

  getMyInfo: function (e) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data)
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
        console.log(res.data)
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
        console.log(res.data.resultCode)
        if (res.data.resultCode == '101') {
          console.log(res.data.data);
          that.setData({
            courseList: res.data.data,
            coursename: res.data.data.coursename,
            improveprice: res.data.data.improveprice,
            price: res.data.data.price
          });
        }
      },
      fail(res) {
      }
    })
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

//请求前判断app.globalData.userid是否为空
    /*if (!app.globalData.userid)
    {
      wx.showToast({
        title: '登录已失效!',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function () {
        //跳到课堂页面
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }, 2000)
    }*/

    wx.request({
      url: requestIP + '/student/signup',
      data: {
        classid: that.data.classid,
        classname: that.data.coursename,
        improveprice: that.data.improveprice,
        price: that.data.price,
        userid: app.globalData.userid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log("/student/signup"+res.data.data);
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
                      content: '报名成功！',
                    });
                    setTimeout(function () {
                      //跳到课堂页面
                      wx.redirectTo({
                        url: '/pages/class/class?classid=' + that.data.classid,
                      })
                    }, 2000)*/
                    wx.navigateTo({
                      url: '/pages/message/message?flag=3',
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
              else if (res.data.resultCode == '226'){
                wx.showToast({
                  title: '已报名，请勿重复报名!',
                  icon: 'none',
                  duration: 2000
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

   // that.handleClick5();

    //that.setData({
    //  visible5:true
    //});
  }
});