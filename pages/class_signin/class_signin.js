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
    status:0,
    scheduleid:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    changeTab(e) {
      let index = parseInt(e.currentTarget.dataset.index || 0)
      this.setData({
        current: index
      })
    },
    //点击切换
    mySelect: function (e) {
      let that = this;
      var scheduleid = e.currentTarget.dataset.scheduleid
      this.setData({
        firstPerson: e.target.dataset.me,
        scheduleid:scheduleid,
        selectPerson: true,
        selectArea: false,
        status: e.target.dataset.id
      })
      console.log(that.data.scheduleid)
    }, 

    //发签到
    submit:function(e){
      var that = this;
      var requestIP = app.globalData.requestIP
      wx.request({
        url: requestIP + '/teacher/publishSign',
        data: {
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