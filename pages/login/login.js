// pages/login/login.js
var app = getApp();
var ctx;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: '老师',id:'2'},
      {value: '学生',id:'3'},
    ],
    userstatus: '',
    "tel": '',
    "password": '',
    authcode: '',//验证码
    text: '',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    drawPic(that);
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          that.setData({
            code:res.code
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
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
  //获取用户身份
  radioChange: function (event) {
    var con = event.detail.value
    app.globalData.userstatus = con
    this.setData({userstatus: event.detail.value })
  },

  //获取手机号码
  telInput: function (event) {
    this.setData({ tel: event.detail.value })
  },

  //获取密码
  passwordInput: function (event) {
    this.setData({ password: event.detail.value.replace(/\s+/g, '') })
  },

  //获取验证码
  authcodeInput: function (event) {
    this.setData({ authcode: event.detail.value })
  },

  change: function (e) {
    var that = this;
    drawPic(that);
  }, 

  //修改全局变量selectCodition的值
  login:function(e){
    let that = this;
    var requestIP =app.globalData.requestIP
    var con = app.globalData.userstatus
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    //判断手机号码
    if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //判断密码
    else if (that.data.password.length == 0) {
      wx.showToast({
        title: '请填写正确的密码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //判断身份
    else if (that.data.userstatus == '') {
      wx.showToast({
        title: '请选择身份!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    else if (that.data.authcode.length==0) {
      wx.showToast({
        title: '请输入验证码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    //判断验证码 
    else if (that.data.authcode.toUpperCase() != that.data.text.toUpperCase()) {
      wx.showToast({
        title: '验证码错误!',
        icon: 'none',
        duration: 1000
      })
      that.change()
      that.setData({ 
        authcode: ""
      })
      return false;
    }
    else {
      if (con == 3) {
        wx.request({
          url: requestIP+'/user/login',
          data:{
            account: that.data.tel,
            pwd: that.data.password,
            "type":3,
            code: that.data.code
          },
          header: {
            'content-type': 'application/json'
          },// 设置请求的 header
          success: function (res) {
            if (res.data.resultCode == "101") {
              app.globalData.openid = res.data.data 
              wx.redirectTo({
                url: '/pages/index/index',
              })
            } else {
              console.log("index.js wx.request CheckCallUser statusCode" );
            }
          },
          fail: function () {
            console.log("index.js wx.request CheckCallUser fail");
          }
        })
       
      }
      else if (con == 2) {
        wx.request({
          url: 'http://localhost:8080/happyschedule/user/login',
          data: {
            account: that.data.tel,
            pwd: that.data.password,
            "type": 3,
            code: that.data.code
          },
          header: {
            'content-type': 'application/json'
          },// 设置请求的 header
          success: function (res) {
            if (res.data.resultCode == "101") {
              app.globalData.openid = res.data.data
              wx.redirectTo({
                url: '/pages/index/T_index',
              })
            } else {
              console.log("index.js wx.request CheckCallUser statusCode");
            }
          },
          fail: function () {
            console.log("index.js wx.request CheckCallUser fail");
          }
        })
      }    
    }    
  },
  regist: function (e) {
    wx.navigateTo({
      url: '/pages/regist/regist',
    })
  } ,
  forget:function(e){
    wx.navigateTo({
      url: '/pages/forget/forget',
    })
  },

  mobile(e) { 
    this.setData({ mobile: e.detail.value }) 
  }

})

//绘制图片验证码
function randomNum(min, max){ 
  return Math.floor(Math.random() * (max - min) + min); 
}

/**生成一个随机色**/
function randomColor(min, max){ 
  var r = randomNum(min, max); 
  var g = randomNum(min, max); 
  var b = randomNum(min, max); 
  return "rgb(" + r + "," + g + "," + b + ")"; 
} 

/**绘制验证码图片**/
function drawPic(that)
{
  ctx = wx.createCanvasContext('canvas');    /**绘制背景色**/   
  ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清   
  ctx.fillRect(0, 0, 90, 28)    /**绘制文字**/    
  var arr;   
  var text = '';    
  var str = 'ABCEFGHJKLMNPQRSTWXY123456789';    
  for (var i = 0; i < 4; i++) 
  {        
    var txt = str[randomNum(0, str.length)];        
    ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色    
    ctx.font = randomNum(20, 26) + 'px SimHei'; //随机生成字体大小     
    var x = 5 + i * 20;      
    var y = randomNum(20, 25);       
    var deg = randomNum(-20, 20); //修改坐标原点和旋转角度       
    ctx.translate(x, y);     
    ctx.rotate(deg * Math.PI / 180);    
    ctx.fillText(txt, 5, 0);    
    text = text + txt; //恢复坐标原点和旋转角度    
    ctx.rotate(-deg * Math.PI / 180);      
    ctx.translate(-x, -y);    
  }   
  
  /**绘制干扰线**/    
  for (var i = 0; i < 4; i++) {        
    ctx.strokeStyle = randomColor(40, 180);        
    ctx.beginPath();        
    ctx.moveTo(randomNum(0, 90), randomNum(0, 28));        
    ctx.lineTo(randomNum(0, 90), randomNum(0, 28));        
    ctx.stroke();    
  }    
  
  /**绘制干扰点**/    
  for (var i = 0; i < 20; i++) {        
    ctx.fillStyle = randomColor(0, 255);        
    ctx.beginPath();        
    ctx.arc(randomNum(0, 90), randomNum(0, 28), 1, 0, 2 * Math.PI);        
    ctx.fill();    
  }    
  ctx.draw(false, function(){        
    that.setData({           
      text: text       
    })    
  });
}
