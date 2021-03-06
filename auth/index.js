const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;
const error = require('../utils/error');

function sign(data) {
    data = JSON.parse(JSON.stringify(data));
    return jwt.sign(data, secret)
}

function verify(token) {
    return jwt.verify(token, secret)
}
const check = {
    own: function(req, owner) {
        const decode = decodeHeader(req);
        if (decode.id !== owner) {
            throw error('no puedes hacer esto', 401);
        }
    },
    logged: function(req) {
        const decode = decodeHeader(req);
    }
}

function getToken(auth) {
    //Bearer token...
    if (!auth) {
        throw new Error('No viene token');
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('formato invalido');

    }
    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}
module.exports = {
    sign,
    check
}