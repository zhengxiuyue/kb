// pages/class_video/class_video.js
var app = getApp();
var requestIP = app.globalData.requestIP
Component({
  /**
   * 组件的属性列表
   */

  properties: {    
    video: {
      type: "Array",
      value: "",
    },
    Issignspace: {
      type: "String",
      value: "",
    }//是否204

  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    govideo:function(e){
      var that = this;
      var index = e.currentTarget.dataset.index;
      console.log(that.properties.video)
      console.log(index)
      var scheduleid = that.properties.video[index].scheduleid;
      wx.navigateTo({
        url: '/pages/videoWebView/videoWebView?scheduleid=' + scheduleid,
      })
    }
  },

  ready: function () {
    
  },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {
    var that = this
    var coursename = that.data.coursename
    var classid = that.data.classid
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/class_video/class_video?shareStatus=' + shareStatus
    }
  },
})




