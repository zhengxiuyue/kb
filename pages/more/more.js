
// 引入SDK核心类
var QQMapWX = require('../../dist/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
var requestIP = app.globalData.requestIP;

Page({
  data: {
    array: ['王府井'],
    storeidList: ['4fda538b94cb11e880090063e0299d'],
    index: 0,
    region: ['北京市', '北京市', '东城区'],
    province:"",//省
    areaname:"",//区
    errortips:'',
    error_noClassOrder:'none',
    error_noClassSignUp:'none',
    classList_signUp:null,//可报名课程列表
    classList_order:null,//可预约课程
    city:'',//市
    storename:"",
    storeid:'',
    windowHeight: null,
    multiArray: [[], [], [], []],
    multiIndex: [0, 0, 0, 0]
  },

  changeCity: function (e) {
    //console.log(e);
    this.setData({
      city: e
     })
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
    console.log("更多页面的"+that.data.storeid);
    wx.setStorageSync("storeid", that.data.storeid);
    wx.navigateTo({
      url: '../classList_order/classList_order',
    })
  },
  GOclassList2: function (e) {
    var that = this;
    wx.setStorageSync("storeid", that.data.storeid);
    wx.navigateTo({
      url: '../classList_signUp/classList_signUp',
    })
  },
  GOclass_des1: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var classList_order = this.data.classList_order;
    var classid = classList_order[index].classid;
    wx.setStorageSync("classid", classid);
    wx.navigateTo({
      url: '../class_des_order/class_des_order',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    this.setData({
      storeid: that.data.storeidList[e.detail.value],
      storename: that.data.array[e.detail.value]
    });
    that.getClassList_signUp();
    that.getClassList_order();
  },
  bindRegionChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value);
    var that = this;
    that.setData({
      province: e.detail.value[0],
      city: e.detail.value[1],
      areaname: e.detail.value[2]
  });
  that.getRecentStore();

  },/*
  //多列选择器
  bindMultiPickerChange: function (e) {
   // console.log('发送选择改变，携带值为', e.detail.value[1]);
    var that = this;
   // console.log(that.data.multiArray[1][e.detail.value[1]]);
    that.changeCity(that.data.multiArray[1][e.detail.value[1]]);
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
   // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['宜昌市'];
            data.multiArray[2] = ['枝江市'];
            data.multiArray[3] = ['A校区', 'B校区', 'C校区'];
            break;
          case 1:
            data.multiArray[1] = ['长沙市'];
            data.multiArray[2] = ['株洲区'];
            data.multiArray[3] = ['A校区', 'B校区', 'C校区'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        data.multiIndex[3] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['枝江市'];
                data.multiArray[3] = ['A校区', 'B校区', 'C校区'];
                break;
              case 1:
                data.multiArray[2] = ['株洲区'];
                data.multiArray[3] = ['A校区', 'B校区', 'C校区'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        data.multiIndex[3] = 0;
       // console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },*/

  /**
 * 生命周期函数--监听页面加载
 */  
  onLoad: function (options) {
    var that = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();    //选择id    
    var that = this;
    query.select('.page').boundingClientRect(function (rect) {      // 
      //console.log(rect.height)
      that.setData({
        windowHeight: rect.height + 45 + 'px'
      })
    }).exec();
    app.editTabBar();

    this.getLocation();
  },

  onPullDownRefresh: function () {
    this.getClassList_signUp();
    this.getClassList_order();
  },

  //获取当前定位
    getLocation: function (e) {
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
            that.setData({
              province: res.result.address_component.province,
              city: res.result.address_component.city,
              areaname: res.result.address_component.district
            });
            that.getRecentStore();
          }
        });
      },
      fail(res) {
        wx.showToast({
          title: '无法获取当前位置',
          icon: 'none'
        });
        that.setData({
          province: "北京市",
          city:"北京市",
          areaname:"东城区"
        })
        that.getRecentStore();
      }
    })
  },

  //获取当前门店下的可报名课程
  getClassList_signUp:function(e){
    var that = this;
    console.log("storeid" + that.data.storeid);
    wx.request({
      url: requestIP+'/student/getClassEnter',
      data: {
       storeid: that.data.storeid
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
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
      wx.request({
        url: requestIP+'/student/getClassAppointment',
        data: {
          storeid: that.data.storeid
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
            console.log(that.data.classList_order[0]);
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
        province: that.data.province,
        city: that.data.city,
        areaname: that.data.areaname
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
           console.log(res.data.data[i].storename);
           storeList.push(res.data.data[i].storename);
           storeidList.push(res.data.data[i].areaid);
          }
          that.setData({
            storename: res.data.data[0].storename,
            storeid: res.data.data[0].areaid,
            array: storeList,
            storeidList: storeidList
          });
          that.getClassList_signUp();
          that.getClassList_order();
        }
        else {
          that.setData({
            storename: null,
            storeid: null,
          });
          that.getClassList_signUp();
          that.getClassList_order();
          that.setData({
            storename: "暂无门店",
            array:['暂无门店']
          });
        }
      },
      fail(res) {
        that.setData({
          storename: null,
          storeid: null,
        });
        that.getClassList_signUp();
        that.getClassList_order();
        that.setData({
          storename: "暂无门店",
          array:['暂无门店']
        });
      }
    });
  }
})
