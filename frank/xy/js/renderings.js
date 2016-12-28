$(function(){
	var $btn =$('.container .tab span');
	var $img = $('.container .wrap img');
	$btn.each(function(i){
		$(this).on("click",function(){
			$img.css({
				opacity: 0,
			});
			$img.eq($(this).index()).css({
				opacity:1,
			});
		})
	}) 
})