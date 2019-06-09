// pages/class_notice_edit/class_notice_edit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticetitle:"",
    noticecontent:"",
    classid:"",
    level:"",
    coursename:"",
    texts: "最少5个字",
    min: 5,//最少字数
    max: 100, //最多字数 (根据自己需求改变)
    focus:false,
    focustitle:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var classid = that.options.classid
    var level = that.options.level
    var coursename = that.options.coursename
    that.setData({
      classid: classid,
      coursename:coursename,
      level:level
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
  onShareAppMessage: function (ops) {
    var that = this
    var coursename = that.data.coursename
    var classid = that.data.classid
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/class_notice_edit/class_notice_edit?shareStatus=' + shareStatus
    }
  },  

  noticetitleInput: function (event) {
    this.setData({
      noticetitle: event.detail.value.replace(/\s+/g, ''),
    });
  },

  noticecontentInput: function (event) {
    // 获取输入框的内容
    var value = event.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len < this.data.min)
      this.setData({
        texts: "最少5个字"
      })
    else if (len >= this.data.min)
      this.setData({
        noticecontent: event.detail.value.replace(/\s+/g, ''),
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数 
    });
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },

  bindButtonTaptitle: function () {
    this.setData({
      focustitle: true
    })
  },

  returnnotice:function(e){

    var that = this;
    var requestIP = app.globalData.requestIP
    //判断评论是否为空
     if (that.data.noticetitle.length == 0) {
       wx.showLoading();
       wx.hideLoading();
       setTimeout(() => {
         wx.showToast({
           title: '请输入通知标题!',
           icon: "none",
         });
         setTimeout(() => {
           wx.hideToast();
         }, 2000)
       }, 0);
      return false;
    }
     else if (that.data.noticecontent.length == 0) {
       wx.showLoading();
       wx.hideLoading();
       setTimeout(() => {
         wx.showToast({
           title: '请输入通知内容!',
           icon: "none",
         });
         setTimeout(() => {
           wx.hideToast();
         }, 2000)
       }, 0);
       return false;
     }
    //发请求
    else {
      wx.request({
        url: requestIP + '/teacher/publishNotice',
        data: {
          classid: that.data.classid,
          content: that.data.noticecontent,
          title: that.data.noticetitle,
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
            wx.navigateBack({
            })

          } else {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
      })      
    }
  },
  inputs: function (e) {
    // // 获取输入框的内容
    // var value = e.detail.value;
    // // 获取输入框内容的长度
    // var len = parseInt(value.length);

    // //最少字数限制
    // if (len <= this.data.min)
    //   this.setData({
    //     texts: "最低五个字"
    //   })
    // else if (len > this.data.min)
    //   this.setData({
    //     texts: " "
    //   })

    // //最多字数限制
    // if (len > this.data.max) return;
    // // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    // this.setData({
    //   currentWordNumber: len //当前字数 
    // });
  }
})