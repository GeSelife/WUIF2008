
//构造函数  首字母大写 获取参数
function Fn(ele) {
    //判断传进来的值是不是字符串
    if(typeof ele == 'string') {
        //拿到所有符合ele的元素 是一个类数组
        var newLists = document.querySelectorAll(ele);
        //遍历获取得到的每一个元素
        for (let i = 0; i < newLists.length; i++) {
            //将每一个元素赋值给对象的每一个
            this[i] = newLists[i];
        }
        //给对象添加length属性,并将获取到的类数组的长度赋值给它
        this.length = newLists.length;
    }

}

//在构造函数的原型上添加方法
Fn.prototype={
    //添加内容 html 将要添加的内容作为实参传入函数中
    html:function (value) {
        //遍历对象
        for(let i in this){
            //给获取到的每一个选择器添加内容
            this[i].innerHTML = value;
        }
        return this;
    },

    //添加内容 text
    text:function (value) {
        for(let i in this){
            this[i].innerText = value;
        }
        return this;
    },

    //添加类名
    addClass:function (className) {
        for(let i in this){
            if(typeof this[i] == 'object') {
                this[i].classList.add(className);
            }
        }
        return this;
    },

    //移除类名
    removeClass:function (className) {
        for(let i in this){
            if(typeof this[i] == 'object') {
                this[i].classList.remove(className);
            }
        }
        return this;
    },

    //添加属性
    //如果传入的是一个值:获取属性；传入的是两个值:设置属性
    prop:function () {
        for(let i in this){
            if(typeof this[i] == 'object') {
                if(arguments.length == 1){
                    return this[i].getAttribute(arguments[0]);
                }
                if(arguments.length == 2){
                    this[i].setAttribute(arguments[0], arguments[1]);
                }
            }
        }
        return this;
    },

    //点击  第一个参数:事件触发方式 第二个参数:触发事件要做的事情
    addEvent:function (eve,callback) {
        for(let i in this){
            if(typeof this[i] == 'object'){
                this[i].addEventListener(eve,callback,false);
            }
        }
        return this;
    },



}



//定义一个$函数,并传入一个字符串，是需要获取的选择器
function $(selector) {
    //将实例化的构造函数作为函数的返回值,将需要获取的选择器作为实参传入构造函数中
   return new Fn(selector);
}