// pages/activity/activity.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品列表
    listgoods: [{
      "id": '0101001',
      "name": "活动名称活动名称",
      "price": "价格（原价）",
      "num": "活动地点",
      "store": "活动时间",
      "pic_url": "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg"
    }, {
      "id": '0101002',
      "name": "按综合排序（约125g/盒）",
      "pic_url": "http://img09.yiguoimg.com/e/ad/2016/161011/585749449909281099_260x320.jpg",
      "price": "177.0",
      "num": "1009",
      "address": "韩国",
      "store": "阿迪达斯",
    }, {
      "id": '0101003',
      "name": "按综合排序12个约160g/个(北京)",
      "price": "178.0",
      "num": "1009",
      "address": "韩国",
      "store": "阿迪达斯",
      "pic_url": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg"
    }, {
      "id": '0102001',
      "name": "按综合排序6个92-114g/个(北京)",
      "price": "172.0",
      "num": "1009",
      "address": "韩国",
      "store": "阿迪达斯",
      "pic_url": "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg"
    }, {
      "id": '0102002',
      "name": "按综合排序约125g/盒）",
      "pic_url": "http://img09.yiguoimg.com/e/ad/2016/161011/585749449909281099_260x320.jpg",
      "price": "171.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
    }, {
      "id": '0102003',
      "name": "按综合排序2个约160g/个(北京)",
      "price": "174.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
      "pic_url": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg"
    }, {
      "id": '0103001',
      "name": "按综合排序6个92-114g/个(北京)",
      "price": "177.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
      "pic_url": "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg"
    }, {
      "id": '0103002',
      "name": "按综合排序（约125g/盒）",
      "pic_url": "http://img09.yiguoimg.com/e/ad/2016/161011/585749449909281099_260x320.jpg",
      "price": "173.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯"
    }, {
      "id": '0103003',
      "name": "按综合排序160g/个(北京)",
      "price": "169.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
      "pic_url": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg"
    }, {
      "id": '0201001',
      "name": "按综合排序6个92-114g/个(北京)",
      "price": "159.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
      "pic_url": "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg"
    }, {
      "id": '0201002',
      "name": "按综合排序（约125g/盒）",
      "pic_url": "http://img09.yiguoimg.com/e/ad/2016/161011/585749449909281099_260x320.jpg",
      "price": "149.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
    }, {
      "id": '0202001',
      "name": "按综合排序约160g/个(北京)",
      "price": "139.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
      "pic_url": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg"
    }, {
      "id": '1203001',
      "name": "按综合排序6个92-114g/个(北京)",
      "price": "159.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
      "pic_url": "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg"
    }, {
      "id": '1401001',
      "name": "按综合排序（约125g/盒）",
      "pic_url": "http://img09.yiguoimg.com/e/ad/2016/161011/585749449909281099_260x320.jpg",
      "price": "181.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
    }, {
      "id": '1101001',
      "name": "按综合排序(北京)",
      "price": "180.0",
      "num": "1009",
      "address": "英国",
      "store": "阿迪达斯",
      "pic_url": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg"
    }],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();

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

  }
})