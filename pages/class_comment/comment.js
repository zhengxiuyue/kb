// pages/class_comment/comment.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    comment: {
      type: "Array",
      value: "",
    },
    dis_id: {
      type: "String",
      value: "",
    },
    Iscommentspace: {
      type: "String",
      value: "",
    },
    comment_num: {
      type: "Number",
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    "imgUrl": "/image/headphoto.png",
    "space": "/image/space.png",
    reply_id: null,
    userid: app.globalData.userid
  },

  /**
   * 组件的方法列表
   */
  methods: {   
    //删除评论
    delt: function (e) {
      var that = this;
      var requestIP = app.globalData.requestIP
      //获取该评论的id
      var reply_id = e.currentTarget.dataset.item
      console.log(reply_id)
      that.setData({
        reply_id: reply_id
      })
      wx.showModal({
        title: '提示',
        content: '确定要删除本条评论吗？',
        success: function (sm) {
          if (sm.confirm) {
            wx.request({
              url: requestIP + '/user/deleteReply',
              data: {
                replyid: that.data.reply_id,
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'userid': app.globalData.userid
              },
              success: function (res) {
                if (res.data.resultCode == "101") {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                  wx.request({
                    url: requestIP + '/user/getReplyInfo',
                    data: {
                      discussid: that.data.dis_id
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                      'userid': app.globalData.userid
                    },// 设置请求的 header
                    success: function (res) {
                      if (res.data.resultCode == "101") {
                        that.setData({
                          comment: []
                        })
                        console.log(res.data.data.length)
                        for (var i = 0, len = res.data.data.length; i < len; i++) {
                          that.data.comment[i] = res.data.data[i]
                        }
                        that.setData({
                          comment: that.data.comment,
                          comment_num: res.data.data.length
                        })
                        console.log(that.data.comment)
                      }
                      else if (res.data.resultCode == "204") {
                        that.setData({
                          comment: [],
                          Iscommentspace: "block",
                          comment_num: 0
                        })
                      }
                      else {
                        console.log("请求失败");
                      }
                    },
                  })
                } else {
                  console.log("请求失败");
                }
              }
            })
          } else if (sm.cancel) { }
        }
      })
    },
  },

  ready: function () {

  }
})