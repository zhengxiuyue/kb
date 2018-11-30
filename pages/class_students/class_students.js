// pages/class_students/class_students.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    mate: {
      type: "Array",
      value: "",
    },
    classid: {
      type: "String",
      value: ""
    },
    Ismatespace: {
      type: "String",
      value: ""
    },//查询结果是否为空
    search: {
      type: "String",
      value: ""
    },//查询内容
  },

  /**
   * 组件的初始数据
   */
  data: {
    "imgUrl": "/image/headphoto.png",
    space: "/image/space.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    SearchInput:function(e){
      this.setData({
        search: e.detail.value.replace(/\s+/g, '')
      })
    },
    tel: function (e) {
      var tel = e.currentTarget.dataset.tel
      console.log(tel)
      wx.makePhoneCall({
        phoneNumber: tel,
      })
    },
    search: function(e){
      let that = this;
      var requestIP = app.globalData.requestIP
      if (that.data.search.length == 0) {
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
                Ismatespace: "none"
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
        return true
      }
      wx.request({
        url: requestIP + '/user/searchStudent',
        data: {
          classid: that.data.classid,
          search: that.data.search
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },// 设置请求的 header
        success: function (res) {
          //查询到信息
          if (res.data.resultCode == "101") {
            that.setData({
              mate: [],
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.mate[i] = res.data.data[i]
            }
            that.setData({
              mate: that.data.mate
            })
          }
          //未查询到
          else if (res.data.resultCode == "204") {
            that.setData({
              mate: [],
              Ismatespace: "block"
            })
          }
          else {
            that.setData({
              mate: [],
              Ismatespace: "none"
            })
            console.log("请求失败");
          }
        }
      })
    }
  },

  ready: function () {
  
  }
})




