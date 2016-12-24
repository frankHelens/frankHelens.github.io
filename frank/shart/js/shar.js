window.onload=function(){
	cloud();
	g();
	three();
	function cloud(){
		var cloud = document.querySelector(".clouds");
		// 随机添加云
		for (var i = 0; i < rnd(0,5); i++) {
			var clouds=document.createElement("img");	
			clouds.src="img/cloud-2.png";
			cloud.appendChild(clouds);
			clouds.style.top = rnd(10,200)+"px";//随机位置	
			clouds.style.left = rnd(-10,200)+"px";//随机位置
			clouds.style.animation="clouds-move "+rnd(8,15)+"s infinite";//随机位置
		}
	}
	//光点点击跳转
	function g(){
		var g= document.getElementById('g');
		g.addEventListener("touchstart",function(e){
			var gL = g.offsetLeft+g.offsetWidth/3;
			var gR = gL+g.offsetWidth/3.5;
			var gT = g.offsetTop+g.offsetHeight/3;
			var gB = gT+g.offsetHeight/3.5;
			if(e.touches[0].clientX>gL&&e.touches[0].clientX<gR&e.touches[0].clientY>gT&&e.touches[0].clientY<gB){
                swiper.unlockSwipeToNext();//解锁
				swiper.slideTo(2,500,true);//切换到第一个slide，速度为1秒
			}
		},true)
	}
	// 第三
	function three(){
		var canvas = document.querySelector("#canvas");
		canvas.width=document.documentElement.offsetWidth;
		canvas.height = document.documentElement.offsetHeight;
		var ctx = canvas.getContext("2d");
		function Sb(){
			this.x = canvas.width/2;
			this.y = canvas.height/2;
			this.r = 30;
		}
		Sb.prototype.draw=function(){
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
			ctx.fillStyle = "red";
			ctx.fill();
			ctx.closePath();
		}
		var sb =new Sb();
		console.log(sb.x,sb.y);
		window.addEventListener('deviceorientation',function(e){
			sb.x +=(e.gamma/5 ); 
			sb.y +=(e.beta/5);
			if(sb.x+sb.r>=canvas.width){
				sb.x=canvas.width-sb.r;
			}
			if(sb.x-sb.r<=0){
				sb.x = sb.r;
			}
			if(sb.y+sb.r>=canvas.height){
				sb.y=canvas.height-sb.r;
			}
			if(sb.y-sb.r<=0){
				sb.y = sb.r;
			}
		}) 
		move();
		function move(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			sb.draw();
			var timer = window.requestAnimationFrame(move);
		}

	}
	//随机函数
	function rnd(max,min){
		return parseInt(Math.random()*(max-min))+min;
	}

}