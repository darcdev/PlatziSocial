const db = {
    'user': [{
            id: '1',
            name: 'Diego'
        },
        {
            id: '2',
            name: 'Carla'
        }
    ]
};
async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let collection = await list(table);
    return collection.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {

    if (!db[table]) {
        db[table] = []
    }
    db[table].push(data);
    return data;
}

async function remove(table, id) {
    let indexUserId = db[table].findIndex(item => item.id === id);
    if (indexUserId >= 0) {
        db[table].splice(indexUserId, 1);
        return true
    }
    return false;
}

async function query(table, q) {
    let collection = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];
    return collection.filter(item => item[keys] === q[key])[0] || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}