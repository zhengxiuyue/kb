// pages/class_des/class_des.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    classList_order: "",
    storeid: "",
    errortips: '',
    error_noClassOrder: 'none',
    error_noClassSignUp: 'none'
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },
  //获取当前门店下的可报名课程
  getClassList_signUp: function (e) {
    var that = this;
    console.log("storeid" + that.data.storeid);
    wx.request({
      url: requestIP + '/student/getClassEnter',
      data: {
        storeid: that.data.storeid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
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
    this.getClassList_signUp();
  },

  GOclass_des: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
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
  }
})