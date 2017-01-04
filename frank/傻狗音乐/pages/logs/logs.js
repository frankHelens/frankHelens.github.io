Page({
  data:{
    song:[],
    so:"搜索"
  },
  onLoad: function () {
      
    },
 formSubmit:function(e){
   var _this = this;
  var song = e.detail.value.userName;
  wx.request({
      url:"http://so.ard.iyyin.com/s/song_with_out?q="+song+"&page=1&size=10", 
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        console.log(res.data);
        _this.setData({
          song:res.data.data
        })
      }
    })
 }

})