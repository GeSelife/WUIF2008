$(function () {




    $('header p').click(function () {
    //    调用api
        dateWeather();

        hoursWeather();

        weekWeather();

    })

    //当日天气实况
    function dateWeather() {
        $.ajax({
            type:'get',
            url:'https://tianqiapi.com/api',
            data:{
                appid:'66139625',
                appsecret:'hEI7TqKO',
                version:'v6'
            },
            success:(sel) => {
                $('header p').text(sel.country);
                $('.sOne div:first-child span').eq(0).text(sel.city);
                $('.sOne div:first-child p').eq(0).text(sel.tem + '°');
                $('.sOne div:first-child div').eq(0).find('span:first-child').text(sel.tem1 + '°~ ' + sel.tem2 +'°');
                $('.sOne div:first-child div').eq(0).find('span').eq(1).text(sel.wea);
                $('.sOne div:first-child div').eq(0).find('img').attr('src','img/index_'+sel.wea_img+'.png');

                $('.sOne .week').find('span').eq(0).text(sel.week);
            }
        })
    }

    // 获取实时图片
    function hoursImg(str) {
        switch (str) {
            case "多云": return 'yun'
            case "晴": return 'qing'
            case "阴": return 'yin'
            case "雪": return 'xue'
            case "雷": return 'lei'
            case "沙尘": return 'shachen'
            case "雾": return 'wu'
            case "冰雹": return 'bingbao'
            case "小雨": return 'yu'
        }
    }
    //实时监测
    function hoursWeather() {
        $.ajax({
            type:'get',
            url:'https://tianqiapi.com/api',
            data:{
                appid:'66139625',
                appsecret:'hEI7TqKO',
                version:'v1'
            },
            success:(sel) => {
                let hourList="";
                sel.data[0].hours.forEach(item => {
                    hourList += `
                        <li>
                            <div>${item.day.slice(3,6)}</div>
                            <img src='img/index_${hoursImg(item.wea)}.png' alt="">
                            <div>${item.tem}</div>
                        </li>
                    `;

                    $('.dTem ul').html(hourList);
                })
            }
        })
    }




    //一周天气
    function weekWeather() {
        $.ajax({
            type:'get',
            url:'https://tianqiapi.com/api',
            data:{
                appid:'66139625',
                appsecret:'hEI7TqKO',
                version:'v1'
            },
            success:(sel) => {
                let weekList="";
                sel.data.forEach(item => {
                    weekList += `
                         <li>
                            <span>${item.week}</span>
                            <img src="img/index_${item.wea_img}.png" alt="">
                            <div>
                                <span>${item.tem1}</span>
                                <span>${item.tem2}</span>
                            </div>

                        </li>
                `;
                    $('.weekTem ul').html(weekList);

                    indexLink(item.index);

                    airQuality(item.air);
                })

            }
        })
    }


    //生活指数
    function indexLink(arr) {
        let str="";
        arr.forEach(item => {
            str += `
                <div class="swiper-slide clothes">
                    <img src="img/index_yifu.png" alt="">
                    <div>
                        <div>${item.title}</div>
                        <p>${item.desc}
                        </p>
                    </div>
                </div>
            `;
        })
        $('.swiper-wrapper').html(str);

        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1.4,
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

    }


    //空气质量
    function airQuality(num) {
        let _left=num/$('footer ul').width();
        document.querySelector('footer img').style.marginLeft=_left+'rem';
    }

})