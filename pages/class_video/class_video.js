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
    sign: {
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
    //宣传视频
    discovery: {
      video: 'https://v.mifile.cn/b2c-mimall-media/ed921294fb62caf889d40502f5b38147.mp4',
      image: "https://i1.mifile.cn/a4/xmad_15278351912522_frJQc.jpg",//封面图
      duration_raw: 74//秒数
    },
    space: "/image/space.png",

    classList:[{
      coursename:"点歌单",
      levelname:"ss"
    }]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    govideo:function(e){
      var scheduleid = e.currentTarget.dataset.scheduleid
      wx.request({
        url: requestIP + '/user/getVideo',
        data: {
          scheduleid: scheduleid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            app.globalData.video_link = res.data.data[0].link
            console.log(app.globalData.video_link)
            wx.navigateTo({
              url: '/pages/videoWebView/videoWebView?scheduleid=' + scheduleid,
            })            
          }
          else if (res.data.resultCode == "204") {
            wx.showToast({
              title: '本节课没视频',
              icon: 'none',
            })            
          }
          else {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            })
          }
        },
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




