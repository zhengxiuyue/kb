var app = getApp();
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    orderList: {
      type: "Array",
      value: "",
    },
    Isclassspace1: {
      type: "String",
      value: "",
    },
    Isclassspace2: {
      type: "String",
      value: "",
    },
    orderListClass: {
      type: "Array",
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 'tab2'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    }
  },

  ready: function () {

  }
})


