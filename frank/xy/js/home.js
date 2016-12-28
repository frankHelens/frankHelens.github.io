$(".con").hover(function(){
	$(this).find(".conImgs").stop().fadeOut();
	$(this).find(".left").css("borderColor","#cfdb00");
	$(this).find('.right').css("color","#3c3c3c");

},function(){
	$(this).find(".conImgs").stop().fadeIn();
	$(this).find(".left").css("borderColor","#e1e1e1");
	$(this).find('.right').css("color","#b4b4b4");

});