Page({
  data: {
    visible1: false,
    actions1: [
      {
        name: '张先生 15171809954',
      },
      {
        icon: 'mobilephone',
        name: ' 电话预约',
      }
    ],
    actions2: [
      {
        name: '删除',
        color: '#ed3f14'
      }
    ]

  },

  handleClickItem1({ detail }) {
    const index = detail.index + 1;
    if (index == 2) {
      wx.makePhoneCall({
        phoneNumber: '15171809954'
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