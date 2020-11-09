/*
*  wheel 类   实现轮播图的类
*
*  parents  父元素的元素节点
*  dataList  json   [{img:"图片的地址",url:"链接的地址"}]
*  time   轮播图间隔的时间
*
* */
function wheel(parents,dataList,time) {
    //指定轮播图缩放的位置
    this.parents=parents;
    if(!this.parents){
        console.error("父元素没有指定");
        return;
    }else if(parents.nodeType!==1){
        console.error("父元素的类型不是一个元素节点");
        return;
    }
    // 指定数据列表
    this.dataList=dataList;

    if(!this.dataList){
        console.error("没有指定轮播图的内容");
        return;
    }else if(typeof this.dataList!="object"){
        console.error("dataList的类型不对");
        return;
    }
    this.length=this.dataList.length;

    this.winW=parseInt(getComputedStyle(this.parents,null).width);
    // 间隔时间
    this.time=time||4000;
    // 指定布局方式
    this.layout="normal"  // 一张一张顺序动画 opacity
    // 指定动画方式
    this.runStyle="normal"  //  loop 循环    both 两边都能循环
    // 是否出现轮播按钮
    this.btnShow=true;
    // 是否出现左右两边的按钮
    this.btnSide=true;

    // 放置按钮的容器

    this.btnArr=[];
    // 放置 a的容器
    this.linkArr=[];
    // 放置 左右按钮的容器
    this.btnSideArr=[];
    //放置大容器的容器

    this.contanier=null;

    // 按钮的样式设定
    this.btnWidth=20;
    this.btnHeight=20;
    this.btnRadius=true;
    this.btnColor="#fff";
    this.btnActiveColor="#000";
    // 两边按钮的样式
    this.btnSideColor="red";

    // 按钮触发的动作

    this.btnHit="click"
}

