window.onload=function () {
    let bannerCon=document.querySelector('.bannerCon');
    let bannerConList=document.querySelector('.bannerCon ul');

    window.onfocus=function(){
        t=setInterval(move,2000);
    }
    window.onblur=function(){
        clearInterval(t);
    }



    function move(){
        animation(bannerConList,{
            marginLeft:-bannerCon.offsetWidth
        },500,Tween.Linear,function () {
            bannerConList.appendChild(bannerConList.firstElementChild);
            bannerConList.style.marginLeft=0;
        })
    }

    let t=setInterval(move,2000);

}