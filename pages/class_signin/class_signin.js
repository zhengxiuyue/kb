// pages/signin/signin.js
var util = require('../../utils/util.js');
var app = getApp();
var requestIP = app.globalData.requestIP;
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    userstatus: {
      type: "Number",
      value: "",
    },
    sign: {
      type: "Array",
      value: "",
    },
    classnum: {
      type: "Array",
      value: "",
    },
    time: {
      type: "String",
      value: "",
    },
    endFormatTime: {
      type: "String",
      value: "",
    },
    endFormatTime2: {
      type: "String",
      value: "",
    },
    classid: {
      type: "String",
      value: "",
    }, 
    gosignteamore: {
      type: "String",
      value: "",
    },
    Issignstu: {
      type: "String",
      value: "",
    },
    scheduleid: {
      type: "String",
      value: "",
    },//学生签到编号
    firstPerson: {
      type: "String",
      value: "",
    },//老师签到框   
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectPerson: true,
    selectArea: false,
    current: 1,
    display:"none",
    dispaly1:"block",
    scheduleid:"",
    state:"",
    space:"/image/space.png",
    imgUrl: "/image/photo.png",
    signstu:[],//已签到学生信息
    notsignstu: [],//未签到学生信息
    signnum:"",//已签到学生人数
    notsignnum:"",//未签到学生人数
    Issignnumspace:"none"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //学生角色签到
    signstu:function(e){
      var that = this
      wx.request({
        url: requestIP + '/student/sign',
        data: {
          scheduleid: e.currentTarget.dataset.scheduleid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showLoading();
            wx.hideLoading();
            setTimeout(() => {
              wx.showToast({
                title: '签到成功',
                icon: "success",
              });
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
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
                if (res.data.resultCode == "101") {
                  that.setData({
                    sign: []
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
          else {          
            console.log("请求失败");
          }
        },
        fail: function () {
          console.log("fail");
        },
      })
    },   

    //老师签到
    signin:function(e){
      var that = this
      wx.request({
        url: requestIP + '/teacher/signIn',
        data: {
          scheduleid: e.currentTarget.dataset.scheduleid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showLoading();
            wx.hideLoading();
            setTimeout(() => {
              wx.showToast({
                title: '签到成功',
                icon: "success",
              });
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
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
          } else {
            console.log("请求失败");
          }
        },
        fail: function () {
          console.log("fail");
        },
      })
    },

    //老师签退
    signout: function (e) {
      var that = this
      wx.request({
        url: requestIP + '/teacher/signOut',
        data: {
          scheduleid: e.currentTarget.dataset.scheduleid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showLoading();
            wx.hideLoading();
            setTimeout(() => {
              wx.showToast({
                title: '签退成功',
                icon: "success",
              });
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
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
          } else {
            console.log("请求失败");
          }
        },
        fail: function () {
          console.log("fail");
        },
      })
    },

    //切换已签到 未签到选项卡
    changeTab(e) {
      var that = this
      var index = e.currentTarget.dataset.index
      that.setData({
        current: index,
        Issignnumspace:"none",
      })
      wx.request({
        url: requestIP + '/teacher/seeSign',
        data: {
          classid:that.data.classid,
          scheduleid: that.data.scheduleid,
          state: that.data.current  //已签到或者未签到
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          //本节课发布了签到
          if (res.data.resultCode == "101") {
            that.setData({
              signstu: []
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.signstu[i] = res.data.data[i]
            }
            that.setData({
              signstu: that.data.signstu
            })
          }
          //无数据
          else if (res.data.resultCode == "204") {
            that.setData({
              Issignnumspace:"block",
              signstu: []
            })
          }
          else {
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            current: "1"
          })
          console.log("fail");
        },
      })
    },
   
    //老师查看学生签到详情
    gosigndetail:function(e){
      var that = this
      var scheduleid = e.currentTarget.dataset.scheduleid
      var signnum = e.currentTarget.dataset.signnum
      var notsignnum = e.currentTarget.dataset.notsignnum 
      that.setData({
        current:1,
        gosignteamore: "1",
        scheduleid: scheduleid,
        signnum:signnum,
        notsignnum:notsignnum
      })     
      wx.request({
        url: requestIP + '/teacher/seeSign',
        data: {
          classid:that.data.classid,
          scheduleid: that.data.scheduleid,
          state: 1  //获取已签到
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              Issignnumspace:"none",
              signstu: []
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.signstu[i] = res.data.data[i]
            }
            that.setData({
              signstu: that.data.signstu
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              Issignnumspace:"block",
              signstu: []
            })
          }
          else {
            that.setData({
              Issignnumspace: "none",
              signstu: []
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            Issignnumspace: "none",
            signstu: []
          })
          console.log("fail");
        },
      })
    },

    //返回签到列表
    gosigntea: function (e) {
      var that = this;
      that.setData({
        gosignteamore: "0",
        Issignnumspace:"none"
      })
    }
  },


  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
  },
  ready: function () {
     
  }
})