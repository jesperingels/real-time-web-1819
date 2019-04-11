const express = require('express');
require('ejs');
const app = express();
const rp = require('request-promise');
const http = require('http').Server(app);
const request = require('request');
const io = require('socket.io')(http);
const randomInt = require('random-int');
const port = process.env.PORT || 3001;
const fetch = require('node-fetch');

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', function(req, res) {
    res.render('pages/login.ejs');
});

app.post('/', function(req, res) {
    res.render('pages/index.ejs');
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('query', (msg) => {
        const chatMsg = msg[0];
        const username = msg[1];

        // console.log(name);

        // request(options(chatMsg),callback);

        rp(options(chatMsg))
            .then(res => callback(res))
            .catch(function (err) {
                console.log(err);
            });

        function callback(res) {
            // if (!error && res.statusCode === 200) {
                const info = JSON.parse(res);

                const gifs = info.data.map(el => el.images);
                const data = [gifs[randomInt(gifs.length)], username];
                // console.log('test ' + gifs[randomInt(gifs.length)]);
                if(data.length === 0) {
                    request(options("stupid"),callback)
                } else{
                    io.emit("giphy init", data)
                }
            // }
        }

    });




});

const options = (msg)=>{
        return {
            url:`https://api.giphy.com/v1/gifs/search?q=${msg}&api_key=oz5yAcu5riJVWeOkoR1FAiFegepGemHX&limit=10`,
            headers: {
                'User-Agent': 'request',
                'Content-Type': 'text/html'
    }
}};

http.listen(port, () => console.log('App listening on port: ' + port ));


