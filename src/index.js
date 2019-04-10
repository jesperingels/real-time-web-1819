const express = require('express');
require('ejs');
const app = express();
var rp = require('request-promise');
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

app.get('/chat', function(req, res) {
    res.render('pages/index.ejs');
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('query', (msg) => {

        request(options(msg),callback);

        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                const info = JSON.parse(body);

                let gifs = info.data.map(el => el.images);
                console.log('test ' + gifs[randomInt(gifs.length)]);
                if(gifs.length === 0){
                    request(options("stupid"),callback)
                }else{
                    io.emit("giphy init", gifs[randomInt(gifs.length)])
                }
            }
        }

        // io.emit('query', msg);
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


