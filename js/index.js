//小傻瓜的节日
var  XSGFestival=['二月初六','214','七月初七','腊月三十'];

var YangDay,YangMonth,YangYear,YangLiS;//阳历
var NongDay,NongMonth,NongYeay,NongLiS//农历

//当前日期
var nowDate= new Date();

//阳历
YangYear=nowDate.getFullYear();
YangMonth=nowDate.getMonth()+1;
YangDay=nowDate.getDate();
YangLiS=''.concat(YangMonth,YangDay);

//公历转农历
var NongLi=calendar.solar2lunar(YangYear,YangMonth,YangDay);

//农历
NongDay=NongLi["IDayCn"];
NongMonth=NongLi["IMonthCn"];
NongYeay=NongLi["cYear"];
NongLiS="".concat(NongMonth,NongDay);

var content = document.querySelector('#content');
var backAudio = document.querySelector('audio');
var canvasTree=document.querySelector("#lovetree");
var birthday=document.querySelectorAll(".birthday");
var body=document.querySelector("body");

//阳历情人节
if(YangLiS=='214'){
	backAudio.src="data/music/月亮代表我的心伴奏.mp3";
	backAudio.play();
	content.style.backgroundImage="url(data/festival/others/grassland.jpg)";
	init("lovetree");
}

//农历
switch(NongLiS){
	//生日
	case "二月初六":
		backAudio.src="data/music/生日快乐.mp3";
		backAudio.play();
		content.style.backgroundImage='';
		canvasTree.style.display='none';
		body.style.backgroundColor="#ee9ca7";
		birthday.forEach(function(e){  
   			console.log(e);
   			e.style.display='block';
		});
		break;
	//七夕情人节
	case "七月初七":
		backAudio.src="data/music/月亮代表我的心伴奏.mp3";
		backAudio.play();
		content.style.backgroundImage="url(data/festival/others/grassland.jpg)";
		init("lovetree");
		break;
	//新年
	case "腊月三十":
		backAudio.src="data/music/月亮代表我的心伴奏.mp3";
		backAudio.play();
		content.style.backgroundImage="url(data/festival/others/grassland.jpg)";
		init("lovetree");
		break;
	//其他
	default:
		backAudio.src="data/music/月亮代表我的心伴奏.mp3";
		backAudio.play();
		content.style.backgroundImage="url(data/festival/others/grassland.jpg)";
		init("lovetree");
		break;
}

function init(canvasID){
	var canvas = document.querySelector("#"+canvasID);
    var ctx = canvas.getContext('2d')

    var W = canvas.width = document.body.clientWidth;
    var H = canvas.height = document.body.clientHeight;
	
    // rp([1, 3])  ==>  1 | 2 | 3
    // rp([3, 1], true)  ==> 1 - 3 之间随机的小数
    var rp = function (arr, uint){
      var min = Math.min(...arr)
      var max = Math.max(...arr)
      var ret = Math.random() * (max - min) + min
      return uint ? ret : Math.round(ret)
    }

    var maxBranch = 3

    tree(ctx, W/2, H/1.1, 70, -Math.PI/2, 14, 20)

    function tree(ctx, startX, startY, branchLen, angle, depth, branchWidth) {
      var endX = startX + branchLen * Math.cos(angle)
      var endY = startY + branchLen * Math.sin(angle)

      var color = (depth--) < maxBranch - 1 ? `rgb(0, ${rp([128, 196])}, 0)` : 'rgb(68, 50, 25)'

      ctx.save()
      ctx.lineCap = 'round'
      ctx.lineWidth = branchWidth
      ctx.strokeStyle = color
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
      ctx.restore()

      if (!depth) return

      var subBranches = rp([1, maxBranch])

      for (let i=0; i<subBranches; i++) {
        setTimeout(
          tree, 
          1314, 
          ctx, 
          endX, 
          endY,
          branchLen * rp([0.7, 1], true),
          angle + rp([-Math.PI/5, Math.PI/5], true),
          depth,
          branchWidth * 0.72
        )
      }
    }
}
