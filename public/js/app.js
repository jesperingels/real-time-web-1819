(() => {
    const form = document.querySelector('form');
    const socket = io();
    const input = document.getElementById('m');
    const output = document.getElementById('messages');
    let onlineUsers = [];
    const log = document.querySelector('.log');


    form.addEventListener('submit', function(e) {
        const username = localStorage.getItem('username');
        const query = [input.value, username];
        e.preventDefault();
        socket.emit('query', query);

        input.value = "";
    });

    // User connected/disconnected
    socket.on('user connect', (name)=>{

        while (log.firstChild) {
            log.removeChild(log.firstChild);
        }

        name.forEach((item) => {

            const list = document.createElement('li');
            list.innerText = item + ' is connected';
            log.appendChild(list);


        });

        console.log(name);
        console.log(onlineUsers);

    });

    socket.on("user disconnect",(user) => {

        console.log(user);

        while (log.firstChild) {
            log.removeChild(log.firstChild);
        }

        console.log('online users ' + onlineUsers);

        // for( let i = 0; i < onlineUsers.length; i++){
        //     if ( onlineUsers[i] === user) {
        //         onlineUsers.splice(i, 1);
        //     }
        // }

        console.log('online users2 ' + onlineUsers);


        user.forEach((item)=>{
            const list = document.createElement('li');

            list.innerText = item + ' is connected';
            log.appendChild(list);
        })

    });

    // Chat section
    socket.on("giphy init", async (obj)=>{

        console.log(obj);
        // console.log(typeof obj[0].original.url);

        let newImg = document.createElement("img");
        let newListItem = document.createElement('li');
        let username = document.createElement('h3');

        if (obj[0]) {
            username.innerText = obj[1];
            newImg.src = await obj[0].original.url;
        } else {
            newImg.src = 'https://media.giphy.com/media/xT9IgFWN8DXgWvqvBK/giphy.gif';
        }


        document.querySelector("#messages").appendChild(newListItem);
        newListItem.appendChild(username);
        newListItem.appendChild(newImg);
        updateScroll();
    });

    const updateScroll = () => {
        document.body.scrollTop = document.body.scrollHeight;
    };

    // Store login in localStorage
    if(document.getElementById('login')) {
        localStorage.clear();
        const form = document.querySelector('form');
        const input = document.querySelector('.usernameInput');
        form.addEventListener('submit', () => {
            localStorage.setItem('username', input.value);
            // socket.emit('name', username);
        });
    }



})();

