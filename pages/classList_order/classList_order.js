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
    var that = this
    var nickname = app.globalData.nickName
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
    }
  },

  GOclass_des1: function (e) {
    var index = e.currentTarget.dataset.index;
    var classList_order = this.data.classList_order;
    var classid = classList_order[index].classid;
    wx.setStorageSync("classid", classid);
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
        storeid: that.data.storeid,
        getType: 1
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
    if (!that.data.term) {
      that.getClassList_order();
      return false;
    }
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
          that.setData({
            classList_order: null
          });
          that.setData({
            classList_order: res.data.data
          });
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