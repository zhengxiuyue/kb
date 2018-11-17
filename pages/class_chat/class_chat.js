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
    openid: {
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
    "comment_num": "3",
    "color": 0,
    "space":"/image/space.png",
    "Isdelete":"block",
    dis_id:null
    
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
      //获取该评论的id
      var dis_id = e.currentTarget.dataset.dis_id
      var dis_time = e.currentTarget.dataset.dis_time
      var content = e.currentTarget.dataset.content
      var name = e.currentTarget.dataset.name
      console.log(dis_id + dis_time+content+name)
      wx.navigateTo({
        url: '/pages/class_comment/class_comment?dis_id=' + dis_id + '&dis_time=' + dis_time + '&content=' + content + '&name=' + name,
      })
    },
    changelike(e) {
      let that = this;
      var requestIP = app.globalData.requestIP
      //获取该评论的id
      var dis_id = e.currentTarget.dataset.item
      console.log(dis_id)
      that.setData({
        dis_id: dis_id
      })
      if (that.data.islike == 0) {
        wx.request({
          url: requestIP + '/user/agreeDiscuss',
          data: {
            discussid: that.data.dis_id,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'openid': app.globalData.openid
          },// 设置请求的 header
          success: function (res) {
            if (res.data.resultCode == "101") {
              that.setData({
                islike: 1,
                color: 1
              })
              that.properties.chat.count = that.properties.chat.count+1
            } else {
              console.log("请求失败");
            }
          }
        })
      }
      else if (that.data.islike == 1) {
        this.setData({ islike: 0 })
        this.setData({ color: 0 })
        this.setData({ like_num: 2 })
      }
    },
    delt: function (e) {
      let that = this;
      var requestIP = app.globalData.requestIP
      //获取该评论的id
      var dis_id = e.currentTarget.dataset.item
      console.log(dis_id)
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
    },

    //没有评论数据时，提请去发布评论
    signin: function(e){
      wx.navigateTo({
        url: '/pages/class_chat_edit/class_chat_edit',
      })
    }
  },

  ready: function () {

  },
  attached: function (){
    
  }
})




