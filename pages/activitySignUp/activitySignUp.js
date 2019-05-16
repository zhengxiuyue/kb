const { $Message } = require('../../dist/base/index');

var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    username: '',
    tel: '',
    ay_id: ''
  },

  onPullDownRefresh: function () {
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var that = this
    var nickname = app.globalData.nickName
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
    }
  },

  onLoad: function (options) {
    var ay_id = options.ay_id;
    var that = this;
    if (ay_id) {
      that.setData({
        ay_id: ay_id
      })
    }
    that.getMyInfo();
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

  //报名
  signUp: function (e) {
    let that = this;
    if (that.data.username.length == 0) {
      wx.showToast({
        title: '请填写姓名!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    else{

    wx.request({
      url: requestIP + '/activity/signup',
      data: {
        username:that.data.username,
        id: that.data.ay_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          var merchantNumber = res.data.data;
          wx.request({
            url: requestIP + '/activitypay/pay',
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
                    var ay_id = that.data.ay_id;
                    setTimeout(function () {
                      //跳到活动详情页面
                      wx.navigateTo({
                        url: '/pages/activityDetail/activityDetail?ay_id=' + ay_id,
                      })
                    }, 2000)*/
                    wx.navigateTo({
                      url: '/pages/message/message?flag=4',
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
              else if (res.data.resultCode == '226') {
                wx.showToast({
                  title: '已报名，请勿重复报名!',
                  icon: 'none',
                  duration: 2000
                })
              }
              else if (res.data.resultCode == '229') {
                wx.showToast({
                  title: '活动报名时间已截止!',
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
    }
  }
});