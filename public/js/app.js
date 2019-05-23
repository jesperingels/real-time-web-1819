(() => {

    const socket = io();
    const userWindow = document.getElementById('online-users');
    const main = document.querySelector('main');
    let onlineUsers = [];

    if(document.querySelector('form')) {
        window.localStorage.clear();
        const form = document.querySelector('form');
        const input = document.querySelector('.usernameInput');

        form.addEventListener('submit', () => {
            let username = window.localStorage.getItem(`username`);

            if(!username) {
                window.localStorage.setItem(`username`, input.value);
            }
        })
    }



    socket.on('user connect', users => {

        if(main) {

            // on user connect clear online users and userWindow
            onlineUsers.length = 0;
            userWindow.innerHTML = '';

            // On each connected user clear all 'ball elements'
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }

            console.log(users);
            console.log(onlineUsers);

            // For each online user from server, push the user name to the client side array (onlineUsers)
            users.forEach( user => {
                onlineUsers.push(user);
                console.log(user);
            });

            // For each online user in the client side array (onlineUsers)
            onlineUsers.forEach(onlineUser => {

                const userName = document.createElement('div');
                userName.innerText = onlineUser.name;
                userName.style.color = onlineUser.color;
                userWindow.appendChild(userName);

                let ball = document.createElement('div');
                ball.setAttribute('class', `ball`);
                ball.setAttribute('id', `${onlineUser.name}`);
                ball.style.backgroundColor = onlineUser.color;
                ball.style.color = onlineUser.color;
                main.appendChild(ball);
            });


            // play audio on device orientation
            const jingle = document.getElementById('jingle');
            const scat = document.getElementById('scat');
            const dance = document.getElementById('dance');
            const spoken = document.getElementById('spoken');


            // On device rotation
            window.ondeviceorientation = function (e) {
                let localUserName = window.localStorage.getItem('username');

                let beta = Math.floor(e.beta);
                let gamma = Math.floor(e.gamma);

                let position = {
                    beta: beta,
                    gamma: gamma
                };

                let userData = [localUserName, position];

                socket.emit('userData', userData);


                socket.on('serverData', serverData => {
                    let user = serverData[0],
                        pos = serverData[1],
                        ball = document.getElementById(`${user}`);

                    // ball.setAttribute('style',`transform: translate(${pos.xAxis}px,${pos.yAxis}px)`);
                    ball.style.transform = `translate(${pos.xAxis}px,${pos.yAxis}px)`;

                });



                socket.on('jingle play', () => {
                    jingle.play();
                });
                socket.on('jingle pause', () => {
                    jingle.pause();
                });

                socket.on('scat play', () => {
                    scat.play();
                });
                socket.on('scat pause', () => {
                    scat.pause();
                });

                socket.on('dance play', () => {
                    dance.play();
                });
                socket.on('dance pause', () => {
                    dance.pause();
                });

                socket.on('spoken play', () => {
                    spoken.play();
                });
                socket.on('spoken pause', ()=>{
                    spoken.pause();
                });



            };

            if (document.getElementById('button')) {
                const button = document.getElementById('button');
                button.addEventListener('click', () => {
                    jingle.play();
                    button.classList.add('hidden');
                })
            }
        }
    });

    socket.on('giphy eyes init', gif => {
        // console.log(gif);
        main.style.backgroundImage = `url('${gif}')`;
    });

    socket.on('giphy cats init', gif => {
        // console.log(gif);
        main.style.backgroundImage = `url('${gif}')`;
    });


    // Delete disconnected user from onlineUsers array
    socket.on('user disconnect', stillOnlineUsers => {

        onlineUsers.length = 0;
        userWindow.innerHTML = '';

        stillOnlineUsers.forEach(user => {
            onlineUsers.push(user);
        });

        onlineUsers.forEach(onlineUser => {
            console.log(onlineUser.name);
            const userName = document.createElement('div');
            userName.innerText = onlineUser.name;
            userWindow.appendChild(userName);
        });
    });

})();



