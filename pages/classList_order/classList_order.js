// pages/class_des/class_des.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    classList_order: "",
    storeid:"",
    errortips: '',
    error_noClassOrder: 'none',
    error_noClassSignUp: 'none',
    term:""
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    this.getClassList_order();
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },

  GOclass_des1: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var classList_order = this.data.classList_order;
    var classid = classList_order[index].classid;
    var res_status = classList_order[index].res_status;
    wx.setStorageSync("classid", classid);
    app.globalData.res_status = res_status;
    wx.navigateTo({
      url: '../class_des_order/class_des_order',
    })
  },

  onLoad: function (options) {
    var storeid = wx.getStorageSync("storeid");
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
            classList_order: null
          });
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
  },

  termInput: function (event) {
    this.setData({ term: event.detail.value })
  },

  searchClassAppointment:function(e){
    var that = this;
    wx.request({
      url: requestIP + '/student/searchClassAppointment',
      data: {
        storeid: that.data.storeid,
        term: that.data.term
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          console.log("有多少可预约" + res.data.data.length);
          that.setData({
            classList_order: null
          });
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