$(function(){
	var $content = $('.content');
	createDiv(20)
	//创建div和图片函数
	function createDiv(n){
		var len = $content.children().length;
		if(len+n>78){
			return;
		}
		var index = 0; //记录图片加载完的数量
		for (var i = len; i < len+n; i++) {
			var $div = $('<div><img src="img/RenImg/B'+(i+1)+'.jpg" alt=""><p></p></div>');
			$content.append($div);
			// 每创建一个div给图片一个加载事件
			$div.find('img').on('load',function(){
				// 每次加载完index++
				index++;
				// 加载玩就显示
				$(this).parent().css('opacity',"1");
				//所有图片加载完;
				if(index==n){
					change();//排列
				}
			})
			//给创建的div加上hover事件用来显示放大镜
			$div.hover(function(){
				$(this).find('p').stop().fadeIn();
			},function(){
				$(this).find('p').stop().fadeOut();
			})
			var $show = $('.show');//显示大图片的div
			//给div加点击事件
			$div.on('click',function(){
				$show.show();
				var $img = $(this).find("img");
				//获取点击图片的div里面的图片地址
				var src = $img.attr('src');
				//获取图片的宽高
				var imgW = $img.width();
				var imgH = $img.height();
				//获取屏幕的宽高
				var w = $(window).innerWidth();
				var h = $(window).innerHeight();
				//判断横还是竖的
				if(imgW/imgH>w/h){
					$show.find('img').css({
						width:"80%",
						height:"auto"
					})
				}else{
					$show.find('img').css({
						width:"auto",
						height:"80%"
					})
				}
				//把获取到的地址赋给show里面的img
				$show.find('img').attr('src',src);
			})
			// 点击大图隐藏
			$show.on("click",function(){
				$(this).hide();
			})
		}

	}

			
	//改变没个div的位置(排列)
	function change(){
		// 获取content的宽度
		var w = $content.innerWidth();
		//获取content里的所有div 
		var $div = $content.children();
		console.log($div);
		var num = 4; //设置一排多少个div
		var mr = 10; //每个div之间的间距
		// 当视窗宽度小于960的时候,一排的div数量等于三
		if(w<960){
			num = 3
		}
		if(w<640){
			num = 2;
			mr = 5;
		}
		// div的宽度
		var dw = (w-mr*(num-1))/num;
		var arrH = [];//记录每一列的高度
		// 循环给每个div设置left和top值 
		$div.each(function(i){
			$(this).width(dw);//改变div的宽度
			if(i<num){//第一排div
				$(this).css({
					left:i*dw+mr*i,
					top:0
				})
				// 将一排中的每个div的高度push到arrH[i]里面
				arrH[i] = $(this).height();
			}else{//第一排之后的所有div
				var min = findMin(arrH);
				//把div定位到最小高度的位置
				$(this).css({
					left:$div.eq(min).position().left,
					top:arrH[min]+mr
				})
				//记录高度加上当前div的高度
				arrH[min]+=$(this).height()+mr;
			}
		})
		//获取最高高度赋给父级content
		var cH = Math.max.apply(null,arrH);
		$content.height(cH);
	}
	// 寻找高度最小的下标个                         
	function findMin(arr){
		var min = 0 ;
		for (var i = 1; i < arr.length; i++) {
			min = arr[min]>arr[i]?i:min;
		}
		return min;
	}
	//当窗口大小改变的时候重新排列
	$(window).resize(function(){
		change();
	})
	//滚动条移动的时候触发
	$(window).scroll(function(){
		// 被卷起来的部分
		var sTop = document.body.scrollTop;
		//总的显示的部分=内容的高度加上上面的头部
		var cB = $content.height()+$content.offset().top;
		//视窗的高度
		var winH = $(window).innerHeight();
		// 判断到底了
		if (sTop+winH>=cB-100) {
			// 多创建5张
			createDiv(5);
		}
	})

})