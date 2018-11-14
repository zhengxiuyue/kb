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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "edit": "/image/edit.png",
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
      wx.showModal({
        title: '提示',
        content: '确定要删除本条通知吗？',
        success: function (sm) {
          if (sm.confirm) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
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


