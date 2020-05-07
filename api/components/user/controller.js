const store = require('../../../store/dummy');
const TABLEUSER = 'user'

function list() {
    return store.list(TABLEUSER);
}

module.exports = {
    list,
}