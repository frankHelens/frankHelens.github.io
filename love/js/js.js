// JavaScript Document

var clientWidth=$(window).width();
var clientHeight=$(window).height();
$('.lay1').css({'width': clientWidth, 'height': clientHeight + 'px'});
$('.lay2').css({'width': clientWidth, 'height': clientHeight + 'px'});
 
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var urlstr=decodeURI(window.location.search);
var r = urlstr.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

function GetRequest() {
    var url = decodeURI(location.search); //获取url中"?"符后的字串
    var theRequest = new Object(); 
    if (url.indexOf("?") != -1) { 
        var str = url.substr(1); 
        strs = str.split("&"); 
        for(var i = 0; i < strs.length; i ++) { 
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
        } 
    } 
    return theRequest; 
} 

var uuname=getQueryString('username');
console.log(uuname);


var Request = new Object(); 
Request = GetRequest(); 

/*var data01 = Request['alaopenid']; */
console.log(Request);


/*获取到的用户信息*/
var data1 = {
    openid: Request['openid'],
    username: decodeURI(Request['username']),
    icon: Request['icon'],
    focus: Request['focus'],
    focustime: Request['focustime']
};

// console.log('openid：'+data1.openid+'；username：'+data1.username+'；icon：'+data1.icon+'；focus：'+data1.focus+'；focustime：'+data1.focustime);
// $.ajax({
//     url: 'https://www.h5-share.com/h5/2017/pian/jdsound/Home/Index/Jdselect',
//     type: "post",
//     data: data1,
// 　　dataType: "json",
//     success: function(data) {
//         console.log('查询成功！');
//         var contentGet = data.content;
//         console.log('data：'+contentGet);
//         if(contentGet == '找H5'){
//             $('.option1').find('img').show();
//         }
//         if(contentGet == '学H5'){
//             $('.option2').find('img').show();
//         }
//         if(contentGet == '做H5'){
//             $('.option3').find('img').show();
//         }
//         if(contentGet == '推H5'){
//             $('.option4').find('img').show();
//         }
// 　　},
//     error: function (jqXHR,textStatus, errorThrown) {
//         $('.option').find('img').hide();
//         console.log('没有相关数据，查询失败！');
//     }
// });

// var sound0=document.getElementById("sound0"),
//     sound1=document.getElementById("sound1"),
//     sound2=document.getElementById("sound2"),
//     classSound1 = $('#sound1'),
//     classSound2 = $('#sound2');

// var musicid = document.getElementById('musicid');
// function audioAutoPlay(id){
//     var audio = document.getElementById(id);
//     audio.play();
//     document.addEventListener("WeixinJSBridgeReady", function () {
//         audio.play();
//     }, false);
// }
// audioAutoPlay('musicid');
// musicid.volume=1.0;

/*音乐*/
function musicAct(){
    if ($('.music').hasClass('on')) {
        musicid.pause();
        $('.music').removeClass('on roate').addClass('off');
        /*$('.music').attr('src','Public/images/musicoff.png');*/
    } else {
        musicid.play();
        $('.music').removeClass('off').addClass('on roate');
        /*$('.music').attr('src','Public/images/musicon.png');*/
    }
}

$('.music').on('touchstart', function() {
    musicAct();
});

/*背景音控制按钮事件*/
function ismusicAct(className,idName){
    if (className.hasClass('on')) {
        idName.pause();
        className.removeClass('on').addClass('off');
    } else {
        idName.play();
        className.removeClass('off').addClass('on');
    }
}
/*小五语音播放时，背景音暂停*/
function musicPause(){
    if( $('.music').hasClass('on')){
        musicid.pause();
        $('.music').removeClass('on roate').addClass('off otherSound');
    }
}
/*小五语音播放时，背景音开启*/
function musicPlay(){
    if( $('.music').hasClass('otherSound')){
        musicid.play();
        $('.music').removeClass('off otherSound').addClass('on roate');
    }
}

