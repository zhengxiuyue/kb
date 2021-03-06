// pages/order/order.js
var app = getApp();
var requestIP = app.globalData.requestIP;

Page({
  data: {
    current: 'tab1',
    storeOrderList:null,
    courseOrderList:null,
    error_noCourseOrder:"none",
    error_noStoreOrder:"none",
    order_status:0 //0是预约中 1是已处理
  },

  handleChange({ detail }) {
    if (detail.key == "tab1")
    {
    this.setData({
      current: detail.key,
      order_status: 0 //0是预约中 1是已处理      
    });
    }
    else if (detail.key == "tab2"){
      this.setData({
        current: detail.key,
        order_status: 1 //0是预约中 1是已处理      
      });
    }
    var that = this;
    that.getAreaReservation();
    that.getCourseReservation();
  },


  onLoad: function (options) {
    app.editTabBar2();
    var that = this;
    if (wx.getStorageSync("order_status"))
    {
      if (wx.getStorageSync("order_status") == 0)
      {
      this.setData({
        current: "tab1",
        order_status: 0 //0是预约中 1是已处理      
      });
      } else if (wx.getStorageSync("order_status") == 1){
        this.setData({
          current: "tab2",
          order_status: 1 //0是预约中 1是已处理      
        });
      }
    }
    that.getAreaReservation();
    that.getCourseReservation();
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/order/order?shareStatus=' + shareStatus
    }
  },

  GO_order_course_des: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var courseOrderList = this.data.courseOrderList;
    var resid = courseOrderList[index].res_id;
    var res_status = courseOrderList[index].res_status;
    var order_status = that.data.order_status;  
    wx.navigateTo({
      url: '../order_course_des/order_course_des?resid=' + resid + "&order_status=" + order_status + "&res_status=" + res_status,
    })
  },

  GO_order_store_des: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var storeOrderList = this.data.storeOrderList;
    var aresid = storeOrderList[index].ares_id;
    var ares_status = storeOrderList[index].ares_status;
    var order_status = that.data.order_status;
    wx.navigateTo({
      url: '../order_store_des/order_store_des?aresid=' + aresid + "&order_status=" + order_status + "&ares_status=" + ares_status,
    })
  },

  getAreaReservation: function (e) {
    //获取门店预约列表
    var that = this;
    var interf;
    that.setData({
      storeOrderList: null
    })
    if (that.data.order_status == 0)
    {
      interf = "getAreaReservation";
    } else if (that.data.order_status == 1){
      interf = "getAreaReservationHandled";
    }
    wx.request({
      url: requestIP + '/assistant/' + interf,
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          that.setData({
            storeOrderList:res.data.data,
            error_noStoreOrder:"none"
          })
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
    var interf;
    that.setData({
      courseOrderList: null
    })
    if (that.data.order_status == 0) {
      interf= "getCourseReservation";
    } else if (that.data.order_status == 1) {
      interf = "getCourseReservationHandled";
    }
    wx.request({
      url: requestIP + '/assistant/' + interf,
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
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
    var that = this;
    that.getAreaReservation();
    that.getCourseReservation();
  }
});
