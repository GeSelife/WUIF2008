function drag(selector) {
    if(!selector){
        console.error('未输入元素名');
    }

    this.obj=document.querySelector(selector);
    
    //控制在x/y方向运动
    this.x=true;
    this.y=true;

    //控制运动范围
    this.range={x1:"",x2:"",y1:"",y2:""};



}

drag.prototype={
    move:function () {
        var that=this;
        this.obj.onmousedown=function(ev){
            //事件源相对于具有定位属性的前辈元素
            var oX=that.obj.offsetLeft;
            var oY=that.obj.offsetTop;
            //鼠标相对于浏览器
            var startX=ev.clientX;
            var startY=ev.clientY;
            //不变的宽度和
            var downX=startX-oX;
            var downY=startY-oY;

            document.onmousemove=function (ev) {
                var moveX=ev.clientX;
                var moveY=ev.clientY;
                var left=moveX-downX;
                var top=moveY-downY;
                //控制移动范围
                if(that.range.x1!==""){
                    if(left<that.range.x1){
                        left=that.range.x1;
                    }
                }
                if(that.range.x2!==""){
                    if(left>that.range.x2){
                        left=that.range.x2;
                    }
                }
                if(that.range.y1!==""){
                    if(top<that.range.y1){
                        top=that.range.y1;
                    }
                }
                if(that.range.y2!==""){
                    if(top>that.range.y2){
                        top=that.range.y2;
                    }
                }

                //控制移动方向
                if(that.x){
                    that.obj.style.left=left+'px';
                }
                if(that.y){
                    that.obj.style.top=top+'px';
                }


            }
            ev.preventDefault();
        }
        document.onmouseup=function () {
            document.onmousemove=null;
            document.onmouseup=null;
        }
    }
}