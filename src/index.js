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

        socket.emit('clientID', socket.id);

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



    // socket.on('storageId', Id => {
    //     console.log(Id);
    //     io.emit('server clientId', Id);
    // });

    let xAxis = 0;
    let yAxis = 0;

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

    socket.on('beta', beta => {

        if(beta < 0) {
            if(yAxis < 370) {
                yAxis += 5;
            }
        }
        else {
            if(yAxis > 0) {
                yAxis -= 5;
            }
        }

        io.emit('server yAxis', yAxis);

    });


    // Send music play or pause to client
    if (yAxis > 360) {
        io.emit('jingle play');
    }
    else if (yAxis < 350) {
        io.emit('jingle pause');
    }

    if (yAxis < 10) {
        io.emit('scat play');
    }
    else if (yAxis > 20) {
        io.emit('scat pause');
    }

    if (xAxis > 260) {
        io.emit('dance play');
    }
    else if (xAxis < 250) {
        io.emit('dance pause');
    }

    if (xAxis < 10) {
        io.emit('spoken play');
    }
    else if (xAxis > 20) {
        io.emit('spoken pause');
    }


});

http.listen(port, () => console.log('App listening on port: ' + port ));


