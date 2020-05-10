const express = require('express');
const router = express.Router();

const response = require('../network/response');
const store = require('../store/mysql');

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);

async function list(req, res, next) {
    const datos = await store.list(req.params.table);
    response.sucess(req, res, datos, 200);
}

async function get(req, res, next) {
    const datos = await store.get(req.params.table, req.params.id);
    response.sucess(req, res, datos, 200);
}

async function insert(req, res, next) {
    const datos = await store.insert(req.params.table, req.body);
    response.sucess(req, res, datos, 201);
}

async function upsert(req, res, next) {
    const datos = await store.upsert(req.params.table, req.body);
    response.sucess(req, res, datos, 200);
}
module.exports = router;