var app = getApp();
var requestIP = app.globalData.requestIP;

Page({
  data: {
    city: app.globalData.city,
    storename: app.globalData.storename,
    storeid: app.globalData.storeid,
    array: ['王府井'],
    storeidList: ['4fda538b94cb11e880090063e0299d'],
    index: 0,
    region: ['北京市', '北京市', '东城区'],
    errortips:'',
    error_noClassOrder:'none',
    error_noClassSignUp:'none',
    classList_signUp:null,//可报名课程列表
    classList_order:null,//可预约课程
    windowHeight: null,
    multiArray: [[], [], [], []],
    multiIndex: [0, 0, 0, 0],
    flag:0,
    orderStoreStatus:null//门店预约状态
  },

  tips(info) {
    $Message({
      content: info
    });
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
  GOclassList1: function (e) {
    var that = this;
    wx.setStorageSync("storeid", app.globalData.storeid);
    wx.navigateTo({
      url: '../classList_order/classList_order',
    })
  },
  GOclassList2: function (e) {
    var that = this;
    wx.setStorageSync("storeid", app.globalData.storeid);
    wx.navigateTo({
      url: '../classList_signUp/classList_signUp',
    })
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
  bindPickerChange: function (e) {
    var that = this;
    app.globalData.storename = that.data.array[e.detail.value];
    app.globalData.storeid = that.data.storeidList[e.detail.value];
    that.setData({
      storeid: app.globalData.storeid,
      storename: app.globalData.storename
    })
    that.getClassList_signUp();
    that.getClassList_order();
    that.IfOrder();
  },
  bindRegionChange: function (e) {
    var that = this;
    app.globalData.province = e.detail.value[0];
    app.globalData.areaname = e.detail.value[2];
    app.globalData.city = e.detail.value[1];
    that.setData({
      city: app.globalData.city,
      flag:1
    })
    that.getRecentStoreList();
  },
  onLoad: function (options) {
    var that = this;
    app.editTabBar();
    that.getRecentStoreList();
    that.IfOrder();
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    this.getClassList_signUp();
    this.getClassList_order();
    this.IfOrder();
  },
  
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },

  //获取当前门店下的可报名课程
  getClassList_signUp:function(e){
    var that = this;
   // console.log("storeid" + that.data.storeid);
    wx.request({
      url: requestIP+'/student/getClassEnter',
      data: {
        storeid: app.globalData.storeid
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode=='101'){
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

  //获取当前门店下的可预约课程
    getClassList_order: function (e) {
      var that = this;
      console.log(app.globalData.storeid);
      wx.request({
        url: requestIP+'/student/getClassAppointment',
        data: {
          storeid: app.globalData.storeid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'userid': app.globalData.userid
        },
        success(res) {
          if (res.data.resultCode == '101') {
            that.setData({
              classList_order: res.data.data
            });
            that.setData({
              error_noClassOrder: "none"
            });
          }
          else{
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
        fail(res){
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

  getRecentStoreList: function (e) {
    //获取当前选择下的门店列表
    var that = this;
    that.setData({
      city: app.globalData.city
    })
    if (app.globalData.storename){
      that.setData({
        storename: app.globalData.storename,
        storeid: app.globalData.storeid
      })
    }
    wx.request({
      url: requestIP + '/student/getRecentStore',
      data: {
        province: app.globalData.province,
        city: app.globalData.city,
        areaname: app.globalData.areaname
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          console.log(res.data.data);
          var storeList = [];
          var storeidList = [];
          for (var i = 0; i < res.data.data.length; i++) {
            storeList.push(res.data.data[i].storename);
            storeidList.push(res.data.data[i].areaid);
          }
          if (!app.globalData.storename||that.data.flag == 1){
            app.globalData.storename = res.data.data[0].storename;
            app.globalData.storeid = res.data.data[0].areaid;
          }
          that.setData({
            array: storeList,
            storeidList: storeidList,
            storename: app.globalData.storename,
            storeid: app.globalData.storeid
          });
          that.getClassList_signUp();
          that.getClassList_order();
          that.IfOrder();
        }
        else {
          app.globalData.storename = "暂无门店";
          that.setData({
            storename: app.globalData.storename
          });
          app.globalData.storeid = null;
          that.setData({
            storeid: app.globalData.storeid
          })
          that.getClassList_signUp();
          that.getClassList_order();
          that.IfOrder();
          that.setData({
            array: ['暂无门店']
          });
        }
      },
      fail(res) {
        app.globalData.storename = "暂无门店";
        that.setData({
          storename: app.globalData.storename
        });
        app.globalData.storeid = null;
        that.setData({
          storeid: app.globalData.storeid
        })
        that.getClassList_signUp();
        that.getClassList_order();
        that.IfOrder();
        that.setData({
          array: ['暂无门店']
        });
      }
    });
  },

  GoorderStore:function(e){
    var that = this;
    wx.setStorageSync("storeid", app.globalData.storeid);
    wx.navigateTo({
      url: '../store_order/store_order',
    })
  },

//判断给门店是否可预约
  IfOrder:function(e){
    var that = this;
    var storeid = that.data.storeid;
    if (storeid)
    {
    wx.request({
      url: requestIP + '/student/getStoreStatus',
      data: {
        storeid: storeid
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
            orderStoreStatus: res.data.data
          });
        }
      },
      fail(res) {
      }
    })
    }else{
      that.setData({
        orderStoreStatus: 2
      });
    }
  }

})
