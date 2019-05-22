(() => {

    const socket = io();
    // const user = document.querySelectorAll('user');
    const userWindow = document.getElementById('online-users');
    const main = document.querySelector('main');
    let onlineUsers = [];

    window.localStorage.clear();

    socket.on('user connect', name => {

        if(main) {

            // on user connect clear online users and userWindow
            onlineUsers.length = 0;
            userWindow.innerHTML = '';

            // On each connected user clear all 'ball elements'
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }

            console.log(name);
            console.log(onlineUsers);

            // For each online user from server, push the user name to the client side array (onlineUsers)
            name.forEach( user => {
                onlineUsers.push(user);
                console.log(user);
            });

            // For each online user in the client side array (onlineUsers)
            onlineUsers.forEach(onlineUser => {

                const clientId = window.localStorage.getItem(`clientId`);
                
                const userName = document.createElement('div');
                userName.innerText = onlineUser;
                userWindow.appendChild(userName);

                let ball = document.createElement('div');
                ball.setAttribute('class', `ball ${clientId}`);
                main.appendChild(ball);
            });




            // play audio on device orientation
            const jingle = document.getElementById('jingle');
            const scat = document.getElementById('scat');
            const dance = document.getElementById('dance');
            const spoken = document.getElementById('spoken');


            // On device rotation
            window.ondeviceorientation = function (e) {

                let beta = Math.floor(e.beta);
                let gamma = Math.floor(e.gamma);

                socket.emit('gamma', gamma);
                socket.emit('beta', beta);

                // Select 'connected users' created div
                let ball = document.querySelector('.ball');


                socket.on('server xAxis', serverX => {
                    console.log('serverX'+serverX);
                    document.getElementById('console').innerText = serverX;
                    ball.style.marginLeft = `${serverX}px`;
                });

                socket.on('server yAxis', serverY => {
                    console.log('serverY'+serverY);
                    ball.style.marginTop = `${serverY}px`;

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

    socket.on('clientID', Id => {
        let clientId = window.localStorage.getItem(`clientId`);

        if(!clientId) {
            window.localStorage.setItem(`clientId`, Id);
        }
    });

    // Delete disconnected user from onlineUsers array
    socket.on('user disconnect', stillOnlineUsers => {

        onlineUsers.length = 0;
        userWindow.innerHTML = '';

        stillOnlineUsers.forEach(user => {
            onlineUsers.push(user);
        });

        onlineUsers.forEach(onlineUser => {
            const userName = document.createElement('div');
            userName.innerText = onlineUser;
            userWindow.appendChild(userName);
        });
    });


})();



