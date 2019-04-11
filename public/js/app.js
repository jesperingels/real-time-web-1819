(() => {
    const form = document.querySelector('form');
    const socket = io();
    const input = document.getElementById('m');
    const output = document.getElementById('messages');

    form.addEventListener('submit', function(e) {
        const username = localStorage.getItem('username');
        const query = [input.value, username];
        e.preventDefault();
        socket.emit('query', query);

        input.value = "";
    });

    // socket.on('query', (msg) => {
    //
    //     console.log('message', msg);
    //
    //     msg.data.forEach((prop)=>{
    //         console.log(prop.url);
    //
    //         const img = document.createElement('img');
    //         console.log(img);
    //         img.src = prop.url;
    //         const outputHTML = document.createElement('li');
    //         outputHTML.appendChild(img);
    //     });
    // });

    socket.on("giphy init", async (obj)=>{
        console.log(obj);
        console.log(obj[1]);
        console.log(obj.length);

        let newImg = document.createElement("img");
        let newListItem = document.createElement('li');
        let username = document.createElement('h3');

        username.innerText = obj[1];
        newImg.src = await obj[0].original.url;
        document.querySelector("#messages").appendChild(newListItem);
        newListItem.appendChild(username);
        newListItem.appendChild(newImg);
        updateScroll();
    });

    const updateScroll = () => {
        // const body = document.body;
        document.body.scrollTop = document.body.scrollHeight;
    };

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

