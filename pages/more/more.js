var app = getApp();

// 引入SDK核心类
var QQMapWX = require('../../dist/qqmap-wx-jssdk.min.js');
var qqmapsdk;
 
Page({
  data: {
    windowHeight:null,
    multiArray: [['北京', '上海', '长沙', '武汉'], ['全部', '北京A校区', '北京B校区', '北京C校区']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '北京'
        },
        {
          id: 1,
          name: '上海'
        },
        {
          id: 2,
          name: '长沙'
        },
        {
          id: 3,
          name: '武汉'
        }
      ], [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: '北京A校区'
        },
        {
          id: 2,
          name: '北京B校区'
        },
        {
          id: 3,
          name: '北京C校区'
        }
      ]
    ],
    multiIndex: [0, 0],
    visible1: false,
    actions1: [
      {
        name: '张先生 15171809954',
      },
      {
        icon: 'mobilephone',
        name: ' 电话预约',
      }
    ]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['全部', '北京A校区', '北京B校区', '北京C校区'];
            break;
          case 1:
            data.multiArray[1] = ['全部', '上海A校区', '上海B校区', '上海C校区'];
            break;
          case 2:
            data.multiArray[1] = ['全部', '长沙A校区', '长沙B校区', '长沙C校区'];
            break;
          case 3:
            data.multiArray[1] = ['全部', '武汉A校区', '武汉B校区', '武汉C校区'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  tips(info) {
    $Message({
      content: info
    });
  },
  GOclass_des: function (e) {
    wx.navigateTo({
      url: '../class_des_signUp/class_des_signUp',
    })
  },
  GOclassList1: function (e) {
    wx.navigateTo({
      url: '../classList_order/classList_order',
    })
  },
  GOclassList2: function (e) {
    wx.navigateTo({
      url: '../classList_signUp/classList_signUp',
    })
  },
  onLoad: function (options) {
    app.editTabBar();
  },
  GOclass_des1: function (e) {
    wx.navigateTo({
      url: '../class_des_order/class_des_order',
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
<<<<<<< HEAD
    var that = this;
=======
>>>>>>> fc3f4396b6a75b307eb74029ab95fc149f355a39
    //创建节点选择器
    var query = wx.createSelectorQuery();    //选择id    
    var that = this;
    query.select('.page').boundingClientRect(function (rect) {      // 
      console.log(rect.height)
      that.setData({
        windowHeight: rect.height + 45 + 'px'
      })
    }).exec();
    app.editTabBar();
   wx.getLocation({
     success: function(res) {
       const latitude = res.latitude
       const longitude = res.longitude
       const speed = res.speed
       const accuracy = res.accuracy
       console.log(res);
       qqmapsdk = new QQMapWX({
         key: 'S3LBZ-7NFWX-YVU4W-7JY7T-MEV6J-SKBF5'
       }); 
       wx.getLocation({  //获取当前地址
         success: function (res) {
           var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
           var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180
           //根据经纬度获取所在城市
           qqmapsdk.reverseGeocoder({
             location: { latitude: latitude, longitude: longitude },
             success: function (res) {
               //address 城市
               that.setData({ address: res.result.address_component.city })
               wx.showToast({
                 title: `当前位置： ` + that.data.address,
                 icon: 'none'
               });
             }
           });
         }
       })
     }
   })
  }
})
