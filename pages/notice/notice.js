// pages/notice/notice.js
var app = getApp();
var requestIP = app.globalData.requestIP;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userstatus: app.globalData.userstatus,
    error_noNotice:"none",
    errortips:"暂时没有通知",
    noticeList:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotice();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  
  },
  //获取通知
  getNotice: function (e) {
    var that = this;
    wx.request({
      url: requestIP + '/student/getNotice',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          console.log("通知"+res.data.data)
          that.setData({
            noticeList: res.data.data,
             error_noNotice: "none"
          });
        }
        else{
          that.setData({
            noticeList:null,
            error_noNotice: "block"
          });
        }
      }
    })
  },
  delt: function (e) {
    let that = this;
    var requestIP = app.globalData.requestIP
    var no_id = e.currentTarget.dataset.no_id
    that.setData({
      no_id: no_id
    })
    wx.showModal({
      title: '提示',
      content: '确定要删除本条通知吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: requestIP + '/teacher/deleteNotice',
            data: {
              noticeid: that.data.no_id,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'userid': app.globalData.userid
            },// 设置请求的 header
            success: function (res) {
              if (res.data.resultCode == "101") {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.request({
                  url: requestIP + '/user/getNotice',
                  data: {
                    classid: that.data.classid
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'userid': app.globalData.userid
                  },// 设置请求的 header
                  success: function (res) {
                    if (res.data.resultCode == "101") {
                      that.setData({
                        notice: []
                      })
                      for (var i = 0, len = res.data.data.length; i < len; i++) {
                        that.data.notice[i] = res.data.data[i]
                      }
                      that.setData({
                        notice: that.data.notice
                      })
                    }
                    else if (res.data.resultCode == "204") {
                      that.setData({
                        notice: [],
                        Isnoticespace: "block"
                      })
                    }
                    else {
                      console.log("请求失败");
                    }
                  },
                })
              } else {
                console.log("请求失败");
              }
            }
          })

          // 重新发请求刷新数据
        } else if (sm.cancel) { }
      }
    })
  }

})