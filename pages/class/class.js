var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    userstatus:"",
    showIndex: 0,
    classid:"",
    mate: [], //课堂成员
    items:[], //课堂详情
    notice:[],//课堂通知
    chat:[],//课堂讨论
    Isclassspace: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userstatus = app.globalData.userstatus
    var requestIP = app.globalData.requestIP
    this.setData({
      userstatus: userstatus,
      //classid: options.classid
    })
   // console.log(that.data.classid)

    //请求课堂详细信息
    wx.request({
      url: requestIP + '/student/getClassInfo',
      data: {
        classid:"c866bf76b4ef11e8ab8e00163e00299d"
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'openid': app.globalData.openid
      },// 设置请求的 header
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            items: res.data.data
          })
        } else {
          console.log("请求失败");
        }
      },
    })

    //获取课堂成员信息 
    wx.request({
      url: requestIP + '/user/getClassmateInfo',
      data: {
        classid: "c866bf76b4ef11e8ab8e00163e00299d"
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'openid': app.globalData.openid
      },// 设置请求的 header
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            mate: []
          })
          console.log(res.data.data.length)
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
      //显示自定义的底部导航
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
  changeTab(e) {
    let index = parseInt(e.currentTarget.dataset.index || 0)
    let that = this;
    var requestIP = app.globalData.requestIP
    this.setData({
      current: index
    })
    console.log(that.data.current)
    if(that.data.current == 0){
      wx.request({
        url: requestIP + '/user/getClassmateInfo',
        data: {
          classid: "c866bf76b4ef11e8ab8e00163e00299d"
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              mate: []
            })
            console.log(res.data.data.length)
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
    } else if (that.data.current == 1){
      wx.request({
        url: requestIP + '/teacher/getSignBefore',
        data: {
          classid: "c866bf76b4ef11e8ab8e00163e00299d"
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            console.log(res.data.data)
            console.log(res.data)
          } else {
            console.log("请求失败");
          }
        },
      })
    }
    else if (that.data.current == 2) {
      wx.request({
        url: requestIP + '/user/getDiscussInfo',
        data: {
          classid: "c866bf76b4ef11e8ab8e00163e00299d"
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            console.log(res.data.data)
            console.log(res.data)
          } 
          else if (res.data.resultCode == "204"){
            that.setData({
              chat: [],
              Isclassspace: "block"
            })
          }
          else {
            console.log("请求失败");
          }
        },
      })
    }
    else if (that.data.current == 3) {
      wx.request({
        url: requestIP + '/user/getNotice',
        data: {
          classid: "c866bf76b4ef11e8ab8e00163e00299d"
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'openid': app.globalData.openid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              notice: []
            })
            console.log(res.data.data.length)
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
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  }
})