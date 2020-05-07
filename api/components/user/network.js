const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const controller = require('./controller');
router.get('/', (req, res) => {
    const listUsers = controller.list();
    response.sucess(req, res, listUsers, 200);
})

module.exports = router;