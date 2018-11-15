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
    Isclassspace: {
      type: "String",
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "imgUrl": "/image/headphoto.png",
    "like": "/image/like.png",
    "dislike": "/image/dislike.png",
    "comment": "/image/comment.png",
    "edit": "/image/edit.png",
    "islike": 0,
    "like_num": "2",
    "comment_num": "3",
    "color": 0,
    "space":"/image/space.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    edit: function (e) {
      wx.navigateTo({
        url: '/pages/class_chat_edit/class_chat_edit',
      })
    },
    comment: function (e) {
      wx.navigateTo({
        url: '/pages/class_comment/class_comment',
      })
    },
    changelike(e) {
      let that = this;
      if (that.data.islike == 0) {
        this.setData({ islike: 1 })
        this.setData({ color: 1 })
        this.setData({ like_num: 3 })
      }
      else if (that.data.islike == 1) {
        this.setData({ islike: 0 })
        this.setData({ color: 0 })
        this.setData({ like_num: 2 })
      }
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
    },

    //没有评论数据时，提请去发布评论
    signin: function(e){
      wx.navigateTo({
        url: '/pages/class_chat_edit/class_chat_edit',
      })
    }
  },

  ready: function () {

  }
})




