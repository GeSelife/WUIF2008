    /*
    *
    * wheel(parents,containerList,time)
    * parents  父元素  内容要放入的位置的元素  窗口
    * containerList   [{img:'图片地址',url:'链接地址'}]   要轮播的图片
    * time    轮播的间隔时间
    *
    * */

    function wheel(parents,dataList,time) {
        //父容器
        this.parents=parents;
        if(!this.parents){
            console.error('未传入父元素');
        }else if(typeof this.parents!="object"){
            console.error('传入的父元素类型不正确');
        }
        //传入的信息
        this.dataList=dataList;
        if(!this.dataList){
            console.error('未传入内容');
        }
        //图片数量
        this.length=this.dataList.length;
        //动画间隔时间
        this.time=time||4000;
        //布局方式
        this.layout='normal'; //默认值 normal 从左到右布局  opacity 透明度方式布局
        //按钮
        this.btnShow=true; //默认值 true 显示按钮  false 不显示
        this.btnWidth=20; //设置按钮的宽度
        this.btnHeight=20; //设置按钮的高度
        this.btnColor='#000'; //设置按钮未点击时候的颜色
        this.btnActiveColor='#fff'; //设置按钮点击时的颜色
        this.btnRadius=true; //设置按钮的radius值  默认值true 设置按钮圆角
        //两边按钮
        this.btnSide=true; //默认值 true 显示两边按钮  false 不显示

        //运动方式
        this.runStyle='normal'; // normal loop both
        // runopacitynormal   //透明度叠加的正常运动
        // runnormalnormal   //正常布局的正常运动 拉回来
        // runnormalloop   //正常布局的循环运动 最后添加第一张,瞬间回到第一张
            // 1.分为两种布局--对应左右两边的按钮 runnormalloopleft/runnormalloopright
        this.style='left'; //两种布局 一种左边按钮 一种右边按钮 right
        // runnormalboth   //正常布局的双循环运动

        //放置按钮的容器
        this.btnArr=[];
        //放置左右按钮的容器
        this.btnSideArr=[];
        //放置a的容器
        this.linkAArr=[];
        //大的容器的容器
        this.boxArr=null;

        //事件触发方式
        this.btnHit='click';//默认为click
        //窗口的宽度
        this.winW=parseInt(getComputedStyle(this.parents,null).width);


    }






    wheel.prototype={
        //初始化
        init:function () {
            //布局
            this['layout'+this.layout]();
            //逻辑
            this.run()
        },
        //运动
        run:function(){
            //根据传入的值确认进行哪种轮播
            this["run"+this.layout+this.runStyle]();
        },
        //透明度布局 正常运动
        runopacitynormal:function(){
            var num=0;
            var that=this;

            //鼠标移入和失去焦点事件
            that.parents.onmouseover=window.onblur=function(){
                clearInterval(t);
            }
            //鼠标移出和获取焦点事件
            that.parents.onmouseout=window.onfocus=function(){
                t=setInterval(move,that.time);
            }

            function move() {
                num++;
                if(num==that.linkAArr.length){
                    num=0;
                }
                for(var i=0;i<that.linkAArr.length;i++){
                    that.linkAArr[i].style.opacity=0;
                    that.btnArr[i].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;
                animation(that.linkAArr[num],{
                    opacity:1
                },500,Tween.Linear,function () {
                    flag=true;
                })
            }
            var t=setInterval(move,that.time);

            //点击按钮事件
            for(var i=0;i<that.btnArr.length;i++){
                that.btnArr[i].index=i;
                that.btnArr[i]["on"+that.btnHit]=function () {
                    num=this.index;
                    for(var j=0;j<that.btnArr.length;j++) {
                        that.linkAArr[j].style.opacity=0;
                        that.btnArr[j].style.background=that.btnColor;
                    }
                    that.btnArr[num].style.background=that.btnActiveColor;
                    animation(that.linkAArr[num],{
                        opacity:1
                    },500,Tween.Linear)

                }
            }

            //两边按钮点击事件
            var flag=true;
            //左边
            that.btnSideArr[0]["on"+that.btnHit]=function () {
                if(!flag){
                    return;
                }
                flag=false;
                move();
            }
            //右边
            that.btnSideArr[1]["on"+that.btnHit]=function () {
                if(!flag){
                    return;
                }
                flag=false;
                num--;
                if(num<0){
                    num=that.btnArr.length-1;
                }
                for(var i=0;i<that.linkAArr.length;i++){
                    that.linkAArr[i].style.opacity=0;
                    that.btnArr[i].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;
                animation(that.linkAArr[num],{
                    opacity:1
                },500,Tween.Linear,function () {
                    flag=true;
                })
            }
        },
        //正常布局 正常运动
        runnormalnormal:function(){

            var num=0;
            var that=this;

            //鼠标移入和失去焦点事件
            that.parents.onmouseover=window.onblur=function(){
                clearInterval(t);
            }
            //鼠标移出和获取焦点事件
            that.parents.onmouseout=window.onfocus=function(){
                t=setInterval(move,that.time);
            }

            function move() {
                num++;
                if(num==that.linkAArr.length){
                    num=0;
                }

                animation(that.boxArr,{
                    marginLeft:-num*that.winW
                },500,Tween.Linear,function () {
                    flag=true;
                })
                for(var i=0;i<that.linkAArr.length;i++){
                    that.btnArr[i].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;
            }
            var t=setInterval(move,that.time);

            //点击按钮事件
            for(var i=0;i<that.btnArr.length;i++){
                that.btnArr[i].index=i;
                that.btnArr[i]["on"+that.btnHit]=function () {
                    num=this.index;

                    for(var j=0;j<that.btnArr.length;j++) {
                        that.btnArr[j].style.background=that.btnColor;
                    }
                    that.btnArr[num].style.background=that.btnActiveColor;
                    animation(that.boxArr,{
                        marginLeft: -num*that.winW
                    },500,Tween.Linear)

                }
            }

            //两边按钮点击事件
            var flag=true;
            //左边
            that.btnSideArr[0]["on"+that.btnHit]=function () {
                if(!flag){
                    return;
                }
                flag=false;
                move();
            }
            //右边
            that.btnSideArr[1]["on"+that.btnHit]=function () {
                if(!flag){
                    return;
                }
                flag=false;
                num--;
                if(num<0){
                    num=that.btnArr.length-1;
                }

                for(var i=0;i<that.linkAArr.length;i++){
                    that.btnArr[i].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;
                animation(that.boxArr,{
                    marginLeft:-num*that.winW
                },500,Tween.Linear,function () {
                    flag=true;
                })
            }
        },
        //正常布局 循环运动
        runnormalloop:function(){
            this["runnormalloop"+this.style]();
            // var that=this;
            // var num=0;
            //
            // //父元素的宽改变
            // that.boxArr.style.width=100*(that.linkAArr.length+1)+'%';
            // //把第一个元素克隆一份
            // var newlinkA=that.boxArr.firstElementChild.cloneNode(true);
            // //给克隆上的linkA添加到linkAArr数组容器里面
            // that.linkAArr.push(newlinkA);
            // //给克隆上的linkA设置样式
            // newlinkA.style.float='left';
            //
            // //把第一个元素克隆的元素添加到父元素的最后一个
            // that.boxArr.appendChild(newlinkA);
            //
            // //改变每一个a容器的宽度
            // for(var i=0;i<that.linkAArr.length;i++){
            //     that.linkAArr[i].style.width=100/(that.linkAArr.length)+'%';
            // }

            //鼠标移入移出、获取失去焦点
            window.onblur=that.parents.onmouseover=function () {
                clearInterval(t);
            }
            window.onfocus=that.parents.onmouseout=function () {
                t=setInterval(move,1000);
            }

            //自动循环
            function move() {
                num++;

                if(num==that.linkAArr.length-1){
                    animation(that.boxArr,{
                        marginLeft:-num*that.winW
                    },500,Tween.Linear,function () {
                        that.boxArr.style.marginLeft=0;
                    })
                    num=0
                }else{
                    animation(that.boxArr,{
                        marginLeft:-num*that.winW
                    },500,Tween.Linear)
                }

                //轮播点事件
                for(var i=0;i<that.btnArr.length;i++){
                    that.btnArr[i].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;

            }
            var t=setInterval(move,1000);

            // if(that.btnSideArr[0]['on'+that.btnHit]){
            //     that.leftOn();
            //     that["runnormalloop"+]
            //
            // }

            //两侧按钮事件
            //点击左边按钮
            that.btnSideArr[0]['on'+that.btnHit]=function () {
                num++;
                if(num==that.linkAArr.length-1){
                    animation(that.boxArr,{
                        marginLeft:-num*that.winW
                    },500,Tween.Linear,function () {
                        that.boxArr.style.marginLeft=0;
                    })
                    num=0
                }else{
                    animation(that.boxArr,{
                        marginLeft:-num*that.winW
                    },500,Tween.Linear)
                }

                //轮播点事件
                for(var i=0;i<that.btnArr.length;i++){
                    that.btnArr[i].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;
            }
            // //点击右边按钮
            that.btnSideArr[1]['on'+that.btnHit]=function () {
                // that.boxArr.removeChild(that.boxArr.lastElementChild);
                // that.boxArr.lastElementChild=null;
                //
                // var newLast=that.boxArr.lastElementChild.cloneNode(true);
                // that.boxArr.insertBefore(newLast,that.boxArr.firstElementChild);
                num--;
                if(num==0){
                    animation(that.boxArr,{
                        marginLeft:-num*that.winW
                    },500,Tween.Linear,function () {
                        that.boxArr.style.marginLeft=-(that.linkAArr.length-1)*that.winW+'px';
                    });
                    num=that.linkAArr.length-1;
                }else{
                    animation(that.boxArr,{
                        marginLeft:-num*that.winW
                    },500,Tween.Linear)
                }

                //轮播点事件
                for(var i=0;i<that.btnArr.length;i++){
                    that.btnArr[i].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;

            }

            //点击轮播点事件
            for(var i=0;i<that.btnArr.length;i++){
                for(var j=0;j<that.btnArr.length;j++){
                    that.btnArr[j].style.background=that.btnColor;
                }
                that.btnArr[num].style.background=that.btnActiveColor;

            }
        },
        //循环运动的正常布局
        runnormalloopleft:function(){
            var that=this;
            var num=0;



            //父元素的宽改变
            that.boxArr.style.width=100*(that.linkAArr.length+1)+'%';
            //把第一个元素克隆一份
            var newlinkA=that.boxArr.firstElementChild.cloneNode(true);
            //给克隆上的linkA添加到linkAArr数组容器里面
            that.linkAArr.push(newlinkA);
            //给克隆上的linkA设置样式
            newlinkA.style.float='left';

            //把第一个元素克隆的元素添加到父元素的最后一个
            that.boxArr.appendChild(newlinkA);

            //改变每一个a容器的宽度
            for(var i=0;i<that.linkAArr.length;i++){
                that.linkAArr[i].style.width=100/(that.linkAArr.length)+'%';
            }
        },
        runnormalloopright:function(){
            var that=this;
            var num=0;

            //父元素的宽改变
            that.boxArr.style.width=100*(that.linkAArr.length+1)+'%';
            that.boxArr.style.marginLeft=-that.winW+'px';
            //把第一个元素克隆一份
            var newlinkA=that.boxArr.lastElementChild.cloneNode(true);
            //给克隆上的linkA添加到linkAArr数组容器里面
            that.linkAArr.unshift(newlinkA);
            //给克隆上的linkA设置样式
            newlinkA.style.float='left';

            //把第一个元素克隆的元素添加到父元素的第一个元素之前
            that.boxArr.insertBefore(newlinkA,that.boxArr.firstElementChild);

            //改变每一个a容器的宽度
            for(var i=0;i<that.linkAArr.length;i++){
                that.linkAArr[i].style.width=100/(that.linkAArr.length)+'%';
            }
        },

        //正常布局 双循环运动  通过节点
        runnormalboth:function(){
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
                that.boxArr.insertBefore(that.boxArr.lastElementChild,that.boxArr.firstElementChild);
                that.boxArr.style.marginLeft=-that.winW+"px";
                animation(that.boxArr,{
                    marginLeft:0
                },500,Tween.Linear,function () {
                    flag=true;
                });

            }

            window.onblur=that.parents.onmouseover=function () {
                clearInterval(t);
            }
            window.onfocus=that.parents.onmouseout=function () {
                t=setInterval(move,that.time);
            }

            var t= setInterval(move,this.time)

            function move() {
                animation(that.boxArr,{
                    marginLeft:-that.winW
                },500,Tween.Linear,function () {
                    that.boxArr.appendChild(that.boxArr.firstElementChild);
                    that.boxArr.style.marginLeft=0;
                    flag=true;
                })

            }
        },



        //普通布局
        layoutnormal:function () {
            //创建容器
            var box=document.createElement('div');
            this.boxArr=box;
            //设置宽高
            box.style.height=100+'%';
            box.style.width=100*this.length+'%';
            //创建子容器 有几个dataList值 就创建几个子容器
            for(var i=0;i<this.length;i++){
                var linkA=document.createElement('a');
                //指定样式
                linkA.style.cssText="width:"+100/this.length+"%;height:100%;float:left;";
                //把传入的链接地址赋值给a的调转链接
                linkA.href=this.dataList[i].url;

                //创建图片
                var img=document.createElement("img");
                //把传入的图片地址赋值给img地址
                img.src=this.dataList[i].img;
                //指定图片宽高
                img.style.width='100%';
                img.style.height='100%';
                //把图片放入a
                linkA.appendChild(img);
                //把linkA都放到按钮容器里
                this.linkAArr.push(linkA);
                //把a放入box容器
                box.appendChild(linkA);
            }
            //创建按钮
            if(this.btnShow){
                this.createBtn();
            }

            //创建两边的按钮
            if(this.btnSide){
                this.createbtnSide();
            }

            //把box容器放入parents容器
            this.parents.appendChild(box);
        },
        //透明度布局
        layoutopacity:function () {
            //创建容器
            var box=document.createElement('div');
            this.boxArr=box;

            //设置宽高及其他属性
            box.style.height=100+'%';
            box.style.width=100*this.length+'%';
            box.style.position='relative';
            box.style.left=0;
            box.style.top=0;

            //创建子容器 有几个dataList值 就创建几个子容器
            for(var i=0;i<this.length;i++){
                var linkA=document.createElement('a');
                //指定样式
                linkA.style.cssText="width:"+100/this.length+"%;height:100%;position:absolute;top:0;left:0;";
                //把传入的链接地址赋值给linkA的链接
                linkA.href=this.dataList[i].url;

                //创建图片
                var img=document.createElement("img");
                img.src=this.dataList[i].img;
                //指定图片宽高
                img.style.width='100%';
                img.style.height='100%';
                //把第一张放在最上面
                if(i==0){
                    linkA.style.zIndex=1;
                }
                //把图片放入a容器
                linkA.appendChild(img);
                //把linkA都放到按钮容器里
                this.linkAArr.push(linkA);
                //把a放入box容器
                box.appendChild(linkA);
            }
            //创建按钮
            if(this.btnShow){
                this.createBtn();
            }
            //创建两边的按钮
            if(this.btnSide){
                this.createbtnSide();
            }
            //把box容器放入parents容器
            this.parents.appendChild(box);
        },
        //创建按钮
        createBtn:function () {
            //创建一个按钮的容器
            var btnBox=document.createElement('div')
            //给按钮容器添加样式
            btnBox.style.cssText="position:absolute;bottom:20px;left:0;right:0;margin:auto;z-index:2;"
            //给按钮容器设置宽高
            btnBox.style.width=(this.length*2)*this.btnWidth+"px";
            btnBox.style.height=this.btnHeight+"px";
            //给窗口容器设置定位 不会影响布局
            this.parents.style.position="relative";


            //按钮
            for (var i=0;i<this.length;i++){
                //创建按钮-- 有多少dataList值有多少按钮
                var btn=document.createElement('div');
                //给按钮设置属性
                btn.style.cssText="cursor:pointer;width:"+this.btnWidth+"px;height:"+this.btnHeight+"px;background:"+this.btnColor+";float:left;margin-left:"+this.btnWidth+"px;";
                //判断是否需要圆角
                if(this.btnRadius){
                    btn.style.borderRadius="100%";
                }
                //默认第一个选中 设置默认样式
                if(i==0){
                    btn.style.backgroundColor=this.btnActiveColor;
                }
                //把每个按钮都放到按钮容器里
                this.btnArr.push(btn);
                //把按钮添加到按钮容器中
                btnBox.appendChild(btn);
            }
            //把按钮容器添加到窗口
            this.parents.appendChild(btnBox);

        },
        //创建两边的按钮
        createbtnSide:function () {
            var btnLeft=document.createElement('div');
            btnLeft.innerHTML="&lt;";
            btnLeft.style.cssText="cursor:pointer;z-index:2;width:30px;height:30px;position:absolute;left:20px;top:0;bottom:0;margin:auto;text-align:center;line-height:30px;font-size:25px;"

            // this.parents.style.position="relative";
            this.parents.appendChild(btnLeft);

            var btnRight=document.createElement('div');
            btnRight.innerHTML="&gt;";
            btnRight.style.cssText="cursor:pointer;z-index:2;width:30px;height:30px;position:absolute;right:20px;top:0;bottom:0;margin:auto;text-align:center;line-height:30px;font-size:25px;"

            this.parents.appendChild(btnRight);

            // this.leftBtn=leftBtn;
            // this.rightBtn=rightBtn;
            //把两边按钮都放到按钮容器里
            this.btnSideArr.push(btnLeft);
            this.btnSideArr.push(btnRight);

        }

    }





