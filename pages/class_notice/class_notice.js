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
    items: {
      type: "Array",
      vaule:""
    },
    userstatus: {
      type: "Number",
      value: "",
    },
    Isnoticespace: {
      type: "String",
      value: "",
    },
    classid: {
      type: "String",
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    "edit": "/image/edit.png",
    "space":"/image/space.png",
    "no_id": ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData() {

      console.log("刷新数据")
      this.setData({
        notice: 1
      })
    },
    edit: function (e) {   
      var that = this
      var classid = that.data.classid
      var level = that.data.items.level
      var coursename = that.data.items.coursename
      wx.navigateTo({
        url: '/pages/class_notice_edit/class_notice_edit?classid=' + classid+'&level=' + level + '&coursename=' + coursename,
      })
    },
    delt: function (e) {
      let that = this;
      var requestIP = app.globalData.requestIP
      var no_id = e.currentTarget.dataset.no_id
      that.setData({
        no_id: no_id
      })
      wx.showModal({
        title: '提示',
        content: '确定要删除本条通知吗？',
        success: function (sm) {
          if (sm.confirm) {
            wx.request({
              url: requestIP + '/teacher/deleteNotice',
              data: {
                noticeid: that.data.no_id,
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
                  that.getData();
                } else {
                  console.log("请求失败");
                }
              }
            })
          
            // 重新发请求刷新数据
          } else if (sm.cancel) { }
        }
      })
    },
    gonotice: function(e){
      var that=this
      var classid = that.data.classid   
      wx.navigateTo({
        url: '/pages/class_notice_edit/class_notice_edit?classid=' + classid,
      })
    },
 
  },

  ready: function () {
    console.log('ready')
    this.getData();
  }
})


