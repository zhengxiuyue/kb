var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    classList_order: "",
    storeid: "",
    errortips: '',
    error_noClassOrder: 'none',
    error_noClassSignUp: 'none',
    term:""
  },

  termInput: function (event) {
    this.setData({ term: event.detail.value })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.shareStatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/classList_signUp/classList_signUp?shareStatus=' + shareStatus
    }
  },
  //获取当前门店下的可报名课程
  getClassList_signUp: function (e) {
    var that = this;
    wx.request({
      url: requestIP + '/student/getClassEnter',
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
            classList_signUp: res.data.data
          });
          that.setData({
            error_noClassSignUp: "none"
          });
        }
        else {
          that.setData({
            classList_signUp: null
          });
          that.setData({
            error_noClassSignUp: "block"
          });
          that.setData({
            errortips: '没有数据'
          })
        }
      },
      fail(res) {
        that.setData({
          classList_signUp: null
        });
        that.setData({
          error_noClassSignUp: "block"
        });
        that.setData({
          errortips: '没有数据'
        })
      }
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    this.getClassList_signUp();
  },

  GOclass_des: function (e) {
    var index = e.currentTarget.dataset.index;
    var classList_signUp = this.data.classList_signUp;
    var classid = classList_signUp[index].classid;
    wx.setStorageSync("classid", classid);
    wx.navigateTo({
      url: '../class_des_signUp/class_des_signUp',
    })
  },

  onLoad: function (options) {
    var storeid = wx.getStorageSync("storeid");
    this.setData({
      storeid: storeid
    }),
      this.getClassList_signUp();
  },

  searchClassEnter: function (e) {
    var that = this;
    if (!that.data.term) {
      that.getClassList_signUp();
      return false;
    }
    wx.request({
      url: requestIP + '/student/searchClassEnter',
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
            classList_signUp: res.data.data
          });
          that.setData({
            error_noClassSignUp: "none"
          });
        }
        else {
          that.setData({
            classList_signUp: null
          });
          that.setData({
            error_noClassSignUp: "block"
          });
          that.setData({
            errortips: '没有数据'
          })
        }
      },
      fail(res) {
        that.setData({
          classList_signUp: null
        });
        that.setData({
          error_noClassSignUp: "block"
        });
        that.setData({
          errortips: '没有数据'
        })
      }
    })
  }
})