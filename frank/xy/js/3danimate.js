$(function(){
	$(".banner").hover(function(){
		$('.banner .main .message').fadeIn(300);
	},function(){
		$('.banner .main .message').fadeOut(300);

	})
	// 装文本的数组
	var strArr = ["Sichuan Province-Commercial Real Estate","Qiandao Lake Real Estate","Huzhou City Commercial Real Estate",'Commercial Real Estate-2014-10',"Commercial Real Estate-2013-09","Huzhou City Commercial Real Estate",'Commercial Real Estate-2014-10','Commercial Real Estate-2013-09',"Huzhou City Commercial Real Estate"];
	for (var i = 0; i < 9; i++) {
		$(".main").append('<div class="sm_video fl"><div><img src="img/3d_img'+(i+1)+'.jpg" alt=""></div><p>'+strArr[i]+'</p></div>')	
	}	
})