//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
      wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //根据code获取openid等信息
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        console.log(code);
        var appId = 'wx3f4ccb9e9f33c7cf';
        var secret = '261784d5c7b10b0884c42a4ed7fde5df';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            console.log('openid为' + openid);
          }
        })
      }
    })
    // 获取用户信息
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
    userInfo: null,
    userstatus:null,
    windowWidth:null,
    windowHeight:null,
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