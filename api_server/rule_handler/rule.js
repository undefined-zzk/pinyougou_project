//定义规则的包
const joi = require('joi');

const phonenum = joi.string().pattern(/^1[3|5|8|4|6|7|9]\d{9}$/).required();
const password = joi.string().pattern(/^[\S]{6,15}$/).required();

exports.userRegister = {
    body: {
        phonenum,
        password,
    }
}