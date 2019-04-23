const express = require('express');
require('ejs');
const app = express();
const rp = require('request-promise');
const http = require('http').Server(app);
const request = require('request');
const io = require('socket.io')(http);
const randomInt = require('random-int');
const port = process.env.PORT || 3008;
const bodyParser = require('body-parser');
const db = require('../public/db.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/v1/quiz', (req, res) => {
    res.status(200).send({
        db: db
    })
});

http.listen(port, () => console.log('App listening on port: ' + port ));


