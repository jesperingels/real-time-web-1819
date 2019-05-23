const express = require('express');
require('ejs');
const app = express();
const rp = require('request-promise');
const http = require('http').Server(app);
require('request');
const io = require('socket.io')(http);
// const randomInt = require('random-int');
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


    socket.on('userData', userData => {
        if(userData[1].gamma < 0) {
            if(xAxis < 270) {
                xAxis += 5;
            }
        }
        else {
            if(xAxis > 0) {
                xAxis -= 5;
            }
        }

        if(userData[1].beta < 0) {
            if(yAxis < 370) {
                yAxis += 5;
            }
        }
        else {
            if(yAxis > 0) {
                yAxis -= 5;
            }
        }

        let position = {
            "xAxis": xAxis,
            "yAxis": yAxis
        };

        let serverData = [userData[0], position];

        io.emit('serverData', serverData);


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



    // Background functionality
    let top = 0,
        right = 0,
        bottom = 0,
        left = 0;


    const checkPosition = setInterval(() => {
        if (xAxis < 10) {
            if(left !== 2) {
                left += 1;
            }
        }

        if (xAxis > 260) {
            if(right !== 2) {
                right += 1;
            }
        }

        if (yAxis < 10 || (xAxis > 260)) {

        }

        if(left === 2 && right === 2) {
            callEyes();
        }

    }, 500);





   const callEyes = ()=>{

       rp(api('eyes'))
           .then(res => {
               const info = JSON.parse(res);
               const gif = info.data.map(el => el.images);
               console.log(gif[0].downsized.url);
               io.emit('giphy init', gif[0].downsized.url)
           })
           .catch(function (err) {
               console.log(err);
           });
       clearInterval(checkPosition);

   };






});

const api = (msg) => {
    return {
        url:`https://api.giphy.com/v1/gifs/search?q=${msg}&api_key=oz5yAcu5riJVWeOkoR1FAiFegepGemHX&limit=1`,
        headers: {
            'User-Agent': 'request',
            'Content-Type': 'text/html'
        }
    }};



http.listen(port, () => console.log('App listening on port: ' + port ));


