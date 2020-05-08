const TABLEUSER = 'user'

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLEUSER);
    }

    function get(id) {
        return store.get(TABLEUSER, id);
    }

    function upsert({ id = null, name = null }) {
        if (!id || !name) {
            return Promise.reject('No se indicio el id o el nombre');
        }
        const user = {
            id,
            name
        }
        return this.store.upsert(TABLEUSER, user)
    }

    function remove(id) {
        if (!id) {
            return Promise.reject('No se indicio el id del usuario');
        }
        return this.store.remove(TABLEUSER, id);
    }
    return {
        list,
        get,
        upsert,
        remove
    }
}