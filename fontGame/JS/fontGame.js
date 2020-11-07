function game() {
    //定义种子
    var seed="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //将种子转为数组结构
    this.seedArr=seed.split("");
    //随机生成num个数字
    this.currentLetter=[];
    //进度条
    this.progressBar=null;
    //"Img/"+im.src+".png"
    this.imgBox=["Img/1.png","Img/2.png","Img/3.png","Img/start.png","Img/next.png","Img/startActive.png","Img/cloud.png","Img/gameBG.jpg","Img/restart.png"];
    //随机生成指定数目图片
    this.num=5;
    //字母下坠的速度
    this.speed=1;
    //存随机生成的图片
    this.imgArr=[];
    //图片落下循环
    this.t=null;
    //生命值
    this.life=10;
    //分数
    this.score=0


    // 进度条的对象
    this.progressBar=null;
    // 遮罩对象
    this.bgMask=null;

    this.nextBtn=null;
    this.restartBtn=null;

    // 数字的对象
    this.numBox=null;

    // 生命值的容器

    this.lifeEle=null;
}

game.prototype={
    //出现进度条事件
    progress:function(){
        //遮罩层--背景
        var pgMask=document.createElement('div');
        this.pgMask=pgMask;
        pgMask.style.cssText="width:100%;height:100%;background:rgba(0,0,0,0.5)";
        //进度条容器
        var progressBox=document.createElement('div');
        progressBox.style.cssText="width:50%;height:10px;border:1px solid #fff;border-radius:5px;background:#fff;box-shadow:0 0 8px #000;position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;"
        //创建进度条
        var progressBar=document.createElement('div');
        this.progressBar=progressBar;
        progressBar.style.cssText="width:0;height:100%;border-radius:5px;background:#CBCBCB";
        //预加载图片
        var that=this;
        var num=0;
        for(var i=0;i<that.seedArr.length;i++) {
            //加载完成的图片地址放入数组中
            that.imgBox.push("Img/" + that.seedArr[i] + ".png");


        }

        for(var i=0;i<that.imgBox.length;i++){
            //图片预加载
            var im=new Image();
            //加载中要干的事情
            im.onload = function () {
                num++;
                that.progressBar.style.width = num / (that.imgBox.length) * 100 + '%';
                //进度条完成让页面隐藏
                if(num==that.imgBox.length){
                    that.pgMask.style.display="none";
                    //进入开始界面
                    that.startBtn();

                }
            }
            //加载完输出图片地址
            for (var s in that.imgBox) {
                im.src=that.imgBox[s];
            }
        }

        progressBox.appendChild(progressBar)
        pgMask.appendChild(progressBox);
        document.body.appendChild(pgMask);
    },

    //开始按钮
    startBtn:function () {
        //添加背景
        var startBG=document.createElement("div");
        startBG.style.cssText="width:100%;height:100%;background:url('Img/gameBG.jpg') no-repeat center;"
        startBG.style.backgroundSize='cover';
        //添加云
        var cloud=document.createElement('div');
        // cloud.src="Img/cloud.png";
        cloud.style.cssText="width:80%;height:160px;z-index:999;position:absolute;left:0;right:0;top:20;margin:auto;background:url(Img/cloud.png) no-repeat center;"
        cloud.style.backgroundSize="cover";
        cloud.className='cloud';

        document.body.appendChild(cloud);

        //开始按钮
        var startBtn=document.createElement('div');
        startBtn.style.cssText="cursor:pointer;pointer;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:297px;height:144px;"
        startBtn.style.background="url('Img/start.png') no-repeat center";
        startBtn.className='startBtn';

        //创建style标签
        var style=document.createElement('style');
        style.innerHTML=`
            .startBtn:hover{
                background: url("Img/startActive.png") no-repeat center !important;
            }
        `;

        document.body.appendChild(style);

        var that=this;
        startBtn.onclick=function(){
            startBtn.style.display='none';
            var numImg=document.createElement('img');
            numImg.src="Img/3.png";
            numImg.style.cssText=`
            cursor:pointer;
            position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;
        `;
            var num=3;
            var t=setInterval(function () {
                // num--;
                if(num==2){
                    numImg.src="Img/2.png";
                }else if(num==1){
                    numImg.src="Img/1.png";
                }else if(num==0){
                    numImg.style.display="none";
                    clearInterval(t);
                    that.startGame();
                }

                num--;

            },1000)
            document.body.appendChild(numImg);

        }

        document.body.appendChild(startBtn);
        document.body.appendChild(startBG);
    },

    //开始游戏
    startGame:function () {
        this.createLetter();
        //生成的字母图片下坠
        this.dropLetter();
        //点击消除相应的字母图片
        this.keydown();
    },
    //随机生成种子 并将相对应的字母图片随机显示在屏幕的规定区域
    createLetter:function (num) {
        var that=this;
        //指定随机生成图片的数量
        var num=num||that.num;
        that.currentLetter=getRand(that.seedArr,num);
        //循环遍历种子数组
        for(var i=0;i<that.currentLetter.length;i++){
            //创建一个img标签
            var img=document.createElement('img');
            //随机生成指定数量张的图片地址 并将地址复制给img的src
            img.src="Img/"+that.currentLetter[i]+".png";

            //给随机生成的图片设置样式
            img.style.cssText="position:absolute;top:25px;left:0;";

            var begin=(document.documentElement.clientWidth-(document.documentElement.clientWidth*0.8))/2;
            img.style.left=begin+Math.random()*(document.documentElement.clientWidth*0.8-begin)+'px';
            //存储当前图片是哪个字母
            img.letter=that.currentLetter[i];
            // console.log(img.letter)

            this.imgArr.push(img);
            // //生成的字母图片下坠
            // that.dropLetter();
            // //点击消除相应的字母图片
            // that.keydown();
            //在页面中添加图片
            document.body.appendChild(img);
        }
    },

    dropLetter:function () {
        var that=this;
        that.t=setInterval (function(){
            that.move();
        },10)

    },
    move:function(){
        var that=this;
        for(var i=0;i<that.imgArr.length;i++){
            that.imgArr[i].style.top=that.imgArr[i].offsetTop+that.speed+'px';
            //下落到一定位置
            if(that.imgArr[i].offsetTop>document.documentElement.clientHeight){
                //删除页面中的图片
                document.body.removeChild(that.imgArr[i]);
                //在内存中/数组中删掉
                that.imgArr.splice(i,1);
                //清楚定时器,不然会叠加
               //clearInterval(that.t);
                //每掉下去一个再创建一个
                that.createLetter(1);

                --that.life;
                // that.view.lifeEle.innerHTML= --that.life;
                if(that.life <= 0){
                    that.life=0;
                    //重新开始
                    that.restart();
                    that.createRestartEle();
                }
            }
        }
    },
    restart:function () {
        var that=this;

        clearInterval(that.t);
        // //2.清空现有的字母
        for(var i=0;i<that.imgArr.length;i++){
            document.body.removeChild(that.imgArr[i]);
        }
        // that.restartBtn.style.display='block';
        // that.restartBtn.onclick=function () {
        //     that.startBtn();
        // }

    },
    keydown:function () {
        var that=this;
        document.onkeydown=function (ev) {
            var letter=String.fromCharCode(ev.keyCode);
            for(var i=0;i<that.imgArr.length;i++){

                if(that.imgArr[i].letter==letter){
                    document.body.removeChild(that.imgArr[i]);
                    that.imgArr.splice(i,1);
                    that.createLetter(1);


                    ++that.score;

                    if(that.score==1){
                        that.next();
                        that.createNextEle();
                    }
                    break;
                }

            }
        }
    },
    next(){
        var that=this;

        clearInterval(that.t);
        // //2.清空现有的字母
        for(var i=0;i<that.imgArr.length;i++){
            document.body.removeChild(that.imgArr[i]);
        }

        that.imgArr=[];

        that.createNextEle();
    },
    // 创建一个重新开始的按钮

    createRestartEle(){
        var restartBtn=document.createElement("div");
        this.restartBtn=restartBtn;
        restartBtn.style.cssText="width:300px;height:144px;background:url(Img/restart.png) no-repeat center;cursor:pointer;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;";
        // this.setCenter(restartBtn);

        var that=this;
        restartBtn.onclick=function(){
            that.startGame();
            restartBtn.style.display='none'
        }
        document.body.appendChild(restartBtn);

    },
    //下一关
    createNextEle(){
        var nextBtn=document.createElement("div");
        this.nextBtn=nextBtn;
        nextBtn.style.cssText="width:300px;height:144px;background:url(Img/next.png) no-repeat center;cursor:pointer;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;";

        var that=this;
        nextBtn.onclick=function(){
            this.style.display='none';

            that.speed++;
            //1. 创建字母
            that.createLetter()
            // 2. 字母坠落
            that.dropLetter();
            //  3.键盘按下
            that.keydown();
        }
        document.body.appendChild(nextBtn);
    }
}

//在指定数组里生成指定个数的数字
function getRand(arr,num) {
    var newarr=[];
    for(var i=0;i<num;i++){

        var rand=arr[Math.floor(Math.random()*arr.length)];

        while (checkRand(newarr,rand)){
            rand=arr[Math.floor(Math.random()*arr.length)];
        }
        newarr.push(rand);
    }
    return newarr;
}

function checkRand(newarr,val) {
    for(var i=0;i<newarr.length;i++){
        if(newarr[i]==val){
            return true
        }
    }
    return false;
}