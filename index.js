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
    this.pageY= e.changedTouches[0].pageY;//��ָ�������Y������
}
function move(e){
    e.preventDefault();//��ֹĬ����Ϊ
    var touchMove= e.changedTouches[0].pageY;//������Y������
    var changePos=touchMove-this.pageY;//�����ľ���
    var cur=this.index;//��ǰ����
    var step=1/2;
    var scalePos=(Math.abs(changePos)/winH)*step;//����
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
    oLis[this.preSIndex].style.webkitTransform="translate(0,"+pos+"px)";//����һ�ų����ľ�������һ����ľ���
    oLis[this.preSIndex].className="zIndex";
    oLis[this.preSIndex].style.display="block";//����һ����ʾ��
    oLis[cur].style.webkitTransform="scale("+(1-scalePos)+") translate(0,"+changePos+"px)";
    //�õ�ǰ��ͼƬ���ǵĸߵ����һ����ľ���


}
function end(e){
    oLis[this.preSIndex].style.webkitTransform="translate(0,0)";//����һ��ͼƬ��������ʾ
    oLis[this.preSIndex].style.webkitTransition="0.5s";//����һ��ͼƬ0.5s�Ĺ���Ч��
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd',function(){
        this.style.webkitTransition="";
        this.firstElementChild.id="a"+(this.index+1);
    })

}
document.addEventListener("touchstart",function(){

},false)