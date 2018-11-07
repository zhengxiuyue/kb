var app = getApp();

// 引入SDK核心类
var QQMapWX = require('../../dist/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    city:'',
    windowHeight: null,
    multiArray: [['湖北省', '湖南省'], ['宜昌市', '长沙市'], ['枝江市', '株洲区'], ['A校区', 'B校区', 'C校区']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '湖北省'
        },
        {
          id: 1,
          name: '湖南省'
        }
      ],
      [
        {
          id: 0,
          name: '宜昌市'
        },
        {
          id: 1,
          name: '长沙市'
        }
      ],
      [
        {
          id: 0,
          name: '枝江市'
        },
        {
          id: 1,
          name: '株洲区'
        }
      ]
      [
      {
        id: 0,
        name: 'A校区'
      },
      {
        id: 1,
        name: 'B校区'
      },
      {
        id: 2,
        name: 'C校区'
      }
      ]
    ],
    multiIndex: [0, 0, 0, 0]
  },
  changeCity: function (e) {
    console.log(e);
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
  bindMultiPickerChange: function (e) {
    console.log('发送选择改变，携带值为', e.detail.value[1]);
    var that = this;
   // console.log(that.data.multiArray[1][e.detail.value[1]]);
    that.changeCity(that.data.multiArray[1][e.detail.value[1]]);
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
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  /**
 * 生命周期函数--监听页面加载
 */  
  onLoad: function (options) {
    var that = this;
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
            that.changeCity(res.result.address_component.city);
            console.log(res.result);
            that.setData({ address: res.result.address })
            wx.showToast({
              title: `当前位置： ` + that.data.address,
              icon: 'none'
            });
          }
        });
      },
      fail(res) {
        wx.showToast({
          title: '无法获取当前位置',
          icon: 'none'
        });
        that.changeCity('北京市');
      }
    })
  }
})
