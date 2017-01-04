//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls:[
        "http://img1.kwcdn.kuwo.cn/star/upload/2/2/1483528843218_.jpg",
        "http://img1.kwcdn.kuwo.cn/star/upload/7/7/1483500856599_.jpg",
        "http://img4.kwcdn.kuwo.cn/star/upload/4/4/1480909297444_.jpg",
        "http://img2.kwcdn.kuwo.cn/star/upload/10/10/1453347776330_.jpg"
      ],
      newSong:{}
  },
  //事件处理函数
  onLoad: function () {
    var _this = this;
    wx.request({
      url:"http://so.ard.iyyin.com/s/song_with_out?q=周杰伦&page=1&size=10",
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        // console.log(res.data);
        var newSong = res.data.data;
        console.log(newSong);
        _this.setData({
            newSong:newSong  
        })
      }
    })
  }
})