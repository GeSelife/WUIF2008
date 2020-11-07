window.onload=function () {
    //var im=new Image()   im.onload 图片加载
    //获取小图的每一个
    //当鼠标移入小图的时候  改变样式
    //鼠标移入小图 改变中图和大图的图片
    //鼠标移入中图 显示大图
    //鼠标在中图中移动 大图的显示区域根据遮罩层在中图中移动的距离按比例移动

    //定义一个变量 获取每一个小图元素
    var smallList=document.querySelectorAll('.small li');
    //定义一个变量 获取大图的盒子
    var bigBox=document.querySelector('.bigBox');
    //定义一个变量 获取中图
    var middleImg=document.querySelector('.middleImg img');
    //定义一个变量 获取大图
    var bigImg=document.querySelector('.bigBox img');
    //定义一个变量 获取遮罩层
    var mask=document.querySelector('.mask');
    //定义一个变量 获取因解决事件流带来的问题而添加的元素  该元素处于中图之上,与中图大小一致
    var copy=document.querySelector('.copy');


    //小图关联中图和大图
    //循环遍历每一张小图
    for(var i=0;i<smallList.length;i++){
        //在每一小图上添加一个index属性用来存取当前的下标
        smallList[i].index=i;
        //每一张小图添加移入事件
        smallList[i].onmouseover=function(){
            //让每一张图的边框都为默认的值
            for(var j=0;j<smallList.length;j++){
                smallList[j].style.border="2px solid red";
            }
            //鼠标移入谁,让谁的边框变
            this.style.border="2px solid #000";

            //动态获取与小图相对应的中图的地址  (this.index+1)加括号是因为---优先级原因 不加括号会输出Img/middle下标1
            middleImg.src="Img/middle"+(this.index+1)+".jpg";
            //动态获取与小图相对应的大图的地址
            bigImg.src="Img/big"+(this.index+1)+".jpg";
        }
    }

    //鼠标移入中图 显示大图和遮罩层
    copy.onmouseover=function() {
        bigBox.style.display='block';
        mask.style.display='block';
    }
    //鼠标移出中图 隐藏大图和遮罩层
    copy.onmouseout=function() {
        bigBox.style.display='none';
        mask.style.display='none';
    }

    //实现放大镜效果
    //鼠标在copy内移动时候
    copy.onmousemove=function (ev) {
        //获取鼠标相对于事件源的位置
        var startX=ev.offsetX;
        var startY=ev.offsetY;

        //遮罩层移动的距离=鼠标相对于事件源的距离减去遮罩层宽高的一半
        var x=startX-mask.offsetWidth/2;
        var y=startY-mask.offsetHeight/2;
        //判断遮罩层移动的边界
        //当遮罩层的left值<0的时候，让它=0
        if(x<0){
            x=0;
        }
        //当遮罩层的top值<0的时候，让它=0
        if(y<0){
            y=0;
        }
        //当遮罩层的left值>中图的宽度减去它本身的宽度的时候，让它=中图的宽度减去它本身的宽度
        if(x>copy.offsetWidth-mask.offsetWidth){
            x=copy.offsetWidth-mask.offsetWidth;
        }
        //当遮罩层的top值>中图的高度减去它本身的高度的时候，让它=中图的高度减去它本身的高度
        if(y>copy.offsetHeight-mask.offsetHeight){
            y=copy.offsetHeight-mask.offsetHeight;
        }
        //遮罩层的距离
        mask.style.left=x+'px';
        mask.style.top=y+'px';
        //设置大图的移动距离 遮罩层移动多少距离,大图就移动相对比例的位置
        bigImg.style.left=-x*(copy.offsetWidth/mask.offsetWidth)+"px";
        bigImg.style.top=-y*(copy.offsetHeight/mask.offsetHeight)+"px";
    }


}