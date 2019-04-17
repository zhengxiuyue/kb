// pages/mine_activity/mine_activity.js
// pages/mine_class_now/mine_class_now.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    activity: {
      type: "Array",
      value: "",
    },
    Isclassspace: {
      type: "String",
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    space: "/image/space.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    classcard: function (e) {
      var classid = e.currentTarget.dataset.classid
      wx.navigateTo({
        url: '/pages/class/class?classid=' + classid,
      })
    },
    signin: function () {
      wx.switchTab({
        url: '/pages/more/more',
      })
    },
    goactivityDetail:function(e){
      var ayid = e.currentTarget.dataset.ayid
      wx.navigateTo({
        url: '/pages/activityDetail/activityDetail?ay_id='+ayid,
      })
    }
  },

  ready: function () {

  }
})


