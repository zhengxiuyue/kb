// pages/signin/signin.js
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    userstatus: {
      type: "Number",
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectPerson: true,
    firstPerson: '第二节',
    selectArea: false,
    current: 0,
    display:"none",
    dispaly1:"block"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickPerson: function () {
      var selectPerson = this.data.selectPerson;
      if (selectPerson == true) {
        this.setData({
          selectArea: true,
          selectPerson: false,
        })
      } else {
        this.setData({
          selectArea: false,
          selectPerson: true,
        })
      }
    },
    changeTab(e) {
      let index = parseInt(e.currentTarget.dataset.index || 0)
      this.setData({
        current: index
      })
    },
    //点击切换
    mySelect: function (e) {
      this.setData({
        firstPerson: e.target.dataset.me,
        selectPerson: true,
        selectArea: false,
      })
    }, 
    submit:function(e){
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      }),  
      this.setData({
        display:"block",
        dispaly1:"none",
        duration: 10000
      })
    }
  },

  ready: function () {
     
  }
})