const response = require('./response');

function errors(err, req, res, next) {
    console.log('ssss');
    console.log("[error]", err);

    const message = err.message || 'Error Interno';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;