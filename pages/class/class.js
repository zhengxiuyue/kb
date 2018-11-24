var app = getApp();
var util = require('../../utils/util.js');
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
    sign:[
      {classnum:''}
    ],//课堂签到
    Isnoticespace: "none",
    Ischatspace: "none",
    openid:"",
    classnum:[],
    time:"",
    "Issignstu":"",
    "Issigntea":"",
    showCom: true,
    signnumber:"",//学生签到编号
    firstPerson:"",//老师选择课堂框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userstatus = app.globalData.userstatus
    console.log(userstatus+"kkkk")
    var openid = app.globalData.openid
    var requestIP = app.globalData.requestIP
    var classid = that.options.classid

    // 调用函数时，传入new Date()参数，返回值是日期和时间    
    var time = util.formatTime(new Date()); 
    // 再通过setData更改Page()里面的data，动态更新页面的数据    

    this.setData({
      userstatus: userstatus,
      openid: openid,
      classid: classid,
      time: time 
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
            that.data.mate[i] = res.data.data[i]
          }
          that.setData({
            mate: that.data.mate
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
    var requestIP = app.globalData.requestIP
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
              chat: []
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
  changeTab(e) {
    let index = parseInt(e.currentTarget.dataset.index || 0)
    let that = this;
    var requestIP = app.globalData.requestIP
    this.setData({
      current: index
    })
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
              mate: []
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.mate[i] = res.data.data[i]
            }
            that.setData({
              mate: that.data.mate
            })
          } else {
            console.log("请求失败");
          }
        },
      })
    } 
    //老师签到功能
    else if (that.data.current == 1 & that.data.userstatus == 2 ){
      //获取签到列表
      wx.request({
        url: requestIP + '/teacher/getSignBefore',
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
              firstPerson:time,
              Issigntea:"3"
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
              sign: [],
              Issigntea:"3"
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            sign: [],
            Issigntea:"3"
          })
          console.log("fail");
        },
      })
    }

    //学生签到功能
    else if (that.data.current == 1 & that.data.userstatus == 3) {
      //获取当前是否有签到
      wx.request({
        url: requestIP + '/user/getSign',
        data: {
          classid: that.data.classid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          //当前有签到信息
          if (res.data.resultCode == "219") {
            var signnumber = res.data.data
            that.setData({
              //显示签到按钮
              signnumber: signnumber,
              Issignstu: "1",
              Issigntea: "3"
            })
          } else {
            that.setData({
              Issigntea: "3"
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            Issignstu: "",
            Issigntea: ""
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
              chat: []
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