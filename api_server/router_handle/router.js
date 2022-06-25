//导入MySQL模块
const db = require('../db/mysql');

//对用户密码进行加密的包
const bcrypt = require('bcryptjs');

//注册处理函数
exports.register = function(req, res) {
    const sql = 'select * from user_register where phonenum=?';
    db.query(sql, req.body.phonenum, function(err, results) {
        if (err) return res.send(err.message);
        if (results.length > 0) {
            res.send({
                status: 1,
                message: '该手机号已注册'
            })
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const sql = 'insert into user_register set ?'
            db.query(sql, req.body, function(err, results) {
                if (err) return res.send(err);
                if (results.affectedRows !== 1) {
                    res.send({ status: 1, message: '插入数据失败' })
                } else {
                    res.send({
                        status: 0,
                        message: '插入数据成功',
                    })
                }
            });
        }
    });
}