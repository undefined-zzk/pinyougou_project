$(function() {
    var total = 0;
    //全选功能模块
    $('.checkAll').change(function() {
        $('.check1,.check2,.check3,.checkAll').prop('checked', $(this).prop('checked'));
        //判断全选复选框是否选中，选中则添加这个背景颜色类，否则移除这个类
        if ($(this).prop('checked') == true) {
            $('.focus1,.focus2,.focus3').addClass('check-cart-item');
        } else {
            $('.focus1,.focus2,.focus3').removeClass('check-cart-item');
        }
    })

    $('.check1,.check2,.check3').change(function() {
        if ($('.check1:checked,.check2:checked,.check3:checked').length == 3) {
            $('.checkAll').prop('checked', true)
            $('.focus1,.focus2,.focus3').addClass('check-cart-item');
        } else {
            $('.checkAll').prop('checked', false)
        }

        //判断复选框是否选中，选中则添加这个背景颜色类，否则移除这个类
        if ($(this).prop('checked') == true) {
            $(this).parent().addClass('check-cart-item');
        } else {
            $(this).parent().removeClass('check-cart-item');
        }
    })

    // 计算价格模块
    $('.rise').click(function() {
        var x = $(this).siblings('.itext').val();
        x++;
        $(this).siblings('.itext').val(x);
        var p = $(this).parent().siblings('.currentPrice').text();
        p = p.substr(1);
        total = p * x;
        $(this).parent().siblings('.totalPrice').text("￥" + total.toFixed(2));
        getSum();
    })
    $('.reduce').click(function() {
        var x = $(this).siblings('.itext').val();
        if (x == 1) {
            return;
        }
        x--;
        $(this).siblings('.itext').val(x);
        var p = $(this).parent().siblings('.currentPrice').text();
        p = p.substr(1);
        total = p * x;
        $(this).parent().siblings('.totalPrice').text("￥" + total.toFixed(2)); //toFixed(num):设置保留几位小数
        getSum();
    })

    $('.itext').change(function() {
        var n = $(this).val();
        var m = $(this).parent().siblings('.currentPrice').text();
        m = m.substr(1);
        total = m * n;
        if (total < 0) {
            return;
        }
        $(this).parent().siblings('.totalPrice').text("￥" + total.toFixed(2));
        getSum();
    })

    //计算总件数和总金额模块
    getSum(); //提前调用一次

    function getSum() {
        var count = 0;
        var allMoney = 0;
        $('.itext').each(function(index, domEle) { //domEle是DOM对象
            count += parseInt($(domEle).val());
        });
        $('.num').text(count);
        $('.totalPrice').each(function(index, domEle) {
            allMoney += parseFloat($(domEle).text().substr(1))
        })
        $('.allPrice').text("￥" + allMoney.toFixed(2));
    }

    //删除商品模块
    $('.remove a').click(function() {
        $(this).parents('.focus1,.focus2,.focus3').remove();
        getSum();
    })

    //将被勾选的商品模块删除
    $('.remove-batch').click(function() {
        $(".check1:checked,.check2:checked,.check3:checked").parent().remove();
        getSum();
    })

    //删除所有订单
    $('.clearCar').click(function() {
        $('.focus1,.focus2,.focus3').remove();
        getSum();
    })
})