wheel.prototype={
    // 初始化轮播图  创建轮播图的布局结构
    init:function () {
        // 先进行布局
        this["layout"+this.layout]();
        // 添加逻辑
        this.run();

    },
    run:function () {
        this["run"+this.layout+this.runStyle]()
    },

    runopacitynormal:function () {

        var that=this;
        var num=0;

        var t=setInterval(move,this.time);

        window.onblur=that.contanier.onmouseover=function () {
            clearInterval(t);
        }
        window.onfocus=that.contanier.onmouseout=function () {
            t=setInterval(move,that.time);
        }

        function move() {
            num++;
            if(num==that.linkArr.length){
                num=0;
            }
            //1. 所有的小容器透明度都变成 0
            for(var i=0;i<that.linkArr.length;i++){
                that.linkArr[i].style.opacity=0;
                that.btnArr[i].style.background=that.btnColor;
            }
            that.btnArr[num].style.background=that.btnActiveColor;
            animate(that.linkArr[num],{
                opacity:1
            },500,Tween.Linear);
        }


        for(var i=0;i<that.btnArr.length;i++){
            that.btnArr[i].index=i;
            that.btnArr[i]["on"+that.btnHit]=function () {
                num=this.index;

                for(var j=0;j<that.linkArr.length;j++){
                    that.linkArr[j].style.opacity=0;
                    that.btnArr[j].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;
                animate(that.linkArr[num],{
                    opacity:1
                },500,Tween.Linear);
            }


        }
        
        that.btnSideArr[0]["on"+that.btnHit]=function () {
            move();
        }
        that.btnSideArr[1]["on"+that.btnHit]=function () {
             num--;
             if(num<0){
                 num=that.btnArr.length-1;
             }
            //1. 所有的小容器透明度都变成 0
            for(var i=0;i<that.linkArr.length;i++){
                that.linkArr[i].style.opacity=0;
                that.btnArr[i].style.background=that.btnColor;
            }
            that.btnArr[num].style.background=that.btnActiveColor;
            animate(that.linkArr[num],{
                opacity:1
            },500,Tween.Linear);
        }
    },
    runnormalnormal:function () {

        var that=this;
        var num=0;
        function move() {
            num++;
            if(num==that.length){
                num=0;
            }


            animate(that.contanier,{
                marginLeft:-num*that.winW
            },500,Tween.Linear);
            for(var i=0;i<that.linkArr.length;i++){
                that.btnArr[i].style.background=that.btnColor;
            }
            that.btnArr[num].style.background=that.btnActiveColor;
        }
        var t=setInterval(move,this.time);
        window.onblur=that.contanier.onmouseover=function () {
            clearInterval(t);
        }
        window.onfocus=that.contanier.onmouseout=function () {
            t=setInterval(move,that.time);
        }

        for(var i=0;i<that.btnArr.length;i++){
            that.btnArr[i].index=i;
            that.btnArr[i]["on"+that.btnHit]=function () {
                num=this.index;

                for(var j=0;j<that.linkArr.length;j++){
                    that.btnArr[j].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;
                animate(that.contanier,{
                    marginLeft:-num*that.winW
                },500,Tween.Linear);
            }


        }

        that.btnSideArr[0]["on"+that.btnHit]=function () {
            move();
        }
        that.btnSideArr[1]["on"+that.btnHit]=function () {
            num--;
            if(num<0){
                num=that.btnArr.length-1;
            }
            //1. 所有的小容器透明度都变成 0
            for(var i=0;i<that.linkArr.length;i++){
                that.btnArr[i].style.background=that.btnColor;
            }
            that.btnArr[num].style.background=that.btnActiveColor;
            animate(that.contanier,{
                marginLeft:-num*that.winW
            },500,Tween.Linear);
        }


    },
    runnormalloop:function () {
        console.log("正常布局的 循环");
    },
    runnormalboth:function () {


        var that=this;
        that.btnArr[0].parentNode.style.display="none";
        var flag=true;
        that.btnSideArr[0]["on"+that.btnHit]=function () {
            if(!flag){
                return;
            }
            flag=false;
            move();

        }

        that.btnSideArr[1]["on"+that.btnHit]=function () {
            if(!flag){
                return;
            }
            flag=false;
            that.contanier.insertBefore(that.contanier.lastElementChild,that.contanier.firstElementChild);
            that.contanier.style.marginLeft=-that.winW+"px";
            animate(that.contanier,{
                marginLeft:0
            },500,Tween.Linear,function () {
                flag=true;
            });

        }

        window.onblur=that.contanier.onmouseover=function () {
            clearInterval(t);
        }
        window.onfocus=that.contanier.onmouseout=function () {
            t=setInterval(move,that.time);
        }

       var t= setInterval(move,this.time)

        function move() {
            animate(that.contanier,{
                marginLeft:-that.winW
            },500,Tween.Linear,function () {
                that.contanier.appendChild(that.contanier.firstElementChild);
                that.contanier.style.marginLeft=0;
                flag=true;
            })

        }

    },

    // 普通布局的方法
    layoutnormal:function () {
        //  先创建一个容器
        var container=document.createElement("div");
        this.contanier=container;
        // 给容器指定宽度和高度
        container.style.width=100*this.dataList.length+"%";
        container.style.height=100+"%";

        // 根据传入的数据循环创建子容器

        for(var i=0;i<this.dataList.length;i++){
            // 创建a为子容器
            var links=document.createElement("a");
            this.linkArr.push(links);
            // 指定a链接的样式
            links.style.cssText="width:"+100/this.dataList.length+"%;height:100%;float:left;"
            // 指定a链接的地址
            links.href=this.dataList[i].url;

            // 创建一个图片，准备放入a
            var img=document.createElement("img");
            // 指定一个图片的地址
            img.src=this.dataList[i].img;
            // 指定图片的宽高
            img.style.width="100%";
            img.style.height="100%";
            // 将图片放入a内
            links.appendChild(img);
            // 将a放入容器
            container.appendChild(links);
        }

        //创建按钮
        if(this.btnShow) {
            this.createBtn();
        }
        // 创建两边的按钮
        if(this.btnSide){
            this.createSideBtn();
        }
        // 将容器放入窗口
        this.parents.appendChild(container);

    },
    // 透明度布局的方法
    layoutopacity:function () {
        var container=document.createElement("div");
        this.contanier=container;
        container.style.width=100+"%";
        container.style.height=100+"%";
        container.style.position="relative";
        container.style.left=0;
        container.style.top=0;
        for(var i=0;i<this.length;i++){
            var links=document.createElement("a");
            this.linkArr.push(links);
            links.style.cssText="width:100%;height:100%;position:absolute;left:0;top:0"
            links.href=this.dataList[i].url;
            if(i==0){
                links.style.zIndex=1;
            }

            var img=document.createElement("img");
            img.src=this.dataList[i].img;
            img.style.width="100%";
            img.style.height="100%";
            links.appendChild(img);
            container.appendChild(links);
        }
        //创建按钮
        if(this.btnShow) {
            this.createBtn();
        }
        // 创建两边的按钮

        if(this.btnSide){
            this.createSideBtn();
        }

        this.parents.appendChild(container);
    },
    createBtn:function () {
        //创建一个按钮的容器
        var btnBox=document.createElement("div");

        btnBox.style.cssText="position:absolute;left:0;right:0;margin:auto;bottom:50px;z-index:2";
        btnBox.style.width=(this.length*2)*this.btnWidth+"px";
        btnBox.style.height=this.btnHeight+"px";
        btnBox.style.position="absolute";
        this.parents.style.position="relative";


        for(var i=0;i<this.length;i++){
            var btn=document.createElement("div");

            btn.style.cssText="width:"+this.btnWidth+"px;height:"+this.btnHeight+"px;background:"+this.btnColor+";float:left;margin-left:"+this.btnWidth+"px;cursor:pointer"
            if(this.btnRadius){
                btn.style.borderRadius="100%";
            }
            if(i==0){
                btn.style.background=this.btnActiveColor;
            }
            this.btnArr.push(btn);
            btnBox.appendChild(btn);
        }
        this.parents.appendChild(btnBox);
    },

    createSideBtn(){
        var leftBtn=document.createElement("div");
        leftBtn.innerHTML="<";
        leftBtn.style.cssText="z-index:2;position:absolute;left:10px;margin:auto;bottom:0;top:0;cursor:pointer;width:30px;height:30px;font-size:30px;text-align:center;line-height:30px;color:"+this.btnSideColor;

        var rightBtn=document.createElement("div");
        rightBtn.innerHTML=">";
        rightBtn.style.cssText="z-index:2;position:absolute;right:10px;margin:auto;bottom:0;top:0;cursor:pointer;width:30px;height:30px;font-size:30px;text-align:center;line-height:30px;color:"+this.btnSideColor;
        this.parents.appendChild(leftBtn);
        this.parents.appendChild(rightBtn);

        this.leftBtn=leftBtn;
        this.rightBtn=rightBtn;
        this.btnSideArr.push(leftBtn);
        this.btnSideArr.push(rightBtn);
    }

}