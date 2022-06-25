window.addEventListener('load', function() {
    let backTop = document.querySelector('.backTop');
    let sk_bd = document.querySelector('.sk_bd');
    window.addEventListener('scroll', function() {
        console.log(sk_bd.offsetTop);
        console.log(window.pageYOffset);
        if (window.pageYOffset > sk_bd.offsetTop) {
            backTop.style.display = 'block';
        } else {
            backTop.style.display = 'none';
        }
    });

    backTop.addEventListener('click', function() {
        animate(window, 0);
    })

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            let step = (target - obj.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // obj.style.top = obj.pageYOffset + step + 'px';
            window.scroll(0, obj.pageYOffset + step);
            if (obj.pageYOffset == target) {
                clearInterval(obj.timer);
            } else {
                callback && callback();
            }
        }, 15)
    }
})