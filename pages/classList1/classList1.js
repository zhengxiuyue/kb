Page({
  data: {
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
      url: '../class_des/class_des',
    })
  },
  GOclassList1: function (e) {
    wx.navigateTo({
      url: '../classList1/classList1',
    })
  },
  GOclassList2: function (e) {
    wx.navigateTo({
      url: '../classList2/classList2',
    })
  },
  GOclass_des1: function (e) {
    wx.navigateTo({
      url: '../class_des1/class_des1',
    })
  }
})