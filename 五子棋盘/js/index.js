$(function () {
    let flag=true;
    //鼠标点击事件
    $('.box').click(function (event) {
        let cssWhite={
            width: '16px',
            height: '16px',
            background: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: event.offsetY - 8 + 'px',
            left: event.offsetX - 8 + 'px'
        };
        let cssBlack={
            width: '16px',
            height: '16px',
            background: '#000',
            borderRadius: '50%',
            position: 'absolute',
            top: event.offsetY - 8 + 'px',
            left: event.offsetX - 8 + 'px'
        };
        if(flag){
            $('<div></div>').css(cssWhite).appendTo('.box');
            flag = false;
        }else {
            $('<div></div>').css(cssBlack).appendTo('.box');
            flag = true;
        }

    })

})