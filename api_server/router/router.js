const express = require('express');

const expressjoi = require('@escook/express-joi');

const { userRegister } = require('../rule_handler/rule');

const router = express.Router();

const useRouterHandler = require('../router_handle/router');

router.post('/register', expressjoi(userRegister), useRouterHandler.register);

module.exports = router;