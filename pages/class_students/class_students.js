// pages/class_students/class_students.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    mate: {
      type: "Array",
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    "imgUrl": "/image/headphoto.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tel: function (e) {
      var tel = e.currentTarget.dataset.tel
      console.log(tel)
      wx.makePhoneCall({
        phoneNumber: tel,
      })
    }
  },

  ready: function () {
  }
})




