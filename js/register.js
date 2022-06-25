window.addEventListener('load', function() {
    let phonenum = document.querySelector('#phonenum');
    let phnum = document.querySelector('.phnum');
    let phonenumi = document.querySelector('.phonenumi');

    let regepx = /^1[3|4|5|7|6|8|9]\d{9}$/; //手机号正在表达式
    let flag, coreg;
    phonenum.addEventListener('keydown', function() {
        flag = true;
    });

    phonenum.addEventListener('blur', function() {
        this.className = '';
        if (flag) {
            if (regepx.test(phonenum.value)) {
                phonenumi.className = 'success_icon';
                phnum.innerHTML = '格式正确';
                phnum.className = 'right'
                coreg = true;
            } else {
                phonenumi.className = 'error_icon';
                phnum.innerHTML = '格式错误';
                phnum.className = 'wrong';
                coreg = null;
            }
        }
    });

    phonenum.addEventListener('focus', function() {
        this.className = 'changecolor';
        phonenumi.className = '';
        phnum.innerHTML = '请输入手机号';
        phnum.style.color = '#ccc';
    });

    // 短信验证码
    let arr = ['a', 'b', 'c', '1', '0', '3', 'F', 'P', 'L', '8', '1', 'L', 'k', 'u', 'w', 'y', 'z', '7', '6', '2', 'd'];
    let idcode = document.querySelector('.idcode');
    let str = '';

    function getIdCode() {
        idcode.innerHTML = str;
        for (let i = 0; i < 4; i++) {
            let randoms = Math.floor(Math.random() * ((arr.length - 1) - 0 + 1) + 0);
            str += arr[randoms];
        }
        idcode.innerHTML = str;
        str = '';
    }
    idcode.addEventListener('click', function() {
        getIdCode();
    });

    let getidecode = document.querySelector('.getidcode');
    getidecode.addEventListener('click', function() {
        getIdCode();
    })
    let vercode = document.querySelector('#vercode');
    let success = document.querySelector('.success');
    let vercodei = document.querySelector('.vercodei');
    let coreg1;
    vercode.addEventListener('blur', function() {
        this.className = '';
        if (flag) {
            if (vercode.value == idcode.innerHTML && vercode.value.trim() !== '') {
                success.innerHTML = '验证成功';
                success.className = 'right';
                vercodei.className = 'success_icon success';
                coreg1 = true;
            } else if (vercode.value.trim() !== '') {
                success.innerHTML = '验证码错误';
                success.className = 'wrong';
                vercodei.className = 'error_icon success';
                coreg1 = null;
            }
        }
    });

    vercode.addEventListener('focus', function() {
        this.className = 'changecolor';
        if (vercode.value == idcode.innerHTML && vercode.value !== '') {
            return;
        }
        success.innerHTML = '请输入验证码';
        success.className = '';
        success.style.color = '#ccc';
        vercodei.className = '';
    });

    // 登录密码
    let loginpaswd = document.querySelector('.loginpaswd');
    let paswd = document.querySelector('#paswd');
    let eyes = document.querySelector('.eyes');
    let eyesimg = eyes.querySelector('img');
    let paswdi = document.querySelector('.paswdi');
    let num = 1;
    eyesimg.addEventListener('click', function() {
        if (num == 1) {
            this.src = './images/open.png'
            paswd.type = 'text';
            num = 0;
        } else if (num == 0) {
            this.src = './images/close.png'
            paswd.type = 'password';
            num = 1;
        }
    });

    let safe = document.querySelector('.safe');
    let ems = safe.querySelectorAll('em');

    let regEpx = /^[a-zA-Z]\w{5,17}$/;

    paswd.addEventListener('blur', function() {
        this.className = '';
        if (regEpx.test(this.value)) {
            paswdi.className = 'success_icon';
            loginpaswd.innerHTML = '符合要求';
            if (this.value.length >= 6 && this.value.length < 10) {
                for (let i = 0; i < ems.length; i++) {
                    ems[i].className = '';
                }
                ems[0].classList.add('bigem');
            } else if (this.value.length >= 10 && this.value.length < 14) {
                for (let i = 0; i < ems.length; i++) {
                    ems[i].className = '';
                }
                ems[1].classList.add('bigem');
            } else if (this.value.length >= 14) {
                for (let i = 0; i < ems.length; i++) {
                    ems[i].className = '';
                }
                ems[2].classList.add('bigem');
            }
        } else if (this.value.trim() !== '') {
            paswdi.className = 'error_icon';
            loginpaswd.innerHTML = '不符合要求';
        };
    });

    paswd.addEventListener('focus', function() {
        this.className = 'changecolor';
        if (regEpx.test(this.value)) {
            paswdi.className = 'success_icon';
            loginpaswd.innerHTML = '符合要求';
        } else if (this.value.trim() !== '') {
            paswdi.className = '';
            loginpaswd.innerHTML = '(支持字母开头,数字、下划线6~18位字符)';
        }
    });

    let paswdsure = document.querySelector('#paswdsure');
    let paswdsurei = document.querySelector('.paswdsurei');
    let error = document.querySelector('.error');
    let coreg2;

    paswdsure.addEventListener('blur', function() {
        this.className = '';
        if (this.value === paswd.value && this.value.trim() !== '') {
            paswdsurei.className = 'success_icon';
            error.innerHTML = '密码设置成功';
            coreg2 = true;
        } else if (this.value.trim() !== '') {
            paswdsurei.className = 'error_icon';
            error.innerHTML = '密码不一致';
            coreg2 = null;
        }
    });

    paswdsure.addEventListener('focus', function() {
        this.className = 'changecolor';
        paswdsurei.className = '';
        error.innerHTML = '请输入登录密码';
    });

    let coreg3;
    let agrees = document.querySelector('.agrees');
    agrees.addEventListener('change', function() {
        if (this.checked) {
            coreg3 = true;
        } else {
            coreg3 = null;
        }
    });

    $('.success_loginbtn').on('click', function() {
        if (coreg && coreg1 && coreg2 && coreg3) {
            $("#formRegister").on('submit', function(e) {
                e.preventDefault();
                $.ajax({
                    method: 'post',
                    url: 'http://127.0.0.1/api/register',
                    data: $("#formRegister").serialize(),
                    success: function(res) {
                        if (res.status !== 0) {
                            return;
                        } else {
                            alert('注册成功');
                        };
                    }
                })
            })
        } else {
            alert('注册信息不全');
        }
    })

})