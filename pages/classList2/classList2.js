Page({
  data: {
  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },
  handleCancel1() {
    this.setData({
      visible1: false
    });
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
  GOclass_signUp: function (e) {
    wx.navigateTo({
      url: '../class_signUp/class_signUp',
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
  }

})