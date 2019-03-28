// pages/login/login.js
var app = getApp();
var ctx;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isadmin:0,
    inputtext:"请输入姓名",
    items: [
      { value: '学生', id: '3', checked:true},
      { value: '老师', id: '2', checked:false},
      { value: '助教', id: '1',checked:false}
    ],
    userstatus: '3',
    "name": '',
    code:'',
    pwd:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code:res.code,
          })
          app.globalData.openid = null
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
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
  onShareAppMessage: function () {

  },
  //获取用户身份
  radioChange: function (event) {
    var con = event.detail.value
    this.setData({
      userstatus: event.detail.value 
    })
    if(con == 1){
      this.setData({
        inputtext:"请输入邮箱",
        isadmin:1
      })
    }
    else{
      this.setData({
        inputtext: "请输入姓名",
        isadmin: 0
      })
    }
  },

  //获取姓名/邮箱
  nameInput: function (event) {
    this.setData({ name: event.detail.value.replace(/\s+/g, '') })
  },

  //获取助教邮箱
  //获取姓名/邮箱
  pwdInput: function (event) {
    this.setData({ pwd: event.detail.value.replace(/\s+/g, '') })
  },

  //修改全局变量selectCodition的值
  login:function(e){
    let that = this;
    var requestIP =app.globalData.requestIP
    //邮箱
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    var con = that.data.userstatus
    //学生和老师登录
    if(con == 2 || con == 3){
      if (that.data.name.length == 0) {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: '请填写姓名!',
            icon: 'none',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000)
        }, 0);
        return false;
      }
      else{
        wx.request({
          url: requestIP + '/user/login',
          data: {
            code: that.data.code,
            encryptedData: app.globalData.encryptedData,//手机号码
            iv: app.globalData.iv,//手机号码
            encryptedData1: app.globalData.encryptedData1,//个人信息
            iv1: app.globalData.iv1,//个人信息
            role: "3",
            name: that.data.name,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data.resultCode == "101") {
              if (that.data.userstatus == 3) {
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }
              else if (that.data.userstatus == 2) {
                wx.redirectTo({
                  url: '/pages/index/T_index',
                })
              }
              else if (that.data.userstatus == 1) {
                wx.redirectTo({
                  url: '/pages/index/A_index',
                })
              }
              app.globalData.openid = res.data.data.openid
              app.globalData.userid = res.data.data.userid
              app.globalData.userstatus = res.data.data.role
              wx.clearStorage();
              wx.setStorage({
                key: "user",
                data:
                {
                  userid: res.data.data.userid,
                  openid: res.data.data.openid,
                  userstatus: res.data.data.role,
                  name: res.data.data.name,
                  tel: res.data.data.phone,
                  avatarUrl: res.data.data.Protrait
                }
              })
            }
            else {
              wx.showLoading();
              wx.hideLoading();
              setTimeout(() => {
                wx.showToast({
                  title: '请求失败',
                  icon: 'none',
                });
                setTimeout(() => {
                  wx.hideToast();
                }, 2000)
              }, 0);
              app.globalData.openid = ""
              app.globalData.userid = ""
            }
          },
          fail: function () {
            wx.showLoading();
            wx.hideLoading();
            setTimeout(() => {
              wx.showToast({
                title: '服务器异常',
                icon: 'none',
              });
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
            app.globalData.openid = ""
          },
        })
      }
    }
    //助教登录
    else if(con == 1){
      if (that.data.name.length == 0) {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: '请填写邮箱!',
            icon: 'none',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000)
        }, 0);
        return false;
      }
      else if (!str.test(that.data.name)) {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: '请填写正确的邮箱',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000)
        }, 0);
      }
      else if (that.data.pwd.length == 0) {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: '请填写密码!',
            icon: 'none',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000)
        }, 0);
        return false;
      }
      else {
        wx.request({
          url: requestIP + '/user/AdminLogin',
          data: {
            code: that.data.code,
            account: that.data.name,
            pwd: that.data.pwd
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data.resultCode == "101") {                           
                wx.redirectTo({
                  url: '/pages/index/A_index',
                })
           
              app.globalData.openid = res.data.data.openid
              app.globalData.userid = res.data.data.userid
              app.globalData.userstatus = res.data.data.role
              wx.clearStorage();
              wx.setStorage({
                key: "user",
                data:
                {
                  userid: res.data.data.userid,
                  openid: res.data.data.openid,
                  userstatus: res.data.data.role,
                  name: res.data.data.name,
                  tel: res.data.data.phone,
                  avatarUrl: res.data.data.Protrait
                }
              })
            }
            else if (res.data.resultCode == "204"){
              wx.showLoading();
              wx.hideLoading();
              setTimeout(() => {
                wx.showToast({
                  title: '邮箱或密码错误',
                  icon: 'none',
                });
                setTimeout(() => {
                  wx.hideToast();
                }, 2000)
              }, 0);
              app.globalData.openid = ""
              app.globalData.userid = ""
            }
            else {
              wx.showLoading();
              wx.hideLoading();
              setTimeout(() => {
                wx.showToast({
                  title: '请求失败',
                  icon: 'none',
                });
                setTimeout(() => {
                  wx.hideToast();
                }, 2000)
              }, 0);
              app.globalData.openid = ""
              app.globalData.userid = ""
            }
          },
          fail: function () {
            wx.showLoading();
            wx.hideLoading();
            setTimeout(() => {
              wx.showToast({
                title: '服务器异常',
                icon: 'none',
              });
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
            app.globalData.openid = ""
          },
        })
      }
    }    
  },

})
