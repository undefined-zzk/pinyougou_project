function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() { //obj.timer解决类名重复问题
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //解决盒子移动不准确问题
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}