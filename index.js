/**
 * Created by c1 on 2016/4/11.
 */
var main = document.querySelector("#box");
var oLis = document.querySelectorAll("#ul1>li");
var winW=window.innerWidth;
var winH=window.innerHeight;

var desW = 640;
var desH = 960;
if(desW/desH<winW/winH){
    main.style.webkitTransform = 'scale('+winW/desW+')';
}else{
    main.style.webkitTransform = 'scale('+winH/desH+')';
}

[].forEach.call(oLis,function(){
    arguments[0].index=arguments[1];
    arguments[0].addEventListener('touchstart',start,false);
    arguments[0].addEventListener('touchmove',move,false);
    arguments[0].addEventListener('touchend',end,false);
});
function start(e) {
    this.startTouch = e.changedTouches[0].pageY;
}
function move(e) {
    this.flag = true
    var moveTouch = e.changedTouches[0].pageY;
    var pos = moveTouch - this.startTouch;
    var index = this.index;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=index){
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id="";
    });

    if (pos > 0) {
        this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winH+pos;

    } else if (pos) {
        this.prevSIndex = (index == oLis.length-1 ? 0 : index + 1);
        var duration = winH+pos;
    }
    oLis[this.prevSIndex].style.display = "block";
    oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    oLis[this.prevSIndex].className="zIndex";
    oLis[index].style.webkitTransform = "scale("+(1-Math.abs(pos)/winH*1/2)+") translate(0,"+pos+"px)";
}
function end(e) {
    if(this.flag){
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition = "0.7s";
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
            this.firstElementChild.id="a"+this.index;

        }, false)
    }
}

document.addEventListener("touchmove",function(){
},false);

