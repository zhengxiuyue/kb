//app.js
App({
  onLaunch: function (options) {
    var that = this;
    var classid = options.query.classid
    var ay_id = options.query.ay_id
    console.log(options.query.num)
    if (options.query.num) {
      var num = options.query.num
    }
    else {
      var num = 0
    }
    console.log(num)

    //判断是否授权 未授权跳授权页面
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.nickName = res.userInfo.nickName
              that.globalData.avatarUrl = res.userInfo.avatarUrl
            }
          })
        }
        else {
          wx.redirectTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })

    //判断是否还有缓存 有跳入index 无跳入login
    var userid = wx.getStorageSync('userid')
    var userstatus = wx.getStorageSync('userstatus')
    var openid = wx.getStorageSync('openid')
    var name = wx.getStorageSync('name')
    var tel = wx.getStorageSync('tel')
    // console.log(userid) 
    // console.log(userstatus)
    // console.log(openid)
    // console.log(name)
    // console.log(userid)
    // console.log(tel)
    if (userid && tel && name && openid && userstatus) {
      if(userstatus == 1){
        that.globalData.userid = userid
        that.globalData.userstatus = userstatus
        that.globalData.openid = openid
        wx.redirectTo({
          url: '/pages/index/A_index?num=' + num + "&classid=" + classid
        })
      }
      else if (userstatus == 2) {
        that.globalData.userid = userid
        that.globalData.userstatus = userstatus
        that.globalData.openid = openid
        wx.redirectTo({
          url: '/pages/index/T_index?num=' + num + "&classid=" + classid
        })
      }
      else if (userstatus == 3) {
        that.globalData.userid = userid
        that.globalData.userstatus = userstatus
        that.globalData.openid = openid
        wx.redirectTo({
          url: '/pages/index/index?num=' + num + "&classid=" + classid
        })
      }
      else {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    }
  },

  onShow: function (options) {
    var that = this
    var userstatus = wx.getStorageSync('userstatus')
    var classid = options.query.classid
    if (options.query.num) {
      var num = options.query.num
    }
    else {
      var num = 0
    }

    if (num == 1) {
      if(userstatus == 1){
        wx.redirectTo({
          url: '/pages/index/A_index?num=' + num + "&classid=" + classid
        })
      }
      else if (userstatus == 2) {
        wx.redirectTo({
          url: '/pages/index/T_index?num=' + num + "&classid=" + classid
        })
      }
      else if (userstatus == 3) {
        wx.redirectTo({
          url: '/pages/index/index?num=' + num + "&classid=" + classid
        })
      }
    }
    else if(num == 3){
      if (userstatus == 3){
        wx.redirectTo({
          url: '/pages/activityDetail/activityDetail?ay_id=' + ay_id
        })       
      }
      else{
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
           
    }
  },

  //学生   
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。 
    var curPageArr = getCurrentPages();    //获取加载的页面   
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象    
    var pagePath = curPage.route;    //当前页面url    
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态         
      }
    }
    curPage.setData({ tabBar: tabBar });
  },
  //老师
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({ tabBar: tabBar });
  },

  //助教
  editTabBar2: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。 
    var curPageArr = getCurrentPages();    //获取加载的页面   
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象    
    var pagePath = curPage.route;    //当前页面url    
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态         
      }
    }
    curPage.setData({ tabBar: tabBar });
  },

  globalData: {
    openid: "",
    userid: "0137da84b68111e8ab8e00163e00299d",//学生 0137da84b68111e8ab8e00163e00299d 老师039cd505e50911e8ab8e00163e00299d 助教 12459ec8a77a11e8ab8e00163e00299d 
    userInfo: null,
    userstatus: "3",//用户身份
    code: "",
    storeid: "",
    province: "",//省
    city: "",//市
    areaname: "",//区
    storename: '',//门店名称
    //requestIP: "http://localhost:8080/happyschedule",
    // requestIP: "http://39.104.155.0:8080/happyschedule",
    //requestIP: "http://cmvb2y.natappfree.cc/happyschedule",
    requestIP: "http://qas57b.natappfree.cc/happyschedule",

   
    //学生角色
    tabBar: {
      color: "black",
      selectedColor: "#1DA27F",
      backgroundColor: "#fff",
      borderStyle: "#dddee1",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/image/index.png",
          "selectedIconPath": "/image/indexselected.png",
          "clas": "menu-item",
          "selectedColor": "#1DA27F",
          active: true
        },
        {
          "pagePath": "/pages/more/more",
          "text": "更多",
          "iconPath": "/image/more.png",
          "selectedIconPath": "/image/moreselected.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/activity/activity",
          "text": "活动",
          "iconPath": "/image/activity.png",
          "selectedIconPath": "/image/activityselect.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/mine/mine",
          "text": "我的",
          "iconPath": "/image/mine.png",
          "selectedIconPath": "/image/mineselected.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    },

    //老师角色
    tabBar1: {
      color: "black",
      selectedColor: "#1DA27F",
      backgroundColor: "#fff",
      borderStyle: "#dddee1",
      "list": [{
        "pagePath": "/pages/index/T_index",
        "text": "首页",
        "iconPath": "/image/index.png",
        "selectedIconPath": "/image/indexselected.png",
        "clas": "menu-item1",
        "selectedColor": "#1DA27F",
        active: false
      },
      {
        "pagePath": "/pages/mine/T_mine",
        "text": "我的",
        "iconPath": "/image/mine.png",
        "selectedIconPath": "/image/mineselected.png",
        "selectedColor": "#1DA27F",
        "clas": "menu-item1",
        active: false
      }],
      "position": "bottom"
    },

    //助教角色
    tabBar2: {
      color: "black",
      selectedColor: "#1DA27F",
      backgroundColor: "#fff",
      borderStyle: "#dddee1",
      "list": [
        {
          "pagePath": "/pages/index/A_index",
          "text": "首页",
          "iconPath": "/image/index.png",
          "selectedIconPath": "/image/indexselected.png",
          "clas": "menu-item2",
          "selectedColor": "#1DA27F",
          active: true
        },
        {
          "pagePath": "/pages/order/order",
          "text": "预约",
          "iconPath": "/image/order.png",
          "selectedIconPath": "/image/orderselected.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/mine/A_mine",
          "text": "我的",
          "iconPath": "/image/mine.png",
          "selectedIconPath": "/image/mineselected.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    },
  }
})