// pages/xiuyue/xiuyue.js
Component({
  /**
   * 组件的属性列表
   */

  properties: {
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
    time: "2018年10月6号",
    content: "原11月12日模特课取消！原11月12日模特课改为11月13号同一时间同一地点上课！原11月12日模特课改为11月13号同一时间同一地点上课！",
    title: "课堂延迟通知",
    teacher: "赵雅涵老师",
    "display":"none"
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


