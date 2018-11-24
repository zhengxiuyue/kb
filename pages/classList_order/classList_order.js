// pages/class_des/class_des.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    classList_order: "",
    storeid:""
  },

  onPullDownRefresh: function () {
    this.getClassList_order();
  },

  onLoad: function (options) {
    var storeid = options.storeid;
    console.log("列表页面的"+storeid);
    this.setData({
      storeid: storeid
    }),
    this.getClassList_order();
  },

  //获取当前门店下的可预约课程
  getClassList_order: function (e) {
    var that = this;
    wx.request({
      url: requestIP + '/student/getClassAppointment',
      data: {
        storeid: that.data.storeid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          that.setData({
            classList_order: res.data.data
          });
          console.log(that.data.classList_order[0]);
          that.setData({
            error_noClassOrder: "none"
          });
        }
        else {
          that.setData({
            classList_order: null
          });
          that.setData({
            error_noClassOrder: "block"
          });
          that.setData({
            errortips: '没有数据'
          })
        }
      },
      fail(res) {
        that.setData({
          classList_order: null
        });
        that.setData({
          error_noClassOrder: "block"
        });
        that.setData({
          errortips: '没有数据'
        })
      }
    })
  }
})