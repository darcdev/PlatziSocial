const TABLEUSER = 'user'
const { nanoid } = require('nanoid');
const auth = require('../auth');

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

    async function upsert(data) {
        const user = {
            name: data.name,
            username: data.username
        }
        if (data.id) {
            user.id = data.id
        } else {
            user.id = nanoid();

        }
        if (data.password || data.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            })
        }
        return store.upsert(TABLEUSER, user)
    }

    function remove(id) {
        if (!id) {
            return Promise.reject('No se indicio el id del usuario');
        }
        return this.store.remove(TABLEUSER, id);
    }

    function follow(from, to) {
        console.log(from, '/', to)
        return store.upsert(TABLEUSER + '_follow', {
            user_from: from,
            user_to: to
        })
    }
    async function following(user) {
        const join = {};
        join[TABLEUSER] = 'user_to' //{user : 'user_to'}
        const query = { user_from: user };

        return await store.query(TABLEUSER + '_follow', query, join);
    }
    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following
    }
}