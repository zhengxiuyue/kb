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
    "imgUrl": "/image/headphoto.png",
    search:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    SearchInput:function(e){
      this.setData({
        search:e.detail.value
      })
    },
    tel: function (e) {
      var tel = e.currentTarget.dataset.tel
      console.log(tel)
      wx.makePhoneCall({
        phoneNumber: tel,
      })
    },
    search: function(e){
      let that = this;
      var requestIP = app.globalData.requestIP
      wx.request({
        url: requestIP + '/user/searchStudent',
        data: {
          classid: "a357296ab67811e8ab8e00163e00299d",
          search: that.data.search
        },
        success: function (result) {
          console.log('request success', result)
        }
      })

    }
  },

  ready: function () {
  }
})




