// pages/class_comment/class_comment.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "imgUrl": "/image/photo.png",
    "current":0,
    "like_num": "2",
    "comment_num": "",
    "comment_content":"",
    "dis_id": "",
    "dis_time": "",
    "content": "",
    "name": "",
    "Iscommentspace":"none",
    "space":"/image/space.png",
    "comment":[],
    "userid":"",
    "space": "/image/space.png",
    reply_id: null,
    protrait:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var requestIP = app.globalData.requestIP
    var userid = app.globalData.userid
    var dis_id =that.options.dis_id
    var dis_time = that.options.dis_time
    var content = that.options.content
    var name = that.options.name
    var protrait = that.options.protrait
    this.setData({
      protrait: protrait,
      dis_id: dis_id,
      dis_time: dis_time,
      name: name,
      content: content,
      userid: userid
    })

    //获取评论信息
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
            comment: [],
            Iscommentspace:"none"
          })
          for (var i = 0, len = res.data.data.length; i < len; i++) {
            that.data.comment[i] = res.data.data[i]
          }
          that.setData({
            comment: that.data.comment,
            comment_num: res.data.data.length
          })
        } 
        else if (res.data.resultCode == "204"){
          that.setData({
            Iscommentspace:"block",
            comment_num: 0
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.shareStatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/class_comment/class_comment?shareStatus=' + shareStatus
    }
  },

  //获取评论信息
  commentInput: function (event) {
    this.setData({ comment_content: event.detail.value })
  },
 
 //发布评论
  release:function(e){
    let that = this
    var requestIP = app.globalData.requestIP
    if(that.data.comment_content.length == 0)
    {
      wx.showLoading();
      wx.hideLoading();
      setTimeout(() => {
        wx.showToast({
          title: '请输入评论!',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 2000)
      }, 0);
    }else{
      wx.request({
        url: requestIP + '/user/replyDiscuss',
        data: {
          discussid: that.data.dis_id,
          recontent: that.data.comment_content
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
                title: '发布成功',
                icon: "success",
              });
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
            that.setData({
              comment_content:"",
              Iscommentspace: "none",
            })
            that.onLoad()//刷新评论信息
          }
          else {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
      })
    }
  },
  //删除评论
  delt: function (e) {
    var that = this;
    var requestIP = app.globalData.requestIP
    //获取该评论的id
    var reply_id = e.currentTarget.dataset.item
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
                      for (var i = 0, len = res.data.data.length; i < len; i++) {
                        that.data.comment[i] = res.data.data[i]
                      }
                      that.setData({
                        comment: that.data.comment,
                        comment_num: res.data.data.length
                      })
                    }
                    else if (res.data.resultCode == "204") {
                      that.setData({
                        comment: [],
                        Iscommentspace: "block",
                        comment_num: 0
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
        } else if (sm.cancel) { }
      }
    })
  }
})