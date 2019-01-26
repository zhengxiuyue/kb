var app = getApp();
var util = require('../../utils/util.js');
var requestIP = app.globalData.requestIP
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    userstatus:"",
    showIndex: 0,
    classid:"",
    mate: [], //课堂成员
    items:[], //课堂详情
    notice:[],//课堂通知
    chat:[],//课堂讨论
    studentcount:'',//学生数量
    sign:[
      {classnum:''}
    ],//课堂签到
    Isnoticespace: "none",
    Ischatspace: "none",
    openid:"",
    classnum:[],
    time:"",//当前时间
    endFormatTime:"",//提前半个小时的时间
    endFormatTime2: "",//推迟半个小时的时间
    gosignteamore:"0",//老师角色签到 是否点进详情
    showCom: true,
    Issign:null,//学生是否签到
    Ismatespace: "none",//学生信息查询是否为空
    search: "",//学生查询内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userstatus = app.globalData.userstatus
    var openid = app.globalData.openid
    var classid = that.options.classid

    // 调用函数时，传入new Date()参数，返回值是日期和时间    
    var time = util.formatTime(new Date())
    var endFormatTime = util.endFormatTime(new Date(),30)
    var endFormatTime2 = util.endFormatTime(new Date(), -30)
    // 再通过setData更改Page()里面的data，动态更新页面的数据    

    this.setData({
      userstatus: userstatus,
      openid: openid,
      classid: classid,
      time: time,
      endFormatTime: endFormatTime,
      endFormatTime2: endFormatTime2,
    })

    //请求课堂详细信息
    wx.request({
      url: requestIP + '/student/getClassInfo',
      data: {
        classid: that.data.classid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            items: res.data.data
          })
        } else {
          console.log("请求失败");
        }
      },
    })

    //获取课堂成员信息 
    wx.request({
      url: requestIP + '/user/getClassmateInfo',
      data: {
        classid: that.data.classid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            mate: []
          })
          for (var i = 0, len = res.data.data.length; i < len; i++) {
            that.data.mate[i] = res.data.data[i];
            that.data.studentcount = res.data.data[0].studentcount
          }
          that.setData({
            mate: that.data.mate,
            studentcount:that.data.studentcount
          })
        } else {
          console.log("请求失败");
        }
      },
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
    //显示自定义的底部导航
    var that = this
    if (that.data.current == 2) {
      wx.request({
        url: requestIP + '/user/getDiscussInfo',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              chat: [],
              Ischatspace: "none",
              search:""
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.chat[i] = res.data.data[i]
            }
            that.setData({
              chat: that.data.chat
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              chat: [],
              Ischatspace: "block"
            })
          }
          else {
            that.setData({
              chat: [],
              Ischatspace: "none",
              search: ""
            })
            console.log("请求失败");
          }
        },
      })
    }
    else if (that.data.current == 3) {
      wx.request({
        url: requestIP + '/user/getNotice',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              notice: [],
              Isnoticespace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.notice[i] = res.data.data[i]
            }
            that.setData({
              notice: that.data.notice
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              notice: [],
              Isnoticespace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
    
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
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);

    let that = this
    //成员
    if (that.data.current == 0) {
      wx.request({
        url: requestIP + '/user/getClassmateInfo',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              mate: [],
              Ismatespace: "none",
              search: ""
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.mate[i] = res.data.data[i]
            }
            that.setData({
              mate: that.data.mate
            })
          } else {
            that.setData({
              mate: [],
              Ismatespace: "none",
              search: ""
            })
            console.log("请求失败");
          }
        },
      })
    }

    // 签到--学生
    else if (that.data.current == 1 & that.data.userstatus == 3) {
      //获取签到列表
      wx.request({
        url: requestIP + '/student/getClassSchedule',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          var time = util.formatTime(new Date());
          if (res.data.resultCode == "101") {
            that.setData({
              sign: [],
              gosignteamore: "0"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.sign[i] = res.data.data[i]
              that.data.sign[i].classnum = i + 1//获取第几节课
            }
            that.setData({
              sign: that.data.sign,
            })
          } else {
            that.setData({
              sign: []
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            sign: []
          })
          console.log("fail");
        },
      })
    }

    //签到--老师
    else if (that.data.current == 1 & that.data.userstatus == 2) {
      //获取签到列表
      wx.request({
        url: requestIP + '/teacher/getSignList',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          var time = util.formatTime(new Date());
          if (res.data.resultCode == "101") {
            that.setData({
              sign: [],
              gosignteamore: "0"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.sign[i] = res.data.data[i]
              that.data.sign[i].classnum = i + 1//获取第几节课
            }
            that.setData({
              sign: that.data.sign,
            })
          } else {
            that.setData({
              sign: []
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            sign: [],
          })
          console.log("fail");
        },
      })
    }

    //学生签到功能
    else if (that.data.current == 1 & that.data.userstatus == 3) {
      //获取当前是否有签到
     
    }

    //讨论功能
    else if (that.data.current == 2) {
      wx.request({
        url: requestIP + '/user/getDiscussInfo',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              chat: [],
              Ischatspace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.chat[i] = res.data.data[i]
            }
            that.setData({
              chat: that.data.chat
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              chat: [],
              Ischatspace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
    else if (that.data.current == 3) {
      wx.request({
        url: requestIP + '/user/getNotice',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              notice: [],
              Isnoticespace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.notice[i] = res.data.data[i]
            }
            that.setData({
              notice: that.data.notice
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              notice: [],
              Isnoticespace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
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
    var coursename = that.data.items.coursename
    var classid = that.data.classid
    var nickname = app.globalData.nickName
    var num = 2
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      path: '/pages/class/class?classid=' + classid + '&num=' +num
    }
  },
  changeTab(e) {
    let index = parseInt(e.currentTarget.dataset.index || 0)
    let that = this;
    this.setData({
      current: index
    })

    //成员
    if(that.data.current == 0){
      wx.request({
        url: requestIP + '/user/getClassmateInfo',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              mate: [],
              Ismatespace:"none",
              search:""
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.mate[i] = res.data.data[i]
            }
            that.setData({
              mate: that.data.mate
            })
          } else {
            that.setData({
              mate: [],
              Ismatespace: "none",
              search:""
            })
            console.log("请求失败");
          }
        },
      })
    } 

    //签到--学生
    else if (that.data.current == 1 & that.data.userstatus == 3){
      //获取签到列表
      wx.request({
        url: requestIP + '/student/getClassSchedule',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          var time = util.formatTime(new Date()); 
          if (res.data.resultCode == "101") {
            that.setData({
              sign: [],
              gosignteamore:"0"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.sign[i] = res.data.data[i]
              that.data.sign[i].classnum = i+1//获取第几节课
            }
            that.setData({
              sign: that.data.sign,
            })
          } else {
            that.setData({
              sign: []
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            sign: []
          })
          console.log("fail");
        },
      })
    }

    //签到--老师
    else if (that.data.current == 1 & that.data.userstatus == 2) {
      wx.request({
        url: requestIP + '/teacher/getSignList',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          var time = util.formatTime(new Date());
          if (res.data.resultCode == "101") {
            that.setData({
              sign: [],
              gosignteamore: "0"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.sign[i] = res.data.data[i]
              that.data.sign[i].classnum = i + 1//获取第几节课
            }
            that.setData({
              sign: that.data.sign,
            })
          } else {
            that.setData({
              sign: []
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            sign: [],
          })
          console.log("fail");
        },
      })
    }

    //签到--助教
    else if (that.data.current == 1 & that.data.userstatus == 1) {
      wx.request({
        url: requestIP + '/assistant/getSignList',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          var time = util.formatTime(new Date());
          if (res.data.resultCode == "101") {
            that.setData({
              sign: [],
              gosignteamore: "0"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.sign[i] = res.data.data[i]
              that.data.sign[i].classnum = i + 1//获取第几节课
            }
            that.setData({
              sign: that.data.sign,
            })
          } else {
            that.setData({
              sign: []
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            sign: [],
          })
          console.log("fail");
        },
      })
    }

    //讨论功能
    else if (that.data.current == 2) {
      wx.request({
        url: requestIP + '/user/getDiscussInfo',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              chat: [],
              Ischatspace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.chat[i] = res.data.data[i]
            }
            that.setData({
              chat: that.data.chat
            })
          } 
          else if (res.data.resultCode == "204"){
            that.setData({
              chat: [],
              Ischatspace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
    else if (that.data.current == 3) {
      wx.request({
        url: requestIP + '/user/getNotice',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              notice: [],
              Isnoticespace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.notice[i] = res.data.data[i]
            }
            that.setData({
              notice: that.data.notice
            })
          } 
          else if (res.data.resultCode == "204") {
            that.setData({
              notice: [],
              Isnoticespace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  }
})