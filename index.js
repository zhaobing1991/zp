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
function start(e){
    this.pageY= e.changedTouches[0].pageY;//手指触摸点的Y轴坐标
}
function move(e){
    e.preventDefault();//阻止默认行为
    var touchMove= e.changedTouches[0].pageY;//滑过的Y轴坐标
    var changePos=touchMove-this.pageY;//滑过的距离
    var cur=this.index;//当前索引
    var step=1/2;
    var scalePos=(Math.abs(changePos)/winH)*step;//比例
    [].forEach.call(oLis,function(){

        if(arguments[1]==cur){
            arguments[0].className="zIndex";
            arguments[0].style.display="block";
            arguments[0].id="a"+(this.index+1);
        }
        if(arguments[1]!=cur){
            arguments[0].style.display="none";

        }
        arguments[0].className="";
        arguments[0].firstElementChild.id="";
    })
    if(changePos>0){
        var pos=-winH+changePos;
        this.preSIndex=cur==0?oLis.length-1:cur-1;

    }else if(changePos<0){
        var pos=winH+changePos;
        this.preSIndex=cur==oLis.length-1?0:cur+1;

    }
    oLis[this.preSIndex].style.webkitTransform="translate(0,"+pos+"px)";//让上一张出来的距离等于我滑过的距离
    oLis[this.preSIndex].className="zIndex";
    oLis[this.preSIndex].style.display="block";//让上一张显示；
    oLis[cur].style.webkitTransform="scale("+(1-scalePos)+") translate(0,"+changePos+"px)";
    //让当前的图片可是的高等于我滑过的距离


}
function end(e){
    oLis[this.preSIndex].style.webkitTransform="translate(0,0)";//让上一张图片完整的显示
    oLis[this.preSIndex].style.webkitTransition="0.5s";//给上一张图片0.5s的过度效果
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd',function(){
        this.style.webkitTransition="";
        this.firstElementChild.id="a"+(this.index+1);
    })

}
document.addEventListener("touchstart",function(){

},false)