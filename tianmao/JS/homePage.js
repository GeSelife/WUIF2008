window.onload=function () {
    //nav 二级栏
    var navListSon=document.querySelectorAll('.nav-listSon');
    for(var i=0;i<navListSon.length;i++){
        navListSon[i].onmouseover=function () {
            this.style.backgroundColor='#fff';
            this.style.border='1px solid #e6e6e6';
            var navListSon2=this.querySelector('.nav-list-son');
            if(navListSon2){
                navListSon2.style.opacity=1;
                navListSon2.style.zIndex=99999;
            }
        }
        navListSon[i].onmouseout=function () {
            this.style.backgroundColor='#F2F2F2';
            this.style.border='none';
            var navListSon2=this.querySelector('.nav-list-son');
            if(navListSon2){
                navListSon2.style.opacity=0;
                navListSon2.style.zIndex=0;
            }
        }
    }

    //页面加载
    var lists=document.querySelectorAll('.lists');

    //smallsearch 顶部搜索栏
    var smallSearch=document.querySelector('#box');
    //回到顶部
    var dh=document.querySelector('.dh');//大框
    var dhOne=document.querySelectorAll('.dh-1 a');//列表
    var backTop=document.querySelector('.back-top')//返回顶部
    var firstAd=document.querySelectorAll('.first-ad');//每一个广告块


    window.onscroll=function () {
        var st=document.documentElement.scrollTop;

        //页面加载
        for(var i=0;i<lists.length;i++) {
            lists[i].top = lists[i].offsetTop;
            if(!lists[i].flag){ //图片加载过一次之后就不需要再进行加载
                if (st > lists[i].top-document.documentElement.clientHeight) {
                    var imgsAll = lists[i].querySelectorAll('img');
                    for (var j = 0; j < imgsAll.length; j++) {
                        imgsAll[j].src = imgsAll[j].getAttribute('aa');
                    }
                    lists[i].flag=true;
                }
            }
        }

        //smallsearch 顶部搜索栏
        if(st<800){
            smallSearch.style.top='-50px';
        }else{
            smallSearch.style.top=0;
        }
        //dh侧栏
        if(st<1000){
            dh.style.opacity=0;
            dh.style.transform='scale(0,0)';
        }else{
            dh.style.opacity=1;
            dh.style.transform='scale(1,1)';
        }

        for(var i=0;i<dhOne.length;i++){
            //鼠标移入颜色
            dhOne[i].onmouseover=function () {
                this.style.backgroundColor=this.getAttribute('color');
            }
            dhOne[i].onmouseout=function () {
                this.style.backgroundColor='#626262';
            }
            //在规定的高度内让按钮颜色不变
            if(st>=dhOne[i].top&&st<dhOne[i].top+dhOne[i].height){
                for(var j=0;j<dhOne.length;j++){
                    dhOne[j].style.backgroundColor="#626262";
                }
                dhOne[i].style.backgroundColor=dhOne[i].getAttribute('color');
                dhOne[i].onmouseout='null';

            }
        }
    }
    //回到顶部
    backTop.onclick=function () {
        animation(document.documentElement,{
            scrollTop:0
        },300,Tween.Linear)
        for(var i=0;i<dhOne.length;i++) {
            dhOne[i].style.backgroundColor="#626262";
        }
    }

    //点击每一个跳转块
    for(var i=0;i<dhOne.length;i++) {
        dhOne[i].top=firstAd[i].offsetTop;//给每一个按钮添加一个属性top,将每一个块的top值赋值给每一个按钮的top
        dhOne[i].height=firstAd[i].offsetHeight;
        dhOne[i].onclick=function () {
            animation(document.documentElement,{
                scrollTop:this.top//滚动条滚动的当前点击的按钮的top的位置
            },1000,Tween.Linear)
        }
        dhOne[i].onmouseout='null';
    }




    //轮播
    var bannerBox=document.querySelector('.con-sort');
    var conSortBanner=document.getElementsByClassName('con-sort-banner')[0];
    var bannerImg=document.querySelectorAll('.banner-imgs li');// 图片
    var btnS=document.querySelectorAll('.banner-btn li'); //轮播按钮
    var num=0;

    conSortBanner.onfocus=conSortBanner.onmouseout=function () {
    t=setInterval(move,3000);
    }
    conSortBanner.onblur=conSortBanner.onmouseover=function () {
        clearInterval(t);
    }

    function move(){
        num++
        for (var i=0;i<bannerImg.length;i++){
            if(num==bannerImg.length){
                num=0
            }
            bannerImg[i].style.opacity=0;
            bannerImg[i].style.zIndex=0;
        }

        animation(bannerImg[num],{
            opacity:1,
            zIndex:1
        },500,Tween.Linear,function () {
            flag=true;
        })

        for(var i=0;i<btnS.length;i++){
            btnS[i].style.background='black';
            btnS[i].style.opacity=0.3;
            bannerImg[i].style.opacity=0;
        }
        btnS[num].style.background='#fff';
        btnS[num].style.opacity=1;
        bannerBox.style.background=bannerImg[num].getAttribute('backColor');
        bannerImg[num].style.opacity=1;
    }


    for(var i=0;i<btnS.length;i++){

        btnS[i].index=i;
        btnS[i].onmouseover=function () {
            num=this.index;
            for(var i=0;i<btnS.length;i++){
                btnS[i].style.background='black';
                btnS[i].style.opacity=0.3;
                bannerImg[i].style.opacity=0;
            }
            btnS[num].style.background='#fff';
            btnS[num].style.opacity=1;
            bannerBox.style.background=bannerImg[num].getAttribute('backColor');
            bannerImg[num].style.opacity=1;
            delay(300,function () {
                for(var i=0;i<btnS.length;i++){
                    btnS[i].style.background='black';
                    btnS[i].style.opacity=0.3;
                    bannerImg[i].style.opacity=0;
                }
                btnS[num].style.background='#fff';
                btnS[num].style.opacity=1;
                bannerBox.style.background=bannerImg[num].getAttribute('backColor');
                bannerImg[num].style.opacity=1;
            })

        }

    }

    function delay(time,callback) {
        clearTimeout(btnS.t);
        btnS.t=setTimeout(function () {
            callback();
        },time)
    }

    var t=setInterval(move,3000);

    //banner侧边选项卡
    var optsBox=document.querySelector('.con-list-bottom');
    var opts=document.querySelectorAll('.con-lisst a');
    var opts1=document.querySelectorAll('.con-lisst span');
    var cons=document.querySelectorAll('.check-con');
    var consBox=document.querySelector('.con-list-content');

    optsBox.onmouseover=function(){
        consBox.style.display="block";
    }
    optsBox.onmouseout=function(){
        consBox.style.display="none";
    }
    optsBox,consBox.addEventListener('mouseout',function () {
        for (var i=0;i<opts.length;i++){
            opts[i].style.background='none';
            opts1[i].style.color='#fff';
            opts[i].style.color='#fff';
        }
    })

    for(var i=0;i<opts.length;i++){
        opts[i].index=i;
        opts[i].onmouseover=function () {
            for (var i=0;i<opts.length;i++){
                opts[i].style.background='none';
                opts1[i].style.color='#fff';
                opts[i].style.color='#fff';
            }
            opts[this.index].style.background='#fff';
            opts1[this.index].style.color=opts[this.index].getAttribute('color');
            opts[this.index].style.color=opts[this.index].getAttribute('color');

            for (var j=0;j<cons.length;j++){
                consBox.style.display='block';
                cons[j].style.display='none';
                cons[this.index].style.display='block';
            }
        }
    }


    //first广告部分选项卡
    var firstTitle1=document.querySelectorAll('#first-title li');
    var conS=document.querySelectorAll('#first-title-img a');
    var oneBox=document.querySelector('#one-title');

    check(firstTitle1,conS,'onmouseover','#00B262','#fff');
    banner(oneBox,conS,firstTitle1,{
        background:'none',
        color:'black',
        opacity:1
    },{
        background:'#00B262',
        color:'#fff',
        opacity:1
    })

    //third广告部分选项卡
    var thirdTitle1=document.querySelectorAll('#third-title li');
    var thirdS=document.querySelectorAll('#third-title-img a');
    var threeBox=document.querySelector('#three-title');

    check(thirdTitle1,thirdS,'onmouseover','#00B262','#fff');
    banner(threeBox,thirdS,thirdTitle1,{
        background:'none',
        color:'black',
        opacity:1
    },{
        background:'#00B262',
        color:'#fff',
        opacity:1
    })

    //four广告部分选项卡
    var fouTitle1=document.querySelectorAll('#fou-title li');
    var fouS=document.querySelectorAll('#fou-title-img a');
    var fourBox=document.querySelector('#four-title');

    check(fouTitle1,fouS,'onmouseover','#00B262','#fff');
    banner(fourBox,fouS,fouTitle1,{
        background:'none',
        color:'black',
        opacity:1
    },{
        background:'#00B262',
        color:'#fff',
        opacity:1
    })

    //five广告部分选项卡
    var fifTitle1=document.querySelectorAll('#fif-title li');
    var fifS=document.querySelectorAll('#fif-title-img a');
    var fiveBox=document.querySelector('#five-title');

    check(fifTitle1,fifS,'onmouseover','#00B262','#fff');
    banner(fiveBox,fifS,fifTitle1,{
        background:'none',
        color:'black',
        opacity:1
    },{
        background:'#00B262',
        color:'#fff',
        opacity:1
    })

    //six广告部分选项卡
    var siTitle1=document.querySelectorAll('#si-title li');
    var siS=document.querySelectorAll('#si-title-img a');
    var sixBox=document.querySelector('#six-title');

    check(siTitle1,siS,'onmouseover','#00B262','#fff');
    banner(sixBox,siS,siTitle1,{
        background:'none',
        color:'black',
        opacity:1
    },{
        background:'#00B262',
        color:'#fff',
        opacity:1
    })

    //seven广告部分选项卡
    var sevTitle1=document.querySelectorAll('#sev-title li');
    var sevS=document.querySelectorAll('#sev-title-img a');
    var sevenBox=document.querySelector('#seven-title');

    check(sevTitle1,sevS,'onmouseover','#00B262','#fff');
    banner(sevenBox,sevS,sevTitle1,{
        background:'none',
        color:'black',
        opacity:1
    },{
        background:'#00B262',
        color:'#fff',
        opacity:1
    })








}