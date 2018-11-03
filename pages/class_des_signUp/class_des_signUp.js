// pages/class_des/class_des.js
Page({
  GOclass_signUp:function(e)
  {
    wx.navigateTo({
      url: '../class_signUp/class_signUp',
    })
  },
  call:function(e){
    wx.makePhoneCall({
      phoneNumber: '15171809954',
    })
  },
  //获取手机号码
  telInput: function (event) {
    this.setData({ tel: event.detail.value })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '快乐50课表',
      path: 'pages/class_des/class_des',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }
})