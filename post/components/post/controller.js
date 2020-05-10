const TABLEPOST = 'post';
const nanoid = require('nanoid');
const error = require('../../../utils/error');

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLEPOST);
    }

    async function get(id) {
        const post = await store.get(TABLEPOST, id);
        if (!post) {
            throw error('no existe el post', 404);
        }
        return post;
    }

    function upsert(data, user) {
        const post = {
            id: data.id,
            user: user,
            text: data.text
        }

        if (!post.id) {
            post.id = nanoid();
        }
        return store.upsert(TABLEPOST, post).then(() => post);
    }

    async function like(post, user) {
        const like = await store.upsert(TABLEPOST + '_like', {
            post: post,
            user: user,
        })

        return like;
    }

    async function postsLiked(user) {
        const users = await store.query(TABLEPOST + '_like', { user: user })
        return users;
    }

    async function postLikers(post) {
        const users = await store.query(TABLEPOST + '_like', { post: post })
        return users;
    }

    return {
        list,
        get,
        upsert,
        like,
        postsLiked,
        postLikers
    }
}