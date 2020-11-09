function check(opts,cons,type='onclick',style='red',color='#fff') {//选项,内容,事件,背景色,字体色
    for(var i=0;i<opts.length;i++){
        opts[i].index=i;
        opts[i][type]=function() {
            for(var j=0;j<cons.length;j++){
                opts[j].style.background='#F1F1F1';
                cons[j].style.display='none';
                opts[j].style.color='#000';
            }
            this.style.background = style;
            this.style.color = color;
            cons[this.index].style.display = 'block';
        }
    }
    //鼠标离开自动轮播
    function banner(num) {
        setInterval(function () {
            for(var j=0;j<cons.length;j++){
                opts[j].style.background='#666666';
                cons[j].style.display='none';
                opts[j].style.color='none';
            }
            opts[num].style.background = style;
            opts[num].style.color = color;
            cons[num].style.display = 'block';
        })
    }

}