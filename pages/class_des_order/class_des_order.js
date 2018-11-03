// pages/class_des/class_des.js
Page({
  data: {
    visible1: false,
    actions1: [
      {
        name: '陈良华 1767260413',
      },
      {
        icon: 'mobilephone',
        name: ' 电话预约',
      }
    ]
  },
  handleClickItem1({ detail }) {
    const index = detail.index + 1;
    if (index == 2) {
      wx.makePhoneCall({
        phoneNumber: '1767260413'
        // ,fail: tips("电话预约失败")
      });
    }
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
  }
})