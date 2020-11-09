$(function () {
    //获取输入的字数
    $('.conBottomRight textarea').keyup(function () {
        $('.num').text(this.value.length);

    })
    $('form').submit(function (event) {
        event.preventDefault();
        render();
    })

    //将留言添加到左边
    function render() {
        let con={
            name: $('input:first').val(),
            tel:$('input').eq(1).val(),
            email:$('input').eq(2).val(),
            cont:$('.conBottomRight textarea').val()
        }


        let _html=` <li>
            <i></i>
            <div class="conBottomLeft">
                <div class="leftTop">
                    <div class="leftTop-left">${con.name}</div>
                    <div class="leftTop-right">
                        ${getData()}
                    </div>
                </div>
                <div class="leftBottom">
                    <div class="leftBottom-top">
                        tell:${con.tel}&nbsp;email:${con.email}
                    </div>
                    <textarea>${con.cont}</textarea>
                </div>
            </div>
        </li>
        `;
        //将内容添加到页面中
        $('.conBottomLeftBox').html(_html + $('.conBottomLeftBox').html());

        //重置表单
        document.querySelector('form').reset();
    }

    //日期函数
    function getData() {
        let data=new Date();
        let y=data.getFullYear(),
            m=data.getMonth()+1,
            d=data.getDate(),
            h=data.getHours(),
            mi=data.getMinutes(),
            s=data.getSeconds();

            m=m<10?'0'+m:m;
            d=d<10?'0'+d:d;
            h=h<10?'0'+h:h;
            mi=mi<10?'0'+mi:mi;
            s=s<10?'0'+s:s;

        let _h=`<span>${y}-${m}-${d}</span>
                        <span>${h}:${mi}:${s}</span>`;
        return _h;
    }

    //回车提交信息事件
    $(document).keydown(function (event) {
        //页面调试
        debugger   //这个单词用来调试代码,在指定位置打上断点 在页面中执行到指定位置时自动停止
        if(event.keyCode==13){
            $('form').submit();
        }
    })

})