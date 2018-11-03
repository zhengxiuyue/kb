const { $Message } = require('../../dist/base/index');
var interval = null //倒计时函数
Page({
  data: {
    username: '',
    tel: '',
    authcode: '',
    time: '获取验证码', //倒计时 
    currentTime: 60,//限制60s
    isClick: false,//获取验证码按钮，默认允许点击
    value1: '',
    value2: '',
    value3: '',
    visible5: false,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '确认报名',
        color: '#ed3f14',
        loading: false
      }
    ]
  },
  handleOpen5() {
    this.setData({
      visible5: true
    });
  },

  handleClick5({ detail }) {
   
  },

  //获取用户名
  usernameInput: function (event) {
    this.setData({ username: event.detail.value })
  },

  //获取手机号码
  telInput: function (event) {
    this.setData({ tel: event.detail.value })
  },

  //获取验证码
  authcodeInput: function (event) {
    // console.log("password==", event.detail.value)
    this.setData({ authcode: event.detail.value })
  },


  //验证
  gainAuthCodeAction: function () {
    let that = this;
    //第一步：验证手机号码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
    if (that.data.tel.length == 0) {
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    //第二步：设置计时器
    // 先禁止获取验证码按钮的点击
    that.setData({
      isClick: true,
    })
    //60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;//减
      that.setData({
        time: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 60,
          isClick: false
        })
      }
    }, 1000);
    /*第三步：请求验证码接口，并记录服务器返回的验证码用于判断，这里服务器也可能不返回验证码，那验证码的判断交给后台
    else{      
      wx.request({       
        data: {},        
        'url': 接口地址,        
        success(res) {          
          console.log(res.data.data)          
          _this.setData({            
            iscode: res.data.data          
          })          
          var num = 61;          
          var timer = setInterval(function () 
          {            
            num--;            
            if (num <= 0) {              
              clearInterval(timer);              
              _this.setData({                
                codename: '重新发送',                
                disabled: false              
              })             
            } else 
            {             
               _this.setData({                
                 codename: num + "s"              
              })           
            }          
        }, 1000)
    */
    // wx.request({})
  },

  //注册验证
  signUp: function (e) {
    let that = this;
    var name = /^[\u4E00-\u9FA5A-Za-z]+$/;//判断姓名
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号
    //判断姓名
    if (!name.test(that.data.username) || that.data.username.length == 0) {
      wx.showToast({
        title: '请输入正确的姓名!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    //判断手机号码
    else if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //判断验证码 服务端！！！
    else if (that.data.authcode.length != 4) {
      wx.showToast({
        title: '请填写正确的验证码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    else {
      if (e.index === 0) {
        this.setData({
          visible5: false
        });
      } else {
        const action = [...this.data.actions5];
        action[1].loading = true;

        wx.requestPayment({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
          success: function () {
            $Message({
              content: '报名成功！',
              type: 'success'
            });
          },
          fail: function () {
            $Message({
              content: '报名失败！',
              type: 'success'
            });
          }
        })

        this.setData({
          actions5: action
        });

        setTimeout(() => {
          action[1].loading = false;
          this.setData({
            visible5: false,
            actions5: action
          });
        }, 2000);
        /*wx.redirectTo({
          url: '../class_des/class_des',
        })*/
      }
    }
  }
});