// Loading加载
var LoadingImgArr=[];
var ImgArr = ["arrow.png","asteroids-left.png","asteroids-right.png","bg-bottom.jpg","bg-main.png","bg-three.jpg","boll1.png","cloud-2.png","cloud-6.png","g.png","hand.png","moon.png","observatory.png","orbits.png","planet-1.png","planet-2.png","planet-big-with-orbits.png","stars.png","stars1.png","tree.png"];
var LoadingNum = 0;
var LoadingWarp = document.querySelector("#loadingNum");
for (var i = 0; i < ImgArr.length; i++) {
	var allImg = new Image();
	allImg.src="img/"+ImgArr[i];
	LoadingImgArr.push(allImg); 
}
for (var i = 0; i < LoadingImgArr.length; i++) {
	LoadingImgArr[i].onload=function(){
		LoadingNum++;
		LoadingWarp.innerHTML=(LoadingNum/LoadingImgArr.length*100)+"%";
		if(LoadingNum==LoadingImgArr.length){
			setTimeout(function(){
				document.querySelector(".loading").style.display="none";
				document.querySelector(".frist").style.display="block";
				// swiper.slideTo(1,500,true);//切换到第一个slide，速度为1秒
				// swiper.removeSlide(0); //删除第一个
       		// swiper.unlockSwipeToNext();//解锁
				start();				
			},300)
		}
	}
}
	function start(){//开始
		cloud();
		g();
		three();
		 four();
	}	
	function cloud(){
		var cloud = document.querySelector(".clouds");
		// 随机添加云
		for (var i = 0; i < rnd(0,5); i++) {
			var clouds=document.createElement("img");	
			clouds.src="img/cloud-2.png";
			cloud.appendChild(clouds);
			clouds.style.top = rnd(10,200)+"px";//随机位置	
			clouds.style.left = rnd(-10,200)+"px";//随机位置
			clouds.style.animation="clouds-move"+rnd(8,15)+"s infinite";//随机位置
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
		var exitImg = new Image();
		exitImg.src="img/orbits.png";
		var imgs = new Image();
		imgs.src="img/boll1.png";
		function Sb(){
			this.x = rnd(25,canvas.width);
			this.y = rnd(25,canvas.height);
			this.w = 50;
			this.h = 50;
			this.sdx = 0;
			this.sdy = 0;
		}
		Sb.prototype.draw=function(){
			ctx.beginPath();
			ctx.drawImage(imgs,this.x,this.y,this.w,this.h);
			ctx.closePath();
		}
		function Exit(){
			this.x = canvas.width/2-40;
			this.y = canvas.height/2-40;
			this.w = 80;
			this.h = 80;
		}
		Exit.prototype.draw=function(){
			ctx.beginPath();
			ctx.drawImage(exitImg,this.x,this.y,this.w,this.h);
			ctx.closePath();
		}
		var sb =new Sb();
		var exit = new Exit();
		//设备事件
		window.addEventListener('deviceorientation',function(e){
			sb.sdx =(e.gamma/3); 
			sb.sdy =(e.beta/3);
		}) 
		var treeImg = new Image();
		treeImg.src="img/tree.png";
		function Tree(x,y){
			var tr = this;
			tr.w = 30;
			tr.h = 30;
			tr.x =x;
			tr.y =y;
		}
		Tree.prototype={
			draw:function(){
				ctx.drawImage(treeImg,this.x,this.y,this.w,this.h);
			}
		}
		var treeArr = [];
		for(var i=0;i<rnd(30,60);i++){
			var tree = new Tree(rnd(50,canvas.width-50),rnd(50,canvas.height-50));
			treeArr.push(tree);
		}
		function eat(obj,fn){//吃掉所有星星
			var oL = obj.x;
			var oR = oL+obj.w;
			var oT = obj.y;
			var oB = oT+obj.h;
			var sl = sb.x ;
			var sr = sl+sb.w;
			var st = sb.y;
			var sB = st+sb.h;
			if(sr>=oL&&sl<=oR&&sB>=oT&&st<=oB){
				fn();
			}
		}
		function move(){
			sb.x +=sb.sdx; 
			sb.y +=sb.sdy; 
			if(sb.x>=canvas.width-sb.w){
				sb.x=canvas.width-sb.w;
			}
			if(sb.x<=0){
				sb.x =0;
			}
			if(sb.y>=canvas.height-sb.h){
				sb.y=canvas.height-sb.h;
			}
			if(sb.y<=0){
				sb.y =0;
			}
			ctx.clearRect(0,0,canvas.width,canvas.height);
			sb.draw();
			for (var i = 0; i < treeArr.length; i++) {
				treeArr[i].draw();
				eat(treeArr[i],function(){
					treeArr.splice(i,1);
					i--;
				});
			}
			if(treeArr.length==0){
				check();
				exit.draw();
			}
			var timer = window.requestAnimationFrame(move);
		}
		function check(){//碰撞出口检测
			var el = exit.x;
			var er = el+exit.w/5;
			var et = exit.y;
			var eb = et+exit.h/5;
			var sl = sb.x ;
			var sr = sl+sb.w/5;
			var st = sb.y;
			var sB = st+sb.h/5;
			if(sr>=el&&sl<=er&&sB>=et&&st<=eb){
				swiper.slideTo(3,500,true);//切换到第一个slide，速度为1秒
			}
		}
		 moveStart();
		function moveStart(){//开始移动
			var startBtn = document.querySelector("#moveStart");
			var 	hint = document.querySelector(".hint");
			startBtn.addEventListener("touchstart",function(){
				hint.style.transform="scale(0)";
				setTimeout(function(){
					canvas.style.display="block";	
					move();	
				},1000)
			},true);
		}
	}

	function four(){
		
	}
	//随机函数
	function rnd(max,min){
		return parseInt(Math.random()*(max-min))+min;
	}