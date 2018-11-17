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
    openid: {
      type: "String",
      value: "",
    },
    Iscommentspace: {
      type: "String",
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "imgUrl": "/image/headphoto.png",
    "space": "/image/space.png",
    reply_id: null
  },

  /**
   * 组件的方法列表
   */
  methods: {   
    delt: function (e) {
      let that = this;
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
                'openid': app.globalData.openid
              },// 设置请求的 header
              success: function (res) {
                if (res.data.resultCode == "101") {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                  that.attached
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
  },

  ready: function () {

  },
  attached: function () {

  }
})