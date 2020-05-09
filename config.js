module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || '0JUip6NmeT',
        password: process.env.MYSQL_PASS || 'DjxIuZv6qQ',
        database: process.env.MYSQL_DB || '0JUip6NmeT'
    }
}