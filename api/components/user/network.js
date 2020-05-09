const express = require('express');
const router = express.Router();

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

function list(req, res, next) {
    controller.list()
        .then(list => {
            response.sucess(req, res, list);
        })
        .catch(next)
}

function get(req, res, next) {
    controller.get(req.params.id)
        .then(user => {
            response.sucess(req, res, user);
        })
        .catch(next)
}

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then(user => {
            console.log(user);
            response.sucess(req, res, user);
        })
        .catch(next)
}

function remove(req, res, next) {
    controller.remove(req.params.id)
        .then(() => {
            response.sucess(req, res, 'Se elimino correctamente el usuario');
        })
        .catch(next)
}

module.exports = router;