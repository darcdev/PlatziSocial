const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const controller = require('./index');

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.delete('/:id', remove);

function list(req, res) {
    controller.list()
        .then(list => {
            response.sucess(req, res, list);
        })
        .catch(error => {
            response.error(req, res, error);
        })
}

function get(req, res) {
    controller.get(req.params.id)
        .then(user => {
            response.sucess(req, res, user);
        })
        .catch(error => {
            response.error(req, res, error);
        })
}

function upsert(req, res) {
    controller.upsert(req.body)
        .then(user => {
            response.sucess(req, res, user);
        })
        .catch(error => {
            response.error(req, res, error);
        })
}

function remove(req, res) {
    controller.remove(req.params.id)
        .then(() => {
            response.sucess(req, res, 'Se elimino correctamente el usuario');
        })
        .catch(error => {
            response.error(req, res, error);
        })
}

module.exports = router;