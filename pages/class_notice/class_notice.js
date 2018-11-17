// pages/class_notice/class_notice.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    notice: {
      type: "Array",
      value: "",
    },
    userstatus: {
      type: "Number",
      value: "",
    },
    Isnoticespace: {
      type: "String",
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "edit": "/image/edit.png",
    "space":"/image/space.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    edit: function () {   
      wx.navigateTo({
        url: '/pages/class_notice_edit/class_notice_edit',
      })
    },
    delt: function (e) {
      let that = this;
      var requestIP = app.globalData.requestIP
      wx.showModal({
        title: '提示',
        content: '确定要删除本条通知吗？',
        success: function (sm) {
          if (sm.confirm) {
            wx.request({
              url: requestIP + '/teacher/deleteNotice',
              data: {
                noticeid: "6",
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'openid': app.globalData.openid
              },// 设置请求的 header
              success: function (res) {
                if (res.data.resultCode == "101") {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                } else {
                  console.log("请求失败");
                }
              }
            })
          
            // 重新发请求刷新数据
          } else if (sm.cancel) { }
        }
      })
    }
  },

  ready: function () {
   
  }
})


