$(".footer a").hover(function(){
		$(this).css("backgroundPosition",(($(this).index(".footer a"))*(-40))+"px"+" -40px");
	},function(){
		$(this).css("backgroundPosition",(($(this).index(".footer a"))*(-40))+"px"+" 0px");
	})
