window.onload=function () {
    var samllList=document.querySelectorAll('.small li');
    var middleImg=document.querySelector('.middleImg img');
    var bigImg=document.querySelector('.bigBox img');
    var bigBox=document.querySelector('.bigBox');
    var mask=document.querySelector('.mask');
    var copy=document.querySelector('.copy');

    for(var i=0;i<samllList.length;i++){
        samllList[i].index=i;
        samllList[i].onmouseover=function () {
            for(var j=0;j<samllList.length;j++){
                samllList[j].style.border="2px solid red";
            }

            this.style.border="2px solid #000";
            //更改中图和大图的图片
            middleImg.src="Img/middle"+(this.index+1)+".jpg";
            bigImg.src="Img/big"+(this.index+1)+".jpg";

        }
    }

    copy.onmouseover=function () {
        //显示大
        bigBox.style.display="block";
        //显示遮罩层
        mask.style.display="block";

    }

    copy.onmouseout=function () {
        //隐藏大
        bigBox.style.display="none";
        //隐藏遮罩层
        mask.style.display="none";
    }

    //移动事件
    copy.onmousemove=function (ev) {
        //鼠标距离事件源的位置
        var oX=ev.offsetX;
        var oY=ev.offsetY;

        var x=oX-mask.offsetWidth/2;
        var y=oY-mask.offsetHeight/2;

        if(x<0){
            x=0;
        }
        if(y<0){
            y=0;
        }
        if(x>copy.offsetWidth-mask.offsetWidth){
            x=copy.offsetWidth-mask.offsetWidth;
        }
        if(y>copy.offsetHeight-mask.offsetHeight){
            y=copy.offsetHeight-mask.offsetHeight;
        }
        mask.style.left=x+'px';
        mask.style.top=y+'px';
        //大图跟着遮罩走
        bigImg.style.left=-x*(copy.offsetWidth/mask.offsetWidth)+'px';
        bigImg.style.top=-y*(copy.offsetHeight/mask.offsetHeight)+'px';
    }







}