const express = require('express');
const router = express.Router();

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

router.get('/', list);
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);
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

function follow(req, res, next) {
    console.log(req.user.id, req.params.id);
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.sucess(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
    controller.following(req.params.id)
        .then((data) => {
            return response.sucess(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;