//app.js
App({
  onLaunch: function (options) {
    var that = this;
    var classid = options.query.classid
    if (options.query.num){
      var num = options.query.num
    }
    else{
      var num = 0
    }

    //判断是否授权 未授权跳授权页面
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
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
 
    var userstatus = ""
    var name = "dd"
    var openid = ""
    var tel = ""
    var userid = ""
    //判断是否还有缓存 有跳入index 无跳入login
    wx.getStorage({
      key: "user",
      success(res){
         userstatus = res.data.userstatus
         name = res.data.name
         openid = res.data.openid
         tel = res.data.tel
         userid = res.data.userid

        if (userid && tel && name && openid && userstatus) {
          if (userstatus == 2) {
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
      }
    })  

  },

  onShow: function (options){
    var userstatus = ""
    wx.getStorage({
      key: "user",
      success(res) {
        userstatus = res.data.userstatus
        console.log(userstatus)
        var that = this
        var classid = options.query.classid
        if (options.query.num) {
          var num = options.query.num
        }
        else {
          var num = 0
        }
        if (num == 1) {
          if (userstatus == 2) {
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
      }
    })      
  },

  //第一种底部   
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
  //第二种底部，原理同上 
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
  globalData: {
    openid: "",
    userid: "",
    userInfo: null,
    userstatus:"",//用户身份
    code:"",
    storeid:"",
    province:"",//省
    city:"",//市
    areaname:"",//区
    storename:'',//门店名称
    alreadyFlag: "0",//是否第一次加载
    res_status:null,
    //requestIP: "http://localhost:8080/happyschedule",
    requestIP: "http://39.104.155.0:8080/happyschedule",
    //requestIP: "http://6bdcba.natappfree.cc/happyschedule",
    //requestIP: "https://curriculum.50fun.cn/happyschedule",
    
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

    //第二种底部导航栏显示    
    tabBar1: {
      "color": "#888",
      "selectedColor": "#1DA27F",
      "backgroundColor": "#fff",
      "borderStyle": "#dddee1",
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
    }
  }
})