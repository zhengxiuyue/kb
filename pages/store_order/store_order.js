const { $Message } = require('../../dist/base/index');
var interval = null //倒计时函数
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    array:null,//所有门店列表
    index:0,
    storeidList:null,
    locationList:null,
    items1: [
      { name: 'today', value: '今天', checked: 'true' },
      { name: 'tomorrow', value: '明天' },
      { name: 'afterTomorrow', value: '后天' },
    ],
    items: [
      { name: '08:00', value: '08:00-10:00', checked: 'true' },
      { name: '10:00', value: '10:00-12:00' },
      { name: '14:00', value: '14:00-16:00' },
      { name: '16:00', value: '16:00-18:00' }
    ],
    startdate: new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1).toString() + "-" + new Date().getDate(),//起点
    enddate: new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 4).toString() + "-" + new Date().getDate(),//终点
    date1:'today',//预约日期,
    date: new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1).toString() + "-" + new Date().getDate(),
    time:"08:00",//预约时间段
    storeMes:"",//门店信息
    storeid:null,
    message:"",//预约说明
    auth: "none",
    username: '',
    tel: '',
    primarytel: '',
    authcode: '',
    time1: '获取验证码', //倒计时 
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
  radioChange(e) {
    var that = this;
    that.setData({
      time: e.detail.value
    })
  },
  radioChange1(e) {
    var that = this;
    that.setData({
      date1: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this;
    var storeid = wx.getStorageSync("storeid");
    this.setData({
      storeid: storeid
    }),
      console.log("storeid" + storeid);
    this.getStoreInfo();
    this.getMyInfo();
    this.getArea();
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

  //获取预约说明
 messageInput: function (event) {
   this.setData({ message: event.detail.value })
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
        time1: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time1: '重新发送',
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

    else if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
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


    else if (that.data.auth == "none") {
        if (that.data.date == "点击选择预约时间") {
          wx.showToast({
            title: '请选择预约时间!',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        else{
        that.order("*noneedforcode*");
        }
    }

    else if (that.data.auth == "block") {
      if (that.data.authcode.length == 0) {
        wx.showToast({
          title: '请填写验证码！',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
      else {
        if (that.data.date == "点击选择预约时间") {
          wx.showToast({
            title: '请选择预约时间!',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        else {
        that.order(that.data.authcode);
        }
      }
    }
  },
  //发送验证码
  sendCode: function (e) {
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
  },

  //预约
  order: function (e) {
    console.log(e);
    var code = e;
    var that = this;
    console.log("");
    var index = that.data.index;
    var storeid = that.data.storeidList[index];
    wx.request({
      url: requestIP + '/student/subStore',
      data: {
        storeid: storeid,
        name: that.data.username,
        phone: that.data.tel,
        code: code,
        message: that.data.message,
        date:that.data.date,
        time:that.data.time
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.resultCode + res.data.data);
        if (res.data.resultCode == '101') {
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
            url: '/pages/message/message?flag=1',
          })
        } else if (res.data.resultCode == '216') {
          wx.showToast({
            title: '验证码错误!',
            icon: 'none',
            duration: 1000
          })
          $Message({
            content: '预约失败！',
            type: 'error'
          });
        }
        else {
          $Message({
            content: '预约失败！',
            type: 'error'
          });
        }
      },
      fail(res) {
        $Message({
          content: '预约失败！',
          type: 'error'
        });
      }
    })
  },

//获取门店详细信息
  getStoreInfo:function(e){
    var that = this;
    wx.request({
      url: requestIP + '/student/getStoreInfo',
      data: {
        areaid: that.data.storeid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          var storeMes = res.data.data.province + res.data.data.city + res.data.data.areaname + res.data.data.storename + res.data.data.location;
        that.setData({
          storeMes: storeMes
        })
        }
      },
      fail(res) {
      }
    })
  },

  getArea:function(){
    var that = this;
    wx.request({
      url: requestIP + '/user/getArea',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          var array = [];
         // var Aarray;
          var locationList = [];
          var storeidList = [];
         // var ALocation;
          for(var i=0;i<res.data.data.length;i++)
          {
            var Aarray = res.data.data[i].province + res.data.data[i].city + res.data.data[i].areaname + res.data.data[i].storename;
            array.push(Aarray);
            var ALocation = res.data.data[i].province + res.data.data[i].city + res.data.data[i].areaname + res.data.data[i].storename+res.data.data[i].location;
            locationList.push(ALocation);
            var Astoreid = res.data.data[i].areaid;
            storeidList.push(Astoreid);
          }
          that.setData({
            array: array,
            locationList: locationList,
            storeidList: storeidList
          })
        }
      },
      fail(res) {
      }
    })
  }

});