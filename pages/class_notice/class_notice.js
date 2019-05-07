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
    Isnoticespace: {
      type: "String",
      value: "",
    },
    classid: {
      type: "String",
      value: ""
    },
    current: {
      type: "String",
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "edit": "/image/edit.png",
    "space":"/image/space.png",
    "no_id": "",
    imgUrl:"/image/photo.png",
    userstatus:"",
    userid: app.globalData.userid
  },

  /**
   * 组件的方法列表
   */
  methods: {
    editnotice: function (e) {   
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
                'userid': app.globalData.userid
              },// 设置请求的 header
              success: function (res) {
                if (res.data.resultCode == "101") {
                  wx.showLoading();
                  wx.hideLoading();
                  setTimeout(() => {
                    wx.showToast({
                      title: '删除成功',
                      icon: "success",
                    });
                    setTimeout(() => {
                      wx.hideToast();
                    }, 2000)
                  }, 0);
                  wx.request({
                    url: requestIP + '/user/getNotice',
                    data: {
                      classid: that.data.classid
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                      'userid': app.globalData.userid
                    },// 设置请求的 header
                    success: function (res) {
                      if (res.data.resultCode == "101") {
                        that.setData({
                          notice: []
                        })
                        for (var i = 0, len = res.data.data.length; i < len; i++) {
                          that.data.notice[i] = res.data.data[i]
                        }
                        that.setData({
                          notice: that.data.notice
                        })
                      }
                      else if (res.data.resultCode == "204") {
                        that.setData({
                          notice: [],
                          Isnoticespace: "block"
                        })
                      }
                      else {
                        wx.showToast({
                          title: '请求失败',
                          icon: 'none',
                        });
                      }
                    },
                  })
                } else {
                  wx.showToast({
                    title: '请求失败',
                    icon: 'none',
                  });
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
    var that = this
    that.setData({
      userstatus: app.globalData.userstatus,
      userid:app.globalData.userid
    }) 
  }
})


