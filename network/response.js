exports.sucess = (req, res, message = '', status) => {
    res.status(status).send({
        error: false,
        status,
        body: message
    })
}
exports.error = (req, res, message = 'Internal Server Error', status) => {
    res.status(status).send({
        error: message,
        status,
        body: false
    })
}