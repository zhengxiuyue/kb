// pages/class_chat/class_chat.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    chat: {
      type: "Array",
      value: "",
    },
    userstatus: {
      type: "Number",
      value: "",
    },
    Ischatspace: {
      type: "String",
      value: "",
    }, 
    classid: {
      type: "String",
      value: "",
    }, 
    items: {
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
    "imgUrl": "/image/photo.png",
    "like": "/image/like.png",
    "dislike": "/image/dislike.png",
    "comment": "/image/comment.png",
    "edit": "/image/edit.png",
    "islike": 0,
    "comment_num": "3",/////
    "color": 0,
    "space":"/image/space.png",
    "Isdelete":"block",
    dis_id:null,
    userid:app.globalData.userid
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //发布评论
    edit: function (e) {      
      var that = this
      var classid = that.data.classid
      var level = that.data.items.level
      var coursename = that.data.items.coursename
      wx.navigateTo({
        url: '/pages/class_chat_edit/class_chat_edit?classid=' + classid + '&level=' + level + '&coursename=' + coursename,
      })
    },

    comment: function (e) {
      //获取该评论的id
      var dis_id = e.currentTarget.dataset.dis_id
      var dis_time = e.currentTarget.dataset.dis_time
      var content = e.currentTarget.dataset.content
      var name = e.currentTarget.dataset.name
      var protrait = e.currentTarget.dataset.protrait
      wx.navigateTo({
        url: '/pages/class_comment/class_comment?dis_id=' + dis_id + '&dis_time=' + dis_time + '&content=' + content + '&name=' + name + '&protrait=' + protrait,
      })
    },
    delt: function (e) {
      var that = this;
      var requestIP = app.globalData.requestIP
      //获取该评论的id
      var dis_id = e.currentTarget.dataset.item
      that.setData({
        dis_id: dis_id
      })
      wx.showModal({
        title: '提示',
        content: '确定要删除本条评论吗？',
        success: function (sm) {
          if (sm.confirm) {
            wx.request({
              url: requestIP + '/user/deleteDiscuss',
              data: {
                discussid: that.data.dis_id,
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
                    url: requestIP + '/user/getDiscussInfo',
                    data: {
                      classid: that.data.classid
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                      'userid': app.globalData.userid
                    },
                    success: function (res) {
                      if (res.data.resultCode == "101") {
                        that.setData({
                          chat: [],
                          Ischatspace: "none"
                        })
                        for (var i = 0, len = res.data.data.length; i < len; i++) {
                          that.data.chat[i] = res.data.data[i]
                        }
                        that.setData({
                          chat: that.data.chat
                        })
                      }
                      else if (res.data.resultCode == "204") {
                        that.setData({
                          chat: [],
                          Ischatspace: "block"
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
    //获取userid
    var that = this
    that.setData({
      userid: app.globalData.userid
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/class_chat/class_chat?shareStatus=' + shareStatus
    }
  },
})




