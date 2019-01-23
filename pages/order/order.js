// pages/order/order.js
var app = getApp();
var requestIP = app.globalData.requestIP;
const { $Message } = require('../../dist/base/index');

Page({
  data: {
    storeOrderList:null,
    courseOrderList:null,
    error_noCourseOrder:"none",
    error_noStoreOrder:"none"
  },
  onLoad: function (options) {
    app.editTabBar2();
    var that = this;
    that.getAreaReservation();
    that.getCourseReservation();
  },
  GO_order_course_des: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var courseOrderList = this.data.courseOrderList;
    var resid = courseOrderList[index].res_id;
    wx.navigateTo({
      url: '../order_course_des/order_course_des?resid=' + resid,
    })
  },
  GO_order_store_des: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var storeOrderList = this.data.storeOrderList;
    var aresid = storeOrderList[index].ares_id;
    console.log(aresid);
    wx.navigateTo({
      url: '../order_store_des/order_store_des?aresid=' + aresid,
    })
  },

  getAreaReservation: function (e) {
    //获取门店预约列表
    var that = this;
    wx.request({
      url: requestIP + '/assistant/getAreaReservation',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data);
        if (res.data.resultCode == '101') {
          that.setData({
            storeOrderList:res.data.data,
            error_noStoreOrder:"none"
          })
          console.log(that.data.storeOrderList);
        }
        else {
          that.setData({
            storeOrderList: null,
            error_noStoreOrder: "block"
          })
        }
      },
      fail(res) {
        that.setData({
          storeOrderList: null,
          error_noStoreOrder: "block"
        })
      }
    });
  },

  //获取课程预约列表
  getCourseReservation: function (e) {
    var that = this;
    wx.request({
      url: requestIP + '/assistant/getCourseReservation',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data);
        if (res.data.resultCode == '101') {
          that.setData({
            courseOrderList: res.data.data,
            error_noCourseOrder: "none"
          })
        }
        else {
          that.setData({
            courseOrderList: null,
            error_noCourseOrder: "block"
          })
        }
      },
      fail(res) {
        that.setData({
          courseOrderList: null,
          error_noCourseOrder: "block"
        })
      }
    });
  }
});
