// pages/mine/A_mine.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    name: "",
    itemnow: [],//定义变长数组课堂信息
    itemhistory: [],//定义变长数组课堂信息
    Isclassspace: "none",
    userstatus: "",
    avatarUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar2();

    var that = this
    var userstatus = app.globalData.userstatus
    wx.getStorage({
      key: "user",
      success(res) {
        that.setData({
          avatarUrl: wx.getStorageSync('avatarUrl'),
          userstatus: userstatus,
          name: res.data.name
        })
      }
    })

    wx.request({
      url: requestIP + '/assistant/getMyClass',
      data: {
        "type": this.data.current
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            itemnow: [],
            Isclassspace: "none"
          })
          for (var i = 0, len = res.data.data.length; i < len; i++) {
            that.data.itemnow[i] = res.data.data[i]
          }
          that.setData({
            itemnow: that.data.itemnow
          })
        }
        else if (res.data.resultCode == "204") {
          that.setData({
            itemnow: [],
            Isclassspace: "block"
          })
        }
        else {
          console.log("请求失败");
        }
      },
    })
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
    var that = this
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);

    //获取当前课堂
    if (this.data.current == 1) {
      wx.request({
        url: requestIP + '/assistant/getMyClass',
        data: {
          "type": this.data.current
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              itemnow: [],
              Isclassspace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.itemnow[i] = res.data.data[i]
            }
            that.setData({
              itemnow: that.data.itemnow
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              itemnow: [],
              Isclassspace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
    //获取历史课堂
    else if (this.data.current == 0) {
      wx.request({
        url: requestIP + '/assistant/getMyClass',
        data: {
          "type": this.data.current
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              itemhistory: [],
              Isclassspace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.itemhistory[i] = res.data.data[i]
            }
            that.setData({
              itemhistory: that.data.itemhistory
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              itemhistory: [],
              Isclassspace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }   
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
  changeTab(e) {
    let index = parseInt(e.currentTarget.dataset.index || 0)
    let that = this
    this.setData({
      current: index
    })
    if (index == 1) {
      wx.request({
        url: requestIP + '/assistant/getMyClass',
        data: {
          "type": this.data.current
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              itemnow: [],
              Isclassspace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.itemnow[i] = res.data.data[i]
            }
            that.setData({
              itemnow: that.data.itemnow
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              itemnow: [],
              Isclassspace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
    else if (this.data.current == 0 && that.data.itemhistory.length == 0) {
      wx.request({
        url: requestIP + '/assistant/getMyClass',
        data: {
          "type": this.data.current
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              itemhistory: [],
              Isclassspace: "none"
            })
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.itemhistory[i] = res.data.data[i]
            }
            that.setData({
              itemhistory: that.data.itemhistory
            })
          }
          else if (res.data.resultCode == "204") {
            // console.log(res.data.resultCode)
            that.setData({
              itemhistory: [],
              Isclassspace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
  },
  dropDown: function (e) {
    wx.navigateTo({
      url: '/pages/mine_setup/mine_setup',
    })
  }
})