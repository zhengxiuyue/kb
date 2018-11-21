// pages/signin/signin.js
var util = require('../../utils/util.js');
var app = getApp();
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
    classid: {
      type: "String",
      value: "",
    }, 
    Issigntea:{
      type: "String",
      value: "",
    },
    Issignstu: {
      type: "String",
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectPerson: true,
    firstPerson: '2018/11/06 9:30--11:00 第二节',
    selectArea: false,
    current: 0,
    display:"none",
    dispaly1:"block",
    scheduleid:"",
    signid:"",
    state:"",
    space:"/image/space.png",
    nosign:"",
    havesign:"",
    signing:"",
    sign:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //学生角色签到
    signstu:function(){
      wx.request({
        url: requestIP + '/student/sign',
        data: {
          signnumber:""//签到编号
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },
        success: function (res) {
          //本节课发布了签到
          if (res.data.resultCode == "101") {
            wx.showToast({
              title: '签到成功',
              icon: 'success',
              duration: 2000
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
    clickPerson: function () {
      var selectPerson = this.data.selectPerson;
      if (selectPerson == true) {
        this.setData({
          selectArea: true,
          selectPerson: false,
        })
      } else {
        this.setData({
          selectArea: false,
          selectPerson: true,
        })
      }
    },

    //切换已签到 未签到选项卡
    changeTab(e) {
      let index = parseInt(e.currentTarget.dataset.index || 0)
      this.setData({
        current: index
      })
      var requestIP = app.globalData.requestIP
      var that=this
      wx.request({
        url: requestIP + '/teacher/seeSign',
        data: {
          signid: that.data.signid,
          state: that.data.current  //已签到或者未签到
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },
        success: function (res) {
          //本节课发布了签到
          if (res.data.resultCode == "101") {
            that.setData({
              sign: []
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.sign[i] = res.data.data[i]
            }
            that.setData({
              sign: that.data.sign
            })
            console.log(that.data.sign)
          }
          //本节课未发布签到
          else if (res.data.resultCode == "204") {
            that.setData({
              Issigntea: 0
            })
          }
          else {
            that.setData({
              Issigntea: null
            })
            console.log("请求失败");
          }
        },
        fail: function () {
          that.setData({
            Issigntea: null
          })
          console.log("fail");
        },
      })
      
    },
   
    //点击切换下拉框按钮
    mySelect: function (e) {
      var that = this;
      var requestIP = app.globalData.requestIP
      var scheduleid = e.currentTarget.dataset.scheduleid
      var signid = e.currentTarget.dataset.signid
      this.setData({
        firstPerson: e.target.dataset.me,
        scheduleid:scheduleid,
        selectPerson: true,
        selectArea: false,
        // Issigntea: e.target.dataset.id,
        signid: signid
      })

      //已经上完的课且发布过签到signid存在
      if (e.target.dataset.id==1 & signid!=null)
      {
        wx.request({
          url: requestIP + '/teacher/seeSign',
          data: {
            signid: that.data.signid,
            state: 1  //获取已签到
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'openid': app.globalData.openid
          },
          success: function (res) {
            if (res.data.resultCode == "101") {
              that.setData({
                Issigntea: 1
              })
            } 
            else if (res.data.resultCode == "204"){
              that.setData({
                Issigntea: 1
              })
              console.log("还没有签到的人")
            }
            else {
              that.setData({
                Issigntea: null
              })
              console.log("请求失败");
            }
          },
          fail: function () {
            that.setData({
              Issigntea: null
            })
            console.log("fail");
          },
        })
      }
      //上完的课但没有发布签到
      else if(e.target.dataset.id == 1 & signid == null){
        that.setData({
          Issigntea: 0
        })
      }
      //正在上的课
      else if (e.target.dataset.id == 0) {
        that.setData({
          Issigntea:2 //显示发布签到按钮
        })
      }
    }, 
   
    //发签到
    submit:function(e){
      var that = this;
      var requestIP = app.globalData.requestIP
      wx.request({
        url: requestIP + '/teacher/publishSign',
        data: {
          classid: that.data.classid,
          scheduleid: that.data.scheduleid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              Issigntea:1
            })
            
          } else {
            console.log("请求失败");
          }
        },
      })
     
      this.setData({
        display:"block",
        dispaly1:"none",
        duration: 10000
      })
    }
  },

  ready: function () {
     
  }
})