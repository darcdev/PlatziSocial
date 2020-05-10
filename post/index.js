const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const post = require('./components/post/network');

const app = express();

app.use(bodyParser.json());


app.use('/api/post', post);

app.listen(config.post.port, () => {
    console.log('Api escuchando en el puerto', config.post.port);
});