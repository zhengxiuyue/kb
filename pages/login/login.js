// pages/login/login.js
var app = getApp();
var requestIP = app.globalData.requestIP
var ctx;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isadmin:0,
    isauth:1,
    // items: [
    //   { value: '学生', id: '3', checked:true},
    //   { value: '老师', id: '2', checked:false},
    //   { value: '助教', id: '1',checked:false}
    // ],
    userstatus: '3',
    name: '',
    code:'',
    newcode:"",
    pwd:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //判断是否授权 未授权跳授权页面
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.nickName = res.userInfo.nickName
              app.globalData.avatarUrl = res.userInfo.avatarUrl
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
    var userid = ''
    var userstatus = ''
    var openid = ''
    var tel = ''
    wx.getStorage({//获取本地缓存
      key: "user",
      success: function (res) {
        userid = res.data.userid
        userstatus = res.data.userstatus
        openid = res.data.openid
        tel = res.data.tel
        if (userid && tel && openid && userstatus) {
          if (userstatus == 1) {
            app.globalData.userid = userid
            app.globalData.userstatus = userstatus
            app.globalData.openid = openid
            wx.redirectTo({
              url: '/pages/index/A_index'
            })
          }
          else if (userstatus == 2) {
            app.globalData.userid = userid
            app.globalData.userstatus = userstatus
            app.globalData.openid = openid
            wx.redirectTo({
              url: '/pages/index/T_index'
            })
          }
          else if (userstatus == 3) {
            app.globalData.userid = userid
            app.globalData.userstatus = userstatus
            app.globalData.openid = openid
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
          else {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        }
        else {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
    var tel = wx.getStorageSync('tel')
    if (tel != '') {
      that.setData({
        isauth:1
      })
    }
    else{
      that.setData({
        isauth: 0
      })
    }
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code:res.code,
          })
          app.globalData.openid = null
        } else {
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
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.shareStatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/login/login?shareStatus=' + shareStatus
    }
  },
  
  //获取用户身份
  userStatusChange:function(e){
    var con = e.currentTarget.dataset.userstatus
    this.setData({
      userstatus: con
    })
    if(con == 1){
      this.setData({
        isadmin:1,
      })
    }
    else if (con == 2) {
      this.setData({
        isadmin: 0,
      })
    }
    else if (con == 3){
      this.setData({
        isadmin: 0,
      })
    }
   
  },
  // radioChange: function (event) {
  //   var con = event.detail.value
  //   this.setData({
  //     userstatus: event.detail.value 
  //   })
  //   if(con == 1){
  //     this.setData({
  //       isadmin:1,
  //     })
  //   }
  //   else if (con == 2) {
  //     this.setData({
  //       isadmin: 0,
  //     })
  //   }
  //   else if (con == 3){
  //     this.setData({
  //       isadmin: 0,
  //     })
  //   }
  // },

  //获取手机号码
  getPhoneNumber:function(e){ 
    if(e.detail.iv){    
      var that = this
      var avatarUrl = wx.getStorageSync('avatarUrl')
      var nickName = wx.getStorageSync('nickName')
      wx.request({
        url: requestIP + '/user/getPhone',
        data: {
          code: that.data.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if (res.data.resultCode == "101") {
            app.globalData.tel = res.data.data
            wx.setStorageSync('tel', res.data.data)
            wx.login({
              success(res) {
                if (res.code) {
                  that.setData({
                    newcode: res.code,
                  })
                  if (!avatarUrl | !nickName) {
                    wx.redirectTo({
                      url: '/pages/authorize/authorize',
                    })
                  }
                  //老师
                  else if (that.data.userstatus == 2) {
                    wx.request({
                      url: requestIP + '/user/teacherLogin',
                      data: {
                        avatarUrl: wx.getStorageSync('avatarUrl'),
                        nickName: wx.getStorageSync('nickName'),
                        phone: wx.getStorageSync('tel'),
                        code: that.data.newcode
                      },
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                      success: function (res) {
                        if (res.data.resultCode == "101") {
                          wx.redirectTo({
                            url: '/pages/index/T_index',
                          })
                          app.globalData.openid = res.data.data.openid
                          app.globalData.userid = res.data.data.userid
                          app.globalData.userstatus = res.data.data.role
                          wx.setStorage({
                            key: "user",
                            data:
                            {
                              userid: res.data.data.userid,
                              openid: res.data.data.openid,
                              userstatus: res.data.data.role,
                              tel: res.data.data.phone,
                              name: res.data.data.name,
                            }
                          })
                        }
                        else if (res.data.resultCode == "213") {
                          wx.login({
                            success(res) {
                              if (res.code) {
                                that.setData({
                                  code: res.code,
                                })
                                app.globalData.openid = null
                              } else {
                              }
                            }
                          })
                          wx.showToast({
                            title: '角色错误',
                            icon: 'none',
                          });
                          app.globalData.openid = ""
                          app.globalData.userid = ""
                        }
                        else if (res.data.resultCode == "211") {
                          wx.login({
                            success(res) {
                              if (res.code) {
                                that.setData({
                                  code: res.code,
                                })
                                app.globalData.openid = null
                              } else {
                              }
                            }
                          })
                          wx.showToast({
                            title: '用户不存在',
                            icon: 'none',
                          });
                          app.globalData.openid = ""
                          app.globalData.userid = ""
                        }
                        else {
                          wx.login({
                            success(res) {
                              if (res.code) {
                                that.setData({
                                  code: res.code,
                                })
                                app.globalData.openid = null
                              } else {
                              }
                            }
                          })
                          wx.showToast({
                            title: '请求失败',
                            icon: 'none',
                          });
                          app.globalData.openid = ""
                          app.globalData.userid = ""
                        }
                      },
                      fail: function () {
                        wx.login({
                          success(res) {
                            if (res.code) {
                              that.setData({
                                code: res.code,
                              })
                              app.globalData.openid = null
                            } else {
                            }
                          }
                        })
                        wx.showToast({
                          title: '服务器异常',
                          icon: 'none',
                        });
                        app.globalData.openid = ""
                      },
                    })
                  }
                  //学生
                  if (that.data.userstatus == 3) {
                    wx.request({
                      url: requestIP + '/user/studentLogin',
                      data: {
                        avatarUrl: wx.getStorageSync('avatarUrl'),
                        nickName: wx.getStorageSync('nickName'),
                        phone: wx.getStorageSync('tel'),
                        code: that.data.newcode
                      },
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                      success: function (res) {
                        if (res.data.resultCode == "101") {
                          wx.redirectTo({
                            url: '/pages/index/index',
                          })
                          app.globalData.openid = res.data.data.openid
                          app.globalData.userid = res.data.data.userid
                          app.globalData.userstatus = res.data.data.role

                          wx.setStorage({
                            key: "user",
                            data:
                            {
                              userid: res.data.data.userid,
                              openid: res.data.data.openid,
                              userstatus: res.data.data.role,
                              tel: res.data.data.phone,                      
                            }
                          })
                        }
                        else if (res.data.resultCode == "213") {
                          wx.login({
                            success(res) {
                              if (res.code) {
                                that.setData({
                                  code: res.code,
                                })
                                app.globalData.openid = null
                              } else {
                              }
                            }
                          })
                          wx.showToast({
                            title: '角色错误',
                            icon: 'none',
                          });
                          app.globalData.openid = ""
                          app.globalData.userid = ""
                        }
                        else if (res.data.resultCode == "212") {
                          wx.login({
                            success(res) {
                              if (res.code) {
                                that.setData({
                                  code: res.code,
                                })
                                app.globalData.openid = null
                              } else {
                              }
                            }
                          })
                          wx.showToast({
                            title: '用户不存在',
                            icon: 'none',
                          });
                          app.globalData.openid = ""
                          app.globalData.userid = ""
                        }
                        else {
                          wx.login({
                            success(res) {
                              if (res.code) {
                                that.setData({
                                  code: res.code,
                                })
                                app.globalData.openid = null
                              } else {
                              }
                            }
                          })
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                          });
                          app.globalData.openid = ""
                          app.globalData.userid = ""
                        }
                      },
                      fail: function () {
                        wx.login({
                          success(res) {
                            if (res.code) {
                              that.setData({
                                code: res.code,
                              })
                              app.globalData.openid = null
                            } else {
                            }
                          }
                        })
                        wx.showToast({
                          title: '服务器异常',
                          icon: 'none',
                        });
                        app.globalData.openid = ""
                      },
                    })
                  }   
                } else {
                }
              }
            })
            
          }
          else {
            wx.login({
              success(res) {
                if (res.code) {
                  that.setData({
                    code: res.code,
                  })
                } else {
                }
              }
            })
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            });
          }
        },
        fail: function () {
          wx.login({
            success(res) {
              if (res.code) {
                that.setData({
                  code: res.code,
                })
              } else {
              }
            }
          })
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
          });
        },
      }) 
    }
    else{
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }
  }, 

  //获取姓名/邮箱
  nameInput: function (event) {
    this.setData({ name: event.detail.value.replace(/\s+/g, '') })
  },

  //获取助教邮箱
  //获取姓名/邮箱
  pwdInput: function (event) {
    this.setData({ pwd: event.detail.value.replace(/\s+/g, '') })
  },

  //修改全局变量selectCodition的值
  login:function(e){
    let that = this;
    var avatarUrl = wx.getStorageSync('avatarUrl')
    var nickName = wx.getStorageSync('nickName')
    //邮箱
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    var con = that.data.userstatus
    //学生登录
    if(con == 3){
      if (!avatarUrl | !nickName) {
        wx.redirectTo({
          url: '/pages/authorize/authorize',
        })
      }
      else{        
        wx.request({      
          url: requestIP + '/user/studentLogin',
          data: {
            avatarUrl: wx.getStorageSync('avatarUrl'),
            nickName: wx.getStorageSync('nickName'),
            phone: wx.getStorageSync('tel'),
            code: that.data.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data.resultCode == "101") {
              wx.redirectTo({
                url: '/pages/index/index',
              })
              app.globalData.openid = res.data.data.openid
              app.globalData.userid = res.data.data.userid
              app.globalData.userstatus = res.data.data.role
             
              wx.setStorage({
                key: "user",
                data:
                {
                  userid: res.data.data.userid,
                  openid: res.data.data.openid,
                  userstatus: res.data.data.role,
                  tel: res.data.data.phone,
                }
              })
            }
            else {
              wx.login({
                success(res) {
                  if (res.code) {
                    that.setData({
                      code: res.code,
                    })
                    app.globalData.openid = null
                  } else {
                  }
                }
              })
              wx.showToast({
                title: '请求失败',
                icon: 'none',
              });
              app.globalData.openid = ""
              app.globalData.userid = ""            
            }
          },
          fail: function () {
            wx.login({
              success(res) {
                if (res.code) {
                  that.setData({
                    code: res.code,
                  })
                  app.globalData.openid = null
                } else {
                }
              }
            })
            wx.showToast({
              title: '服务器异常',
              icon: 'none',
            });
            app.globalData.openid = ""
          },
        })
      }
    }
    //老师登录
    else if (con == 2) {
      if (!avatarUrl | !nickName ){
        wx.redirectTo({
          url: '/pages/authorize/authorize',
        })
      }
      else{
        wx.request({
          url: requestIP + '/user/teacherLogin',
          data: {
            avatarUrl: wx.getStorageSync('avatarUrl'),
            nickName: wx.getStorageSync('nickName'),
            phone: wx.getStorageSync('tel'),
            code: that.data.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data.resultCode == "101") {
              wx.redirectTo({
                url: '/pages/index/T_index',
              })
              app.globalData.openid = res.data.data.openid
              app.globalData.userid = res.data.data.userid
              app.globalData.userstatus = res.data.data.role
             
              wx.setStorage({
                key: "user",
                data:
                {
                  userid: res.data.data.userid,
                  openid: res.data.data.openid,
                  userstatus: res.data.data.role,
                  tel: res.data.data.phone,
                  name: res.data.data.name,
                }
              })
            }
            else if (res.data.resultCode == "213") {
              wx.login({
                success(res) {
                  if (res.code) {
                    that.setData({
                      code: res.code,
                    })
                    app.globalData.openid = null
                  } else {
                  }
                }
              })
              wx.showToast({
                title: '角色错误',
                icon: 'none',
              });
              app.globalData.openid = ""
              app.globalData.userid = ""
            }
            else if (res.data.resultCode == "212") {
              wx.login({
                success(res) {
                  if (res.code) {
                    that.setData({
                      code: res.code,
                    })
                    app.globalData.openid = null
                  } else {
                  }
                }
              })
              wx.showToast({
                title: '用户不存在',
                icon: 'none',
              });
              app.globalData.openid = ""
              app.globalData.userid = ""
            }
            else {
              wx.login({
                success(res) {
                  if (res.code) {
                    that.setData({
                      code: res.code,
                    })
                    app.globalData.openid = null
                  } else {
                  }
                }
              })
              wx.showToast({
                title: '请求失败',
                icon: 'none',
              });
              app.globalData.openid = ""
              app.globalData.userid = ""
            }
          },
          fail: function () {
            wx.login({
              success(res) {
                if (res.code) {
                  that.setData({
                    code: res.code,
                  })
                  app.globalData.openid = null
                } else {
                }
              }
            })
            wx.showToast({
              title: '服务器异常',
              icon: 'none',
            });
            app.globalData.openid = ""
          },
        })       
      }      
    }  
    //助教登录
    else if(con == 1){
      if (!avatarUrl | !nickName) {
        wx.redirectTo({
          url: '/pages/authorize/authorize',
        })
      }
      if (that.data.name.length == 0) {
        wx.showToast({
          title: '请填写邮箱!',
          icon: 'none',
        });
        return false;
      }
      else if (!str.test(that.data.name)) {
        wx.showToast({
          title: '请填写正确的邮箱',
          icon: "none",
        });
      }
      else if (that.data.pwd.length == 0) {
        wx.showToast({
          title: '请填写密码!',
          icon: 'none',
        });
        return false;
      }
      else {
        wx.request({
          url: requestIP + '/user/AdminLogin',
          data: {
            avatarUrl: wx.getStorageSync('avatarUrl'),
            nickName: wx.getStorageSync('nickName'),            
            code: that.data.code,
            account: that.data.name,
            pwd: that.data.pwd
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data.resultCode == "101") {                           
                wx.redirectTo({
                  url: '/pages/index/A_index',
                })           
                app.globalData.openid = res.data.data.openid
                app.globalData.userid = res.data.data.userid
                app.globalData.userstatus = res.data.data.role              
                wx.setStorage({
                key: "user",
                data:
                {
                  userid: res.data.data.userid,
                  openid: res.data.data.openid,
                  userstatus: res.data.data.role,
                  name: res.data.data.name,
                  tel: res.data.data.tel,
                }
              })
            }
            else if (res.data.resultCode == "214" || res.data.resultCode == "204"){
              wx.login({
                success(res) {
                  if (res.code) {
                    that.setData({
                      code: res.code,
                    })
                    app.globalData.openid = null
                  } else {
                  }
                }
              })
              wx.showToast({
                title: '邮箱或密码错误',
                icon: 'none',
              });
              app.globalData.openid = ""
              app.globalData.userid = ""
            }
            else {
              wx.login({
                success(res) {
                  if (res.code) {
                    that.setData({
                      code: res.code,
                    })
                    app.globalData.openid = null
                  } else {
                  }
                }
              })
              wx.showToast({
                title: '请求失败',
                icon: 'none',
              });
              app.globalData.openid = ""
              app.globalData.userid = ""
            }
          },
          fail: function () {
            wx.login({
              success(res) {
                if (res.code) {
                  that.setData({
                    code: res.code,
                  })
                  app.globalData.openid = null
                } else {
                }
              }
            })
            wx.showToast({
              title: '服务器异常',
              icon: 'none',
            });
            app.globalData.openid = ""
          },
        })
      }
    }    
  },

})
