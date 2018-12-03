// pages/index/index.js
var app = getApp();
var requestIP = app.globalData.requestIP;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: new Date().getFullYear() + "-" + (parseInt(new Date().getMonth())+1).toString() + "-" +new Date().getDate() ,
    //date: new Date().toLocaleDateString().replace("/", "-").replace("/", "-"),
    top:"block",
    down:"none",
    calendarsim:"block",
    calendar:"none",
    curYear: new Date().getFullYear(), // 年份
    curMonth: new Date().getMonth() + 1,// 月份 1-12
    day: new Date().getDate(), // 日期 1-31 若日期超过该月天数，月份自动增加
    header_show: true, // 主标题是否显示
    prev: true, // 上一个月按钮是否显示
    next: true, // 下一个月按钮是否显示
    error_noClass: 'none',
    error_noClass_recent:'none',
    errortips_recent:'',
    recentClassList:null,//近期开课课程
    noticeList:[{
      no_content: "快乐50课表，专为退休人士创办的学习社区！本周课表出炉，了解一下？"
    }],//通知
    courseList:'',//课表列表
    userstatus:null,
    windowHeight:null
  },
  chooseDate:function(e){

  }
,
  /**
   * 生命周期函数--监听页面加载
   */
  //获取全局变量
  onLoad: function (options) {
    var that = this;
    //创建节点选择器
    if(options.num == 1){
      wx.setStorageSync("classid", options.classid)
      wx.redirectTo({
        url: '/pages/class_des_signUp/class_des_signUp',
      })
    }
    var query = wx.createSelectorQuery();    //选择id    
    var that = this;    
    query.select('.page').boundingClientRect(function (rect) {      //    
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
    this.getNotice();
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
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);

    this.getRecentClass();
    this.getMyCourse();
    this.getNotice();
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
  Godown:function(e){
    var that = this;
    that.setData({
      down:"block",
      top:"none",
      calendarsim:"none",
      calendar:"block"
    })
  },
  Gotop: function (e) {
    var that = this;
    that.setData({
      top: "block",
      down: "none",
      calendar: "none",
      calendarsim: "block"
    })
  },
  selectDate: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      date:e.detail.date
    })
    that.Gotop();
    that.getMyCourse();
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
  enterclass:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var courseList = this.data.courseList;
    var classid = courseList[index].classid;
    wx.navigateTo({
      url: '/pages/class/class?classid=' + classid,
    })
  },
  GOclass_des: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var recentClassList = this.data.recentClassList;
    var classid = recentClassList[index].classid;
    wx.setStorageSync("classid", classid);
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
      url: requestIP+'/student/getRecentClass',
      data: {
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
        if (res.data.resultCode == '101') {
          that.setData({
            recentClassList: res.data.data
          });
          that.setData({
            error_noClass_recent: "none"
          });
        }
       else {
          that.setData({
            recentClassList: null
          });
          that.setData({
            error_noClass_recent: "block"
          });
          that.setData({
            errortips_recent: '没有数据'
          })
        }
      },
      fail(res) {
        that.setData({
          recentClassList: null
        });
        that.setData({
          error_noClass_recent: "block"
        });
        that.setData({
          errortips_recent: '没有数据'
        })
      }
    })
  },

//获取通知
  getNotice:function(e){
    var that = this;
    wx.request({
      url: requestIP+'/student/getNotice',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
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
    console.log(that.data.date);
    wx.request({
      url: requestIP+'/student/getMyCourse',
      data: {
        startdate: that.data.date
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
       console.log(res.data.data);
        if (res.data.resultCode == '101') {
          that.setData({
            courseList: res.data.data
          });
          console.log(res.data.data[0].dayinweek);
          that.setData({
            error_noClass: "none"
          });
          that.setData({
            error_noClass_1: "none"
          });
        }
        else {
          that.setData({
            courseList: null
          });
          that.setData({
            error_noClass: "block"
          });
          that.setData({
            error_noClass_1: "none"
          });
        }
      },
      fail(res) {
        that.setData({
          courseList: null
        });
        that.setData({
          error_noClass: "none"
        });
        that.setData({
          error_noClass_1: "block"
        });
      }
    })
  },
})