/*将全部头像放进数组headIcon*/
var headIcon = new Array();
for(var i2=0;i2<=17;i2++){
    headIcon.push('Public/images/tx'+String(i2)+'.png');
    /*console.log('头像：'+headIcon[i2]);*/
}
$('.tx').on('touchstart', function() {
    var bgChange = bgColor[Math.floor(Math.random() * bgColor.length)];
    $('.bgbolor').css({'background': bgChange});
    var txImg = headIcon[Math.floor(Math.random() * headIcon.length)];
    $('.tx').find('img').attr('src',txImg);
});

/*获取到的用户信息*/
// var userConcern = data1['focus'],
//     usericon = data1['icon'];
// $('.usericon').attr('src',usericon);

// if(userConcern == 1){
//     $('#letterbtn').on('touchstart', function() {
//         generateImg();
//         userConaction1();
//     });
// }else{
//     $('#letterbtn').on('touchstart', function() {
//         generateImg();
//         userConaction2();
//     });
// }
$('#letterbtn').on('touchstart', function() {
    generateImg();
    userConaction2();
});
$('#qrcode').on('touchstart', function() {
    generateImg();
    userConaction1();
});
function userConaction2(){
    $('.lay1').hide();
    $('.lay2').hide();
    $('.lay3').show();
    $('.inner3').addClass('active');
    setTimeout(function(){
        // $('.threewd1').addClass('letteract4');
      typeWriter.msg = getMsg(msg);
      typeWriter.type()
    },2000);
    
}
// 公众号创建时间：2015/8/17 00:00:00
var oldTimeget = '2015-12-12';
var oldTime = new Date(oldTimeget);
console.log('oldTime：'+oldTime);
var oldyear =  oldTime.getFullYear();
var oldmonth = oldTime.getMonth()+1;
var oldday =  oldTime.getDate();
var oldTimeUp = oldyear + "-" +oldmonth + "-" + oldday + " " + oldTime.getHours() + ":" + oldTime.getMinutes() + ":" + oldTime.getSeconds(); 
console.log('oldTimeUp：'+oldTimeUp);
var curTime = new Date(new Date().getTime());
var dayTime = parseInt(Math.floor((curTime - oldTime) / 1000 / 60 / 60 / 24)+1);
console.log('dayTime：' + dayTime);

/*将全部奖章放进数组gradedBg*/
var gradedBg = new Array();
for(var i1=0;i1<=6;i1++){
    gradedBg.push('Public/images/graded'+String(i1)+'.jpg');
    /*console.log('奖章：'+gradedBg[i1]);*/
}

// function handleCanvas(){
//     // 程序计时的月从0开始取值后+1
//     var m = curTime.getMonth() + 1;
//     var t = '鉴定时间：'+curTime.getFullYear() + "-" + m + "-"
//      + curTime.getDate();
//     var c = document.getElementById("imgCanvas");
//     var cxt = c.getContext("2d");
//     cxt.font="20px SimHei";
//     cxt.fillStyle = "#410803"; 
//     // cxt.fillStyle = "#ffffff";
//     cxt.textAlign="center"; 
//     var img = new Image();  
// }
// handleCanvas();
function generateImg(){
    //从canvas中提取图片image
    function convertCanvasToImage(canvas) {
        //新Image对象，可以理解为DOM
        var image = new Image();
        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
        // 指定格式jpeg image.src = canvas.toDataURL("image/jpeg",0.8);
        var imgdata=canvas.toDataURL("image/jpeg");
        image.src = imgdata;
        $('#imgbig img').attr('src',imgdata);
        $.ajax({
			url: 'https://www.h5-share.com/h5share.php/Home/Share/JDOU_upload/',
			type: 'POST',
			data: {img:imgdata,project:'xiaowuqingshu2017'},
			success: function(json) {
			},
			error: function(returndata) {
			}
		});
        return image;
    }

    //获取网页中的canvas对象
    var mycanvas1=document.getElementById("imgCanvas");

    //将转换后的img标签插入到html中
    var img = convertCanvasToImage(mycanvas1);
    $('#newimg').append(img);//imgDiv表示你要插入的容器id
}

