// pages/videoWebView/videoWebView.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_link: '',
    scheduleid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.video_link) {
      that.setData({
        video_link: app.globalData.video_link
      })
    } else if (that.options.video_link) {
      that.setData({
        video_link: that.options.video_link
      })
    }

    if (that.options.scheduleid) {
      that.setData({
        scheduleid: that.options.scheduleid
      })
    }
    //判断是否授权 未授权跳授权页面
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        }
        else {
          wx.redirectTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
    //判断是否还有缓存 有判断是不是课堂 无跳入login
    var userid = ''
    var userstatus = ''
    var openid = ''
    var tel = ''
    wx.getStorage({//获取本地缓存
      key: "user",
      success: function (res) {
        userid = res.data.userid
        userstatus = res.data.userstatus
        openid = res.data.openid
        tel = res.data.tel
        if (userid && tel && openid && userstatus) {
          app.globalData.userid = userid
          app.globalData.userstatus = userstatus
          app.globalData.openid = openid
          that.isClass();//判断是否为当前课堂的学生
        }
        else {
          wx.showToast({
            title: '请先登录再打开分享链接!',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }, 2000)
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function (options) {
    var that = this;
    if (app.globalData.video_link) {
      that.setData({
        video_link: app.globalData.video_link
      })
    } else if (that.options.video_link) {
      that.setData({
        video_link: that.options.video_link
      })
    }

    if (that.options.scheduleid) {
      that.setData({
        scheduleid: that.options.scheduleid
      })
    }
    //判断是否授权 未授权跳授权页面
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        }
        else {
          wx.redirectTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
    //判断是否还有缓存 有判断是不是课堂 无跳入login
    var userid = ''
    var userstatus = ''
    var openid = ''
    var tel = ''
    wx.getStorage({//获取本地缓存
      key: "user",
      success: function (res) {
        userid = res.data.userid
        userstatus = res.data.userstatus
        openid = res.data.openid
        tel = res.data.tel
        if (userid && tel && openid && userstatus) {
          app.globalData.userid = userid
          app.globalData.userstatus = userstatus
          app.globalData.openid = openid
          that.isClass();//判断是否为当前课堂的学生
        }
        else {
          wx.showToast({
            title: '请先登录再打开分享链接!',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }, 2000)
        }
      }
    })
  },

  isClass: function () {
    var that = this;
    wx.request({
      url: requestIP + '/user/IsClass',
      data: {
        userid: app.globalData.userid,
        sid: that.data.scheduleid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        if (res.data.resultCode == '101') {
          if (res.data.data == 1) {
            console.log("正常加载");
          } else if (res.data.data == 0) {
            wx.showToast({
              title: '您不是该课堂的学生，无法查看!',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }, 2000)
          }
        }
      },
      fail(res) {
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })
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
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/videoWebView/videoWebView&scheduleid=' + that.data.scheduleid + '&shareStatus=' + shareStatus
    }
  }
})