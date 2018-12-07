// 引入SDK核心类
var QQMapWX = require('../../dist/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
var requestIP = app.globalData.requestIP;

Page({
  data: {
    city: app.globalData.city,
    storename: app.globalData.storename,
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
    multiIndex: [0, 0, 0, 0]
  },

  tips(info) {
    $Message({
      content: info
    });
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
  GOclassList1: function (e) {
    var that = this;
   // console.log("更多页面的"+that.data.storeid);
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
    console.log(index);
    var classList_order = this.data.classList_order;
    var classid = classList_order[index].classid;
    var res_status = classList_order[index].res_status;
    wx.setStorageSync("classid", classid);
    app.globalData.res_status = res_status;
    wx.navigateTo({
      url: '../class_des_order/class_des_order',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    app.globalData.storename = that.data.array[e.detail.value];
    app.globalData.storeid = that.data.storeidList[e.detail.value];
    that.setData({
      storeid: app.globalData.storeid,
      storename: app.globalData.storename
    })
    that.getClassList_signUp();
    that.getClassList_order();
  },
  bindRegionChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value);
    var that = this;
    app.globalData.province = e.detail.value[0];
    app.globalData.areaname = e.detail.value[2];
    app.globalData.city = e.detail.value[1];
    that.setData({
      city: app.globalData.city,
    })
    that.getRecentStore();

  },
  onLoad: function (options) {
    var that = this;
    app.editTabBar();
    console.log("already" + app.globalData.alreadyFlag);
    if (app.globalData.alreadyFlag == '0')
    {
    that.getLocation();
    that.setData({
      city: app.globalData.city,
      storename: app.globalData.storename
    })
    app.globalData.alreadyFlag = "1";
    }else{
      that.setData({
        city: app.globalData.city,
        storename: app.globalData.storename
      })
      console.log("此时的"+that.data.storename);
      that.getRecentStoreList();
    }
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
  },

  //获取当前定位
    getLocation: function (e) {
    console.log("执行了获取地理位置");
    var that = this;
    wx.getLocation({  //获取当前地址
      success: function (res) {
        var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180
        //根据经纬度获取所在城市
        qqmapsdk = new QQMapWX({
          key: 'S3LBZ-7NFWX-YVU4W-7JY7T-MEV6J-SKBF5'
        });
        qqmapsdk.reverseGeocoder({
          location: { latitude: latitude, longitude: longitude },
          success: function (res) {
            //address 城市
            // console.log(res.result);
            that.setData({ address: res.result.address })
            wx.showToast({
              title: `当前位置： ` + that.data.address,
              icon: 'none'
            });
            app.globalData.province = res.result.address_component.province;
            app.globalData.areaname = res.result.address_component.district;
            app.globalData.city = res.result.address_component.city;
            that.setData({
              city: app.globalData.city,
            })
            that.getRecentStore();
          }
        });
      },
      fail(res) {
        wx.showToast({
          title: '无法获取当前位置',
          icon: 'none'
        });
        app.globalData.province = "北京市";
        app.globalData.areaname = "东城区";
        app.globalData.city = "北京市";
        that.setData({
          city: app.globalData.city
        })
        that.getRecentStore();
      }
    })
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
          console.log("有多少可报名" + res.data.data[0].classid);
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
            console.log("有多少可预约" + res.data.data[0].res_status);
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

  getRecentStore:function(e){
    //获取当前定位下的门店   
    var that = this;        
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
         var storeidList =  [];
         for(var i = 0;i<res.data.data.length;i++){
          // console.log(res.data.data[i].storename);
           storeList.push(res.data.data[i].storename);
           storeidList.push(res.data.data[i].areaid);
          }
          that.setData({
            array: storeList,
            storeidList: storeidList
          });
          app.globalData.storename = res.data.data[0].storename;
          app.globalData.storeid = res.data.data[0].areaid;
          that.setData({
            storename: app.globalData.storename
          })
          that.getClassList_signUp();
          that.getClassList_order();
        }
        else {
          app.globalData.storename = "暂无门店";
          that.setData({
            storename: app.globalData.storename
          });
          app.globalData.storeid = "";
          that.getClassList_signUp();
          that.getClassList_order();
          that.setData({
            array:['暂无门店']
          });
        }
      },
      fail(res) {
        app.globalData.storename = "暂无门店";
        that.setData({
          storename: app.globalData.storename
        });
        app.globalData.storeid = "";
        that.getClassList_signUp();
        that.getClassList_order();
        that.setData({
          array: ['暂无门店']
        });
      }
    });
  },

  getRecentStoreList: function (e) {
    //获取当前定位下的门店   
    var that = this;
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
            // console.log(res.data.data[i].storename);
            storeList.push(res.data.data[i].storename);
            storeidList.push(res.data.data[i].areaid);
          }
          that.setData({
            array: storeList,
            storeidList: storeidList
          });
          that.getClassList_signUp();
          that.getClassList_order();
        }
        else {
          app.globalData.storename = "暂无门店";
          that.setData({
            storename: app.globalData.storename
          });
          app.globalData.storeid = "";
          that.getClassList_signUp();
          that.getClassList_order();
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
        app.globalData.storeid = "";
        that.getClassList_signUp();
        that.getClassList_order();
        that.setData({
          array: ['暂无门店']
        });
      }
    });
  }
})
