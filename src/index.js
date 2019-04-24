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

    io.on('connection', socket => {

        socket.on('query', user => {
            console.log(user);
            if(onlineUsers.includes(user)) {
                console.log('user exists')
            } else {
                onlineUsers.push(user);
            }
            console.log(onlineUsers);
        });
    });
});




app.get('/lobby', (req,res) =>{

    // on user connected
    io.on('connection', socket => {
        io.emit("user connect", onlineUsers);

        // on user disconnect
        socket.on("disconnect",(thisUser) => {
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
                    const data = JSON.parse(res);
                    console.log(data);
                    io.emit('start quiz', data.db);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    });


        res.render('pages/lobby.ejs');
    });


app.get('/quiz', (req, res) => {
    res.render('pages/quiz.ejs');
});



const options = () => {
    return {
        url:`https://slimste-stad-van-nederland.herokuapp.com/api/v1/quiz`,
    }};


http.listen(port, () => console.log('App listening on port: ' + port ));


