window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('ol');
    var ul_li = ul.querySelectorAll('li');
    var arrowl = document.querySelector('.arrowl ');
    var arrowr = document.querySelector('.arrowr ');
    focus.addEventListener('mouseover', function() {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer); //清除定时器
        timer = null; //将定时器置为空
    })
    focus.addEventListener('mouseout', function() {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function() { //开启定时器
            arrowr.click(); //自动播放
        }, 3000)
    })
    for (var i = 0; i < ul_li.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            cricle = index;
            var ulTarget = index * focus.offsetWidth;
            animate(ul, -ulTarget, function() {});
        })
    }
    var liclone = ul.children[0].cloneNode(true); //克隆第一张图片，这样解决了小圆点数量问题
    ul.appendChild(liclone);
    ol.children[0].className = 'current';
    var num = 0;
    var cricle = 0;
    var flag = true; //设置节流阀，防止点击过快图片播放过快
    arrowr.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            num++;
            if (num == ul.children.length - 1) {
                ul.style.left = 0 + 'px';
                num = 0;
            }
            cricle++;
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            if (cricle == ul.children.length - 1) {
                cricle = 0;
            }
            ol.children[cricle].className = 'current';
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true; //利用回调函数开启节流阀
            });
        }
    })
    arrowl.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.setoffWidth + 'px';
            }
            num--;
            cricle--;
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            if (cricle < 0) {
                cricle = ol.children.length - 1;
            }
            ol.children[cricle].className = 'current';
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true;
            });
        }
    })
    var timer = this.setInterval(function() {
        arrowr.click(); //自动播放
    }, 3000)


    // 电梯导航模块
    $(window).scroll(function() {
        if ($(document).scrollTop() > $('.recom').offset().top) {
            $('.lift').stop().fadeIn();
            $('.backTop').stop().fadeIn('fast');
        } else {
            $('.lift').stop().fadeOut();
            $('.backTop').stop().fadeOut('fast');
        };
        if (flags) {
            $('.floor .lifts').each(function(index, domEle) {
                if ($(document).scrollTop() >= $(domEle).offset().top) {
                    $('.lift li').eq(index).addClass('current').siblings('li').removeClass('current');
                }
            })
        };
    })

    let flags = true; //节流伐
    $('.lift li').click(function() {
        if (flags) {
            flags = false;
            $(this).addClass('current').siblings('li').removeClass('current');
        };
        let key = $(this).index();
        let currenttop = $('.floor .lifts').eq(key).offset().top
        $('body,html').stop().animate({
            scrollTop: currenttop,
        }, function() {
            flags = true;
        });
    });

    //返回顶部模块
    $('.backTop').click(function() {
        $('body,html').stop().animate({
            scrollTop: 0,
        }, 800);
    });

    // 倒计时模块
    let showTime = document.querySelectorAll('.showTime');
    fn();

    function countDown(inputTime) {
        let date = new Date();
        let nowTime = +new Date();
        inputTime = +new Date(inputTime);
        let time = (inputTime - nowTime) / 1000;
        let hour = date.getHours();
        hour = parseInt((time / 60 / 60 % 60));
        hour = hour >= 10 ? hour : '0' + hour;
        showTime[0].innerHTML = hour;
        let mintune = date.getMinutes();
        mintune = parseInt((time / 60 % 60));
        mintune = mintune >= 10 ? mintune : '0' + mintune;
        showTime[1].innerHTML = mintune;
        let seconds = date.getSeconds();
        seconds = parseInt((time % 60));
        seconds = seconds >= 10 ? seconds : '0' + seconds;
        showTime[2].innerHTML = seconds;
        if (time <= 0) {
            clearInterval(timerr);
            timerr = null;
        }
    }
    let timerr = setInterval(fn, 1000)

    function fn() {
        countDown('2022-6-14 12:00');
    };

    //输入框搜索模块
    $('#sear').on('keyup', function() {
        clearInterval(Timer);
        Timer = null;
        var value = $(this).val().trim();
        if (value.length <= 0) {
            $('#content').empty().hide();
        } else {
            countDowntimer(value);
            $('#content').stop().show();
        }
    });
    $('#sear').on('blur', function() {
        $('#content').stop().hide();
    });

    //发起jsop请求
    function getSuggestList(value) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?q=' + value,
            dataType: 'jsonp',
            success: function(res) {
                loadData(res)
            }
        })
    };

    //渲染数据
    function loadData(res) {
        res.result.forEach(item => {
            var lis = $('<li><a href="javascript:;">' + item[0] + '</a></li>');
            $('#content').append(lis);
        });
    };

    //防抖处理
    var Timer = null;

    function countDowntimer(value) {
        Timer = setTimeout(function() {
            getSuggestList(value);
        }, 500)
    }
})