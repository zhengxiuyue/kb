// pages/order_store_des/order_store_des.js
const { $Message } = require('../../dist/base/index');
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ares_status:null,
    aresid:null,
    order_status:0,
    storeMes:"",
    aresname:"",
    aresmobile:"",
    aresmessage:"无",
    date:"",
    visible5: false,
    visible6: false,
    visible7: false,    
    actions5: [
      {
        name: '取消'
      },
      {
        name: '处理',
        color: '#ed3f14',
        loading: false
      }
    ],
    actions6: [
      {
        name: '取消'
      },
      {
        name: '忽略',
        color: '#ed3f14',
        loading: false
      }
    ],
    actions7: [
      {
        name: '取消'
      },
      {
        name: '确认',
        color: '#ed3f14',
        loading: false
      }
    ]
  },

  handleOpen5() {
    this.setData({
      visible5: true
    });
  },

  handleOpen6() {
    this.setData({
      visible6: true
    });
  },

  handleOpen7() {
    this.setData({
      visible7: true
    });
  },

  handleClick5({ detail }) {
    this.setData({
      visible5: false
    });
    if (detail.index === 0) {
      this.setData({
        visible5: false
      });
    } else {

      var that = this;
      wx.request({
        url: requestIP + '/assistant/handleAreaReservation',
        data: {
          aresid: that.data.aresid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'userid': app.globalData.userid
        },
        success(res) {
          console.log(res.data.data);
          if (res.data.resultCode == '101') {
            wx.setStorageSync("order_status", 1)
              $Message({
                content: '操作成功！'
              });
            setTimeout(function () {
              //跳到页面
              wx.redirectTo({
                url: '/pages/order/order',
              })
            }, 2000)
          }
          else {
              $Message({
                content: '操作失败！',
                type: 'error'
              });
          }
        },
        fail(res) {
            $Message({
              content: '操作失败！',
              type: 'error'
            });
        }
      })

    }
  },

  handleClick6({ detail }) {
    this.setData({
      visible6: false
    });
    if (detail.index === 0) {
      this.setData({
        visible6: false
      });
    } else {

      var that = this;
      wx.request({
        url: requestIP + '/assistant/cancelAreaReservation',
        data: {
          aresid: that.data.aresid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'userid': app.globalData.userid
        },
        success(res) {
          console.log(res.data.data);
          if (res.data.resultCode == '101') {

              $Message({
                content: '操作成功！'
              });

          setTimeout(function () {
          //跳到更多页面
         wx.redirectTo({
           url: '/pages/order/order',
           })
          }, 2000)

          }
          else {
              $Message({
                content: '操作失败！',
                type: 'error'
              });
          }
        },
        fail(res) {
            $Message({
              content: '操作失败！',
              type: 'error'
            });
        }
      })

    }
  },

  handleClick7({ detail }) {
    this.setData({
      visible7: false
    });
    if (detail.index === 0) {
      this.setData({
        visible7: false
      });
    } else {

      var that = this;
      wx.request({
        url: requestIP + '/assistant/confirmAreaReservation',
        data: {
          aresid: that.data.aresid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'userid': app.globalData.userid
        },
        success(res) {
          console.log(res.data.data);
          if (res.data.resultCode == '101') {


            $Message({
              content: '操作成功！'
            });

            setTimeout(function () {
              //跳到更多页面
              wx.setStorageSync("order_status", 1)
              wx.redirectTo({
                url: '/pages/order/order',
              })
            }, 2000)

          }
          else {
            $Message({
              content: '操作失败！',
              type: 'error'
            });
          }
        },
        fail(res) {
          $Message({
            content: '操作失败！',
            type: 'error'
          });
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var aresid= that.options.aresid;
    var order_status = that.options.order_status;
    var ares_status = that.options.ares_status;
    that.setData({
      aresid: aresid,
      order_status: order_status,
      ares_status: ares_status
    })
    console.log("ares_status" + that.data.ares_status);
    that.getAreaReservationDetail();
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
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    var that = this;
    that.getAreaReservationDetail();
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
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
    }
  },

  //处理


  //忽略

//获取预约信息
  getAreaReservationDetail:function(e){
    var that = this;
    var aresid = that.data.aresid;
    wx.request({
      url: requestIP + '/assistant/getAreaReservationDetail',
      data: {
        aresid: aresid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
        if (res.data.resultCode == '101') {
          var storeMes = res.data.data.province + res.data.data.city + res.data.data.areaname + res.data.data.location;
          var date = res.data.data.dateString + " " + res.data.data.dateTime
          that.setData({
            storeMes: storeMes,
            date: date,
            aresname: res.data.data.ares_name,
            aresmobile: res.data.data.ares_mobile,
          });
          if (res.data.data.ares_message)
          {
            that.setData({
              aresmessage: res.data.data.ares_message
            })
          }
        }
      },
      fail(res) {

      }
    })
  },

  call:function(e){
    var that = this;
    var phonenumber = that.data.aresmobile;
    wx.makePhoneCall({
      phoneNumber: phonenumber
    })
  }
})