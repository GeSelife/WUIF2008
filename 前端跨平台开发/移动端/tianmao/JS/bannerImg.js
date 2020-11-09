function banner(windows,imgN,btnN,colorS= {background:'none',opacity:1},style={background:'#fff',opacity:1},left,right){//大的框,每张图片,每个按钮,按钮默认值,按钮选中值,左边按钮,右边按钮
    var flag=true;
    var num=0;
    if(right){
        right.onclick=function () {
            if(!flag){
                return;
            }
            flag=false;
            move();
        }
    }
    if(left){
        left.onclick=function () {
            if(!flag){
                return;
            }
            flag=false;
            num--;
            if(num<0){
                num=btnN.length-1;
            }
            for (var i=0;i<imgN.length;i++) {
                animation(imgN[i], {
                    opacity: 0
                }, 500, Tween.Linear,function () {
                    flag=true;
                })
            }
            animation(imgN[num],{
                opacity:1
            },500,Tween.Linear,function () {
                flag=true;
            })

            for(var i=0;i<btnN.length;i++){
                for (let key in colorS) {
                    btnN[i].style[key]=colorS[key];
                }
            }
            for (let key in style) {
                btnN[num].style[key]=style[key];
            }
        }
    }



    window.onfocus=windows.onmouseout=function () {
        t=setInterval(move,3000);
    }
    window.onblur=windows.onmouseover=function () {
        clearInterval(t);
    }

    function move(){
        num++
        for (var i=0;i<imgN.length;i++){
            if(num==imgN.length){
                num=0
            }
            animation(imgN[i],{
                opacity:0
            },500,Tween.Linear,function () {
                flag=true;
            })
        }

        animation(imgN[num],{
            opacity:1
        },500,Tween.Linear,function () {
            flag=true;
        })

        for(var i=0;i<btnN.length;i++){
            for (let key in colorS) {
                btnN[i].style[key]=colorS[key];
            }
        }
        for (let key in style) {
            btnN[num].style[key]=style[key];
        }

    }

    for(var i=0;i<btnN.length;i++){
        btnN[i].index=i;
        btnN[i].onclick=function () {
            num=this.index;
            for (var i=0;i<imgN.length;i++){
                animation(imgN[i],{
                    opacity:0
                },500,Tween.Linear,function () {
                    flag=true;
                })
            }
            animation(imgN[num],{
                opacity:1
            },500,Tween.Linear,function () {
                flag=true;
            })


            for(var i=0;i<btnN.length;i++){
                for (let key in colorS) {
                    btnN[i].style[key]=colorS[key];
                }
            }
            for (let key in style) {
                btnN[num].style[key]=style[key];
            }
        }

    }


    var t=setInterval(move,3000);


}