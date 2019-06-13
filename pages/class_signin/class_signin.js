// pages/signin/signin.js
var util = require('../../utils/util.js');
const { $Message } = require('../../dist/base/index');
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
    Issignspace:{
      type: "String",
      value: "",
    }//是否204
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
    Issignnumspace:"none",
    visible5: false,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '确定',
        color: '#ed3f14',
        loading: false
      }
    ],
    reason:'',//学生请假理由
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取学生请假理由
    reasonInput: function (event) {
      var that = this
      that.setData({
        reason: event.detail.value
      })
    },
    //学生角色请假
    askForLeave:function(e){
      var that = this
      console.log(e)
      wx.request({
        url: requestIP + '/user/askForLeave',
        data: {
          scheduleid: that.data.scheduleid,
          userid: app.globalData.userid,
          reason: that.data.reason
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showToast({
              title: '请假成功',
              icon:'success'
            })     
            //获取签到列表
            wx.request({
              url: requestIP + '/user/getScheStu',
              data: {
                classid: that.data.classid,
                userid: app.globalData.userid
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                var time = util.formatTime(new Date());
                if (res.data.resultCode == "101") {
                  that.setData({
                    sign: res.data.data,
                  })
                }
                else {
                  that.setData({
                    sign: []
                  })
                  wx.showToast({
                    title: '请求失败',
                    icon: 'none',
                  });
                }
              },
              fail: function () {
                that.setData({
                  sign: []
                })
                wx.showToast({
                  title: '服务器异常',
                  icon: 'none',
                });
              },
            })       
          } else {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
          });
        },
      })
      
    },


    handleOpen5(e) {
      this.setData({
        visible5: true,
        scheduleid: e.currentTarget.dataset.scheduleid,
        reason:''
      });
    },

    handleClick5({ detail }) {
      var that = this
      if (detail.index === 0) {
        this.setData({
          visible5: false
        });
      } 
      else {
        if (that.data.reason.replace(/\s+/g, '').length == 0){
          wx.showToast({
            title: '请输入请假理由',
            icon: "none",
          });
          return
        }
        else{
          const action = [...this.data.actions5];
          action[1].loading = true;

          this.setData({
            actions5: action
          });

          setTimeout(() => {
            action[1].loading = false;
            this.setData({
              visible5: false,
              actions5: action
            });
            that.askForLeave()
          }, 2000);
        }
      }
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
                  wx.showToast({
                    title: '请求失败',
                    icon: 'none',
                  });
                }
              },
              fail: function () {
                that.setData({
                  sign: [],
                })
                wx.showToast({
                  title: '服务器异常',
                  icon: 'none',
                });
              },
            })
          } else {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
          });
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
                  wx.showToast({
                    title: '请求失败',
                    icon: 'none',
                  });
                }
              },
              fail: function () {
                that.setData({
                  sign: [],
                })
                wx.showToast({
                  title: '服务器异常',
                  icon: 'none',
                });
              },
            })
          } else {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
          });
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
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
        fail: function () {
          that.setData({
            current: "1"
          })
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
          });
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
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
        fail: function () {
          that.setData({
            Issignnumspace: "none",
            signstu: []
          })
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
          });
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
     
  },

  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {
    var that = this
    var coursename = that.data.coursename
    var classid = that.data.classid
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/class_signin/class_signin?shareStatus=' + shareStatus
    }
  },
})