// pages/mine/mine.js
var app = getApp();
var requestIP = app.globalData.requestIP
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    nickName:"",
    avatarUrl:"",
    item: [],//定义变长数组课堂信息
    Isclassspace:"none",
    userstatus:"",
    orderList: null,//预约列表
    activity:[],//已报名活动
    Isclassspace1: "none",
    orderListClass:null,
    Isclassspace2:"none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    //page高度加高
    //创建节点选择器
    // var query = wx.createSelectorQuery();    //选择id    
    var that = this;
    if(that.options.current)
    {
      that.setData({
        current: that.options.current
      })
    }

    var userstatus = app.globalData.userstatus
    
    wx.getStorage({
      key: "user",
      success(res){
        that.setData({
          avatarUrl: wx.getStorageSync('avatarUrl'),
          userstatus: userstatus,
          nickName: wx.getStorageSync('nickName'),
        })        
      }
    })
   
    wx.request({
      url: requestIP + '/student/getMyClass',
      data: {
        state: this.data.current
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          that.setData({
            item: [],
            Isclassspace: "none"
          })
          for (var i = 0, len = res.data.data.length; i < len; i++) 
          { 
            that.data.item[i] = res.data.data[i]
          } 
          that.setData({ 
            item: that.data.item
          })
        } 
        else if (res.data.resultCode == "204") {
          that.setData({
            item: [],
            Isclassspace:"block"
          })
        } 
        else {
          wx.showToast({
            title: '请求失败',
            icon: 'none',
          });
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
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/mine/mine?shareStatus=' + shareStatus
    }
  },

  changeTab(e) {
    let index = parseInt(e.currentTarget.dataset.index || 0)
    let that = this
    this.setData({
      current: index,
      Isclassspace: "none",
      item: []
    })
    if (that.data.current == 0 || that.data.current == 1){
      wx.request({
        url: requestIP + '/student/getMyClass',
        data: {
          state: this.data.current
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            for (var i = 0, len = res.data.data.length; i < len; i++) {
              that.data.item[i] = res.data.data[i]
            }
            that.setData({
              item: that.data.item
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              Isclassspace: "block"
            })
          }
          else {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
      })
    } 
    //已报名活动
    else if (that.data.current == 3) {
      wx.request({
        url: requestIP + '/activity/getMyActivity',
        data: {
          
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            that.setData({
              activity: res.data.data
            })
          }
          else if (res.data.resultCode == "204") {
            that.setData({
              Isclassspace: "block"
            })
          }
          else {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
      })
    } 
    else {
      wx.request({
        url: requestIP + '/student/getMySchedule',
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
              orderList: res.data.data,
              Isclassspace1:'none'
            });
  
          } else {
            that.setData({
              orderList: "",
              Isclassspace1: 'block'
            });
          }
        },
        fail(res) {
          that.setData({
            orderList: "",
            Isclassspace1: 'block'
          });
        }
      })
      that.getAreaReservation();
    }  
    
  },
  dropDown:function(e){
    wx.navigateTo({
      url: '/pages/mine_setup/mine_setup',
    })
  },
  getAreaReservation:function(){
    var that = this;
    wx.request({
      url: requestIP + '/student/getAreaReservation',
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
            orderListClass: res.data.data,
            Isclassspace2: 'none'
          });

        } else {
          that.setData({
            orderListClass: "",
            Isclassspace2: 'block'
          });
        }
      },
      fail(res) {
        that.setData({
          orderListClass: "",
          Isclassspace2: 'block'
        });
      }
    })
  }
})




