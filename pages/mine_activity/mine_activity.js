// pages/mine_activity/mine_activity.js
// pages/mine_class_now/mine_class_now.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    item: {
      type: "Array",
      value: "",
    },
    Isclassspace: {
      type: "String",
      value: "",
    },
    userstatus: {
      type: "Number",
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    space: "/image/space.png",
    guessList:[
      {
      wMainImage:"http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
      wTitle:"活动名称",
      wStartPrice:"活动价格",
        wMonthSale:"活动时间  活动地点"
    }, 
    {
        wMainImage: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        wTitle: "活动名称",
        wStartPrice: "活动价格",
        wMonthSale: "活动时间  活动地点"
      },
      {
        wMainImage: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        wTitle: "活动名称",
        wStartPrice: "活动价格",
        wMonthSale: "活动时间  活动地点"
      },
    ]
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
    }
  },

  ready: function () {

  }
})