function userConaction1(){
    $('.lay1').hide();
    $('.lay3').hide();
    $('.lay2').show();
    $('.inner2').addClass('active');
    typeWriter.msg = getMsg(msg1);
    typeWriter.type()
    var myScroll;
        function ctScroll() {
            myScroll = new IScroll('#wrapper', {
                //preventDefault为false这行就是解决onclick失效问题
                //为true就是阻止事件冒泡,所以onclick没用
                preventDefault:false,
                scrollX: false,
                scrollY: true,
                scrollbars: false,
                bounce:false,
                checkDOMChanges: true
            });
        }
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
        ctScroll();
        $('.twowd1').show();
        setTimeout(function(){
            $('.twowd1').addClass('letteract1');
            /*myScroll.scrollTo(0, -500, 200);*/
            setTimeout(function(){
                $('.voice1').show();
                $('.voicecont1').on('click',function(){
                    $('.samllhand1').fadeOut();
                    musicPause();
                    $('.voicecont1').addClass('voiceani1');
                    ismusicAct(classSound1,sound1);
                    sound1.addEventListener('ended',function () {
                        $('.voicecont1').removeClass('voiceani1');
                        musicPlay();
                        musicid.volume=1.0;
                        sound1.pause();
                        classSound1.removeClass('on').addClass('off');
                        $('.voice2').show();
                        myScroll.refresh();
                        myScroll.scrollTo(0, -126, 200);
                        $('.voicecont2').on('click',function(){
                            $('.samllhand2').fadeOut();
                            $('.imgbig').show();
                            $('.imgbig').on('click',function(){
                                $('.imgbig').hide();
                                $('.voice3').show();
                                myScroll.refresh();
                                myScroll.scrollTo(0, -197, 200);
                                $('.voicecont3').on('click',function(){
                                    $('.samllhand3').fadeOut();
                                    musicPause();
                                    $('.voicecont3').addClass('voiceani1');
                                    ismusicAct(classSound2,sound2);
                                    sound2.addEventListener('ended',function () {
                                        $('.voicecont3').removeClass('voiceani1');
                                        musicPlay();
                                        sound2.pause();
                                        classSound2.removeClass('on').addClass('off');
                                        $('.voice4').show();
                                        $('.voicecont4').addClass('voicendani');
                                        myScroll.refresh();
                                        myScroll.scrollTo(0, -302, 200);

                                        $('.alertbox').click(function(){
                                            $(this).hide();
                                            $('.twowd2').show().addClass('letteract2');
                                            myScroll.refresh();
                                            myScroll.scrollTo(0, -412, 200);
                                            setTimeout(function(){
                                                $('.twowd3').show().addClass('letteract3');
                                                myScroll.refresh();
                                                myScroll.scrollTo(0, -496, 200);
                                            },6500);
                                        });     
                                    });
                                });
                            });
                        });
                    });
                });
            },11500);
            // },100);
        },1500);
        

}

$('.option').each(function(index){
    $(this).click(function(){
        $('.option').find('img').hide();
        $(this).find('img').show();
        var optionIndex = $('.option').index($(this)); 
        /*console.log(optionIndex);*/
        $('.alertbox').eq(optionIndex).show();
        var content = $(this).find('p').text();
        console.log('content：'+content);
        var d = new Date();
        var curtimeUp = d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(); 
        var data = {
            openid: data1.openid,
            username: data1.username,
            icon: data1.icon,
            focus: data1.focus,
            focustime: oldTimeUp,
            content:$(this).find('p').text(),
            curtime: curtimeUp
        };

        // $.ajax({
        //     url:'https://www.h5-share.com/h5/2017/pian/jdsound/Home/Index/Jdhandle/',
        //     type: "post",
        //     data: data,
        // 　　dataType: "json",
        //     success: function(data) {
        //         console.log('添加成功！');     
        // 　　},
        //     error: function (jqXHR,textStatus, errorThrown) {
        //         console.log('添加失败！');
        //     }
        // });
    });
});
