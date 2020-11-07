/*
* ajax封装
*
* ajax({
*       请求方式:type,
*       请求地址:url,
*       发送数据:data:{},
*       同步/异步:async
*       请求数据类型:dataType,
*       请求成功:success:function(){},
*       请求失败:error:function(){}
* })
*
*
* */

function ajax(obj) {
    //判断是否输入了请求地址
    if (!obj.url){
        alert('请求地址不能为空');
        return;
    }
    //判断是否有请求方式,如果没有,默认位get
    obj.type = obj.type || 'get';
    //判断是否传入同步或异步方式,默认为get
    obj.async = obj.async ==  undefined ?true:obj.async;

    //创建ajax对象
    let xhr = new XMLHttpRequest();

    //请求数据类型
    xhr.responseType=obj.dataType || 'json';

    //设置get方式请求的地址栏信息
    let _con='';
    //遍历信息
    for (let i in obj.data) {
        _con += i + '=' + obj.data[i] + '&';
    }
    //删除字符串最后一位
    _con=_con.slice(0,-1);

    //判断get
    if(obj.type.toUpperCase() == 'GET'){
        //请求方式/请求地址/同步或异步
        xhr.open(obj.type ,obj.url +='?' +  _con ,obj.async);
        //发送请求
        xhr.send();
    }
    //post方式
    if(obj.type.toLowerCase() == 'post'){
        //请求方式/请求地址/同步或异步
        xhr.open(obj.type ,obj.url,obj.async);
        //设置请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
        //发送请求
        xhr.send(obj.data);
    }



    //监视
    xhr.onreadystatechange = function () {
        //响应成功
        if(xhr.readyState == 4){
            //请求成功
            if(xhr.status == 200){
                if(xhr.responseType == 'text'){
                    //请求数据类型:text
                    obj.success&&obj.success(xhr.responseText);
                }else if(xhr.responseType == 'json'){
                    //请求数据类型:json
                    obj.success&&obj.success(xhr.response);
                }else if(xhr.responseType == 'document'){
                    //请求数据类型:document
                    obj.success&&obj.success(xhr.responseXML);
                }
            }else {
                //请求失败
                obj.error&&obj.error();
            }
        }
    }
}