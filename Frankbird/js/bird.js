window.onload=function(){
	
	//	容器
	var warp = document.getElementById('warp');
	//头部
	var head = document.getElementById('head');
	//菜单栏 
	var startMenu = document.querySelector('.startMenu');
	//开始菜单
	var startBtn = document.getElementById('start');
	//底部无缝滚动的线
	var line = document.querySelector('.line');
	//管子
	var pipe = document.querySelectorAll(".pipe");
	//分数
	var scope = document.querySelector('.scope');
	// 音乐
	var audio = document.querySelector('.audio').children;
	//结束信息
	var over = document.getElementById("overMessage");

	var score = 0; //记录分数

	//初始化开场
	function setout() {
		head.style.display = 'none';
		startMenu.style.display = "none";
		head.children[0].style.backgroundImage="url(img/title.png)"
		// 鸟
		bird.style.display="block";
		bird.className = "";
		bird.style.top="40%";
		// 开始
		getReady.style.display="block";
		// 分数
		score=0;
		scope.children[0].src= "img/"+score+".jpg";
		over.style.display='none';
		
		for(var i = 0 ; i<pipe.length;i++){
			pipe[i].bol="";
		}


	}

	var startBol = false;
	var bgMoveBol = false;
	//	点击开始
	startBtn.addEventListener("touchstart", function(e) {
		setout();
		chushihua();
		audio[0].play();
		startBol = true;
	});
	//	点击执行动画
	document.addEventListener("touchstart", function(e) {
		//	清除小鸟弹跳提示
		getReady.style.display = "none";
			if(startBol){	
				audio[3].play();
				birdUp();
				if(!bgMoveBol){
					audio[0].pause();
					bgmove();
					bgMoveBol=true;
				}
			}	
		e.preventDefault(); //阻止手势
		
	}, true);

	function chushihua(){
		// 初始化3个管子的位置和高度
		for (var i = 0; i < pipe.length; i++) {
			pipe[i].x = warp.offsetWidth+ i*200;
			pipe[i].style.left = pipe[i].x +'px';
			rndH(pipe[i]);
		}
	}
		
	// 随机数
	function rndH(obj){  
		var pipeH = obj.offsetHeight-21;
		var rnd = Math.round(Math.random()*(pipeH-240)+60);
		obj.children[0].style.height = rnd +'px';
		obj.children[1].style.height = pipeH - rnd - 120+"px";
		
	}

	//背景跟柱子的移动
	var lineX = 0 ;
	var timer = null;
	function bgmove(){
	 timer= setInterval(function(){
		lineX-=5;
		if(lineX< -26){
			lineX = 0;
		}
		line.style.left =lineX+'px';

		//移动管子
		for (var i = 0; i < pipe.length; i++) {	
		pipe[i].x -= 3;
		if(pipe[i].offsetLeft<-(pipe[i].offsetWidth+160)){
				rndH(pipe[i]);
				pipe[i].x = warp.offsetWidth;
				pipe[i].bol = false;
		}
		pipe[i].style.left = pipe[i].x + 'px';
		check(pipe[i]);
		}
	
	},30);

	}
	// 碰撞检测
	function check(obj){
		// 小鸟的坐标
		var l1 = bird.offsetLeft;
		var r1 = l1+bird.offsetWidth;
		var t1 = bird.offsetTop;
		var b1 = t1+bird.offsetHeight;
		// 管的坐标
		var l2 = obj.offsetLeft;
		var r2 = l2+ obj.offsetWidth
		var t2 = obj.children[0].offsetHeight;
		var b2 = t2 +120;
		
	// 判断碰到了
		if(l2<r1 && r2>l1 && (t1<t2
		 || b1>b2) ){
			clearInterval(obj.timer);
			  
			 gameover();
			 audio[1].play();
			 setTimeout(function(){
			 	audio[5].play();
			 	overMessage();
			 },500)
		}		

		if(l1>r2 && !obj.bol){
			audio[2].play();
			score++; //+1
			obj.bol = true;
			var str = String(score);
			scope.innerHTML = '';
			for (var i = 0; i < str.length; i++) {
				var img = document.createElement('img');
				img.src="img/"+str[i]+".jpg";
				scope.appendChild(img);
			}
		}
		
	}
		


	//小鸟往上飞
	function birdUp(){
		audio[4].play();
		var start = bird.offsetTop;
		var change = -60;
		var t = 0;
		var endT = 20;
		clearInterval(bird.timer);
		bird.className="";
		setTimeout(function(){
		bird.className="up";
		},2);
		bird.timer = setInterval(function(){
			t++;
			if(t>endT){
				birdDown();
			}else{
				bird.style.top = Tween.Cubic.easeOut(t,
					start,change,endT)+"px";
			}
		},20)
	}
	function birdDown(){
		var start = bird.offsetTop;
		var change =line.offsetTop-bird.offsetTop-bird.offsetHeight;
		var t = 0;
		var endT = 20;
		bird.className="down";
		clearInterval(bird.timer);
		bird.timer = setInterval(function(){
			t++;
			if(t>endT){
				clearInterval(bird.timer5);
			}else{
				bird.style.top = Tween.Cubic.easeIn(t,
					start,change,endT)+"px";
			}
		},45)
	}
	// //结束出现的信息
	function overMessage() {
		head.style.display = 'block';
		head.children[1].style.display="none";
		head.children[0].style.backgroundImage="url(img/text_game_over.png)"
		startMenu.style.display = "block";
		over.style.display='block';
	}
	function gameover(){
		clearInterval(timer);
		startBol = false;
		bgMoveBol = false;
		over.children[0].innerHTML=score;
	}
	
}