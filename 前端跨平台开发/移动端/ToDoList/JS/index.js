$(function () {
    //清除默认事件
    $('form').submit(function (event) {
        event.preventDefault();
    })

    //li内容
    function conList() {
        let _lists=`<li>
                    <input type="checkbox">
                    <p>${$('[type=text]').val()}</p>
                    <span class="removeBtn"> - </span>
                </li>`
        $('.todoList').html(_lists+$('.todoList').html());

    }

    //添加内容
    $(document).keydown(function (event) {
        if(event.keyCode==13){
            $('form').submit();
            conList();
            //重置表单
            document.querySelector('form').reset();

            //复选框
            checkBox();
            //删除
            removeBtn();
            //个数
            addCon();
        }

    })

    //点击复选框 任务完成
    function checkBox() {
        let _cb = $('.todoList').find('[type=checkbox]');
        let flag=true;
        _cb.on('click',function () {
            flag=true;
            if(!this.checked){
                $(this).parent('li').appendTo($('.todoList'));
                //个数
                addCon();
                flag=false;
            }else {
                $(this).parent('li').appendTo($('.downList'));
                //个数
                addCon();
            }
        })
    }

    //删除
    function removeBtn() {
        $('.removeBtn').click(function () {
            $(this).parent('li').remove();
            //个数
            addCon();
        })
    }

    //添加内容的个数
    function addCon() {
        $('.contentCon h2:last').find('span').text($('.downList').find('li').length)
        $('.contentCon h2:first').find('span').text($('.todoList').find('li').length)
    }

})