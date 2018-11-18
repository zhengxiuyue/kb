// pages/class_des/class_des.js
Page({
  data: {
    courseid:null,
    visible1: false,
    order_phonenumber:null,
    actions1: [
      {
        name: "",
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
        phoneNumber: this.data.order_phonenumber
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
  },
  onLoad: function (options) {
    var courseid = wx.getStorageSync("courseid")
    console.log(courseid);
  }
})