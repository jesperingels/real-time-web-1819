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

let onlineUsers = [];

app.get('/', (req, res) => {
    res.render('pages/register.ejs');
});

app.post('/', (req, res) => {
    console.log('form sent');

    // on user connected
    io.on('connection', socket => {
        let thisUser = req.body.user;
        console.log('a user connected');

        if(onlineUsers.includes(thisUser)) {
            console.log('user exists')
        } else {
            onlineUsers.push(thisUser);
        }
        console.log(onlineUsers.length + onlineUsers);
        io.emit("user connect", onlineUsers);

        // on user disconnect
        socket.on("disconnect",() => {
            console.log(thisUser + " disconnected");

            for( let i = 0; i < onlineUsers.length; i++){
                if ( onlineUsers[i] === thisUser) {
                    onlineUsers.splice(i, 1);
                }
            }

            io.emit("user disconnect", onlineUsers);
        });

        if(onlineUsers.length === 2) {

            rp(options())
                .then(res => {
                    console.log(res);
                })
                .catch(function (err) {
                    console.log(err);
                });

            io.emit('start quiz');
        }

    });

    res.render('pages/lobby.ejs');
});

app.get('/quiz', (req, res) => {
    res.render('pages/quiz.ejs');
});



const options = () => {
    return {
        url:`localhost:3008/api/v1/quiz`,
    }};


http.listen(port, () => console.log('App listening on port: ' + port ));


