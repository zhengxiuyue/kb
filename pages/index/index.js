// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error_noClass: 'none',
    error_noClassList:'none',
    errortips:'',
    recentClassList:null,//近期开课课程
    noticeList:[{
      no_time: "2018-10-21 11:57:18",
      no_content: "快乐50课表，专为退休人士创办的学习社区！本周课表出炉，了解一下？",
      no_id: 2
    }],//通知
    courseList:'',//近两周课表列表
    userstatus:null,
    windowHeight:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取全局变量
  onLoad: function (options) {
    var that = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();    //选择id    
    var that = this;    
    query.select('.page').boundingClientRect(function (rect) {      // 
    console.log(rect.height)     
    that.setData({       
      windowHeight: rect.height +45+'px'     
      })   
      }).exec();

    app.editTabBar();
    var userstatus = app.globalData.userstatus
    this.setData({
      userstatus: userstatus,
    })

    this.getRecentClass();
    this.getMyCourse();
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

  },
  more:function(){
    wx.redirectTo({
      url: '/pages/more/more'
    })
  },
  notice: function () {
    wx.navigateTo({
      url: '/pages/notice/notice',
    })
  },
  enterclass:function(){
    wx.navigateTo({
      url: '/pages/class/class',
    })
  },
  GOclass_des: function (e) {
    wx.navigateTo({
      url: '../class_des_signUp/class_des_signUp',
    })
  },
  GOmore: function (e) {
    wx.navigateTo({
      url: '../more/more',
    })
  },

  //获取近期开课课程
  getRecentClass:function(e){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/happyschedule/student/getRecentClass',
      data: {
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'openid': app.globalData.openid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          that.setData({
            recentClassList: res.data.data
          });
          that.setData({
            error_noClass: "none"
          });
        }
       else {
          that.setData({
            error_noClass: "block"
          });
          that.setData({
            errortips: '没有数据'
          })
        }
      },
      fail(res) {
        that.setData({
          error_noClassList: "block"
        });
        that.setData({
          errortips: '没有数据'
        })
      }
    })
  },

//获取通知
  getNotice:function(e){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/happyschedule/student/getNotice',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'openid': app.globalData.openid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          that.setData({
            noticeList: res.data.data
          });
        }
      }
    })
  },

    //获取我的课表
  getMyCourse: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/happyschedule/student/getMyCourse',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'openid': app.globalData.openid
      },
      success(res) {
        console.log(res.data.resultCode);
        if (res.data.resultCode == '101') {
          that.setData({
            courseList: res.data.data
          });
          that.setData({
            error_noClass: "none"
          });
        }
        else {
          that.setData({
            error_noClass: "block"
          });
        }
      },
      fail(res) {
        that.setData({
          error_noClass: "block"
        });
      }
    })
  },
})