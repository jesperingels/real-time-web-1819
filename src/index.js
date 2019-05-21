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


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));


let onlineUsers = [];

app.get('/', (req, res) => {
    res.render('pages/login.ejs');
});


app.post('/', function(req, res) {


    console.log('form sent');

    io.on('connection', socket => {
        let thisUser = req.body.user;
        console.log('a user connected');

        if(onlineUsers.includes(thisUser)) {
            console.log('user exists')
        } else {
            onlineUsers.push(thisUser);
        }
        console.log('online users= ' + onlineUsers);
        io.emit("user connect", onlineUsers);


        socket.on("disconnect",reason => {

            console.log(thisUser + " disconnected " + 'because ' + reason);

            for( let i = 0; i < onlineUsers.length; i++){
                if ( onlineUsers[i] === thisUser) {
                    onlineUsers.splice(i, 1);
                }
            }

            io.emit("user disconnect", onlineUsers);
        });
    });


    res.render('pages/index.ejs');
});

io.on('connection', socket => {

    let xAxis = 0;
    let yAxis = 0;

    // socket.on('Client xAxis', xAxis => {
    //     console.log('xAxis ' + xAxis);
    //     io.emit('server xAxis', xAxis);
    // });
    //
    // socket.on('Client yAxis', yAxis => {
    //     io.emit('server yAxis', yAxis);
    // })

    // socket.on('xLeft', () => {
    //     console.log('xLeft');
    //     if(xAxis < 270) {
    //         xAxis += 5;
    //     }
    //
    // });
    //
    // socket.on('xRight', () =>{
    //     console.log('xRight');
    //     if(xAxis > 0) {
    //         xAxis -= 5;
    //     }
    //
    // });

    socket.on('gamma', gamma => {

        if(gamma < 0) {
            if(xAxis < 270) {
                xAxis += 5;
            }
        }
        else {
            if(xAxis > 0) {
                xAxis -= 5;
            }
        }

        console.log(xAxis);
        console.log('gamma ' + gamma);

        io.emit('server xAxis', xAxis);

    });


});

http.listen(port, () => console.log('App listening on port: ' + port ));


