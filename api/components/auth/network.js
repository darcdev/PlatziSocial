const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const controller = require('./index');

router.post('/login', login);

function login(req, res) {
    controller.login(req.body.username, req.body.password)
        .then(token => {
            response.sucess(req, res, token, 200);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400);
        })
}
module.exports = router