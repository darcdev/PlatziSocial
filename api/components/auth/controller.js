const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const TABLEAUTH = 'auth'
module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLEAUTH, { username: username });
        return bcrypt.compare(password, data.password)
            .then((equal) => {
                if (equal) {
                    return auth.sign(data);
                } else {
                    throw new Error('Informacion invalida');
                }
            })
    }
    async function upsert(data) {
        const authData = {
            id: data.id,
        }
        if (data.username) {
            authData.username = data.username
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 6);
        }
        return store.upsert(TABLEAUTH, authData)
    }
    return {
        upsert,
        login
    }
}