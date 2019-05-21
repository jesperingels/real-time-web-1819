(() => {

    const socket = io();
    // const user = document.querySelectorAll('user');
    const userWindow = document.getElementById('online-users');
    const main = document.querySelector('main');
    let onlineUsers = [];

    socket.on('user connect', name => {

        // on user connect clear online users and userWindow
        onlineUsers.length = 0;
        userWindow.innerHTML = '';

        if(main) {

            console.log(name);
            console.log(onlineUsers);

            name.forEach( user => {

                onlineUsers.push(user);



                const ball = document.createElement('div');
                ball.setAttribute('id', 'ball');
                main.appendChild(ball);
            });

            onlineUsers.forEach(onlineUser => {
                const userName = document.createElement('div');
                userName.innerText = onlineUser;
                userWindow.appendChild(userName);
            });



        }
    });

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

    socket.on('server beta', XY => {

    });

    // play audio on device orientation
    let xAxis = 0;
    let yAxis = 0;
    const jingle = document.getElementById('jingle');
    const scat = document.getElementById('scat');
    const dance = document.getElementById('dance');
    const spoken = document.getElementById('spoken');


    // On device rotation
    window.ondeviceorientation = function (e) {

        let alpha = Math.floor(e.alpha);
        let beta = Math.floor(e.beta);
        let gamma = Math.floor(e.gamma);

        socket.emit('gamma', gamma);

        const ball = document.getElementById('ball');



        socket.on('server xAxis', serverX => {
            // console.log(serverX);
            // alert(serverX);
            ball.style.marginLeft = serverX + "px";
        });


        if(beta < 0) {
            if(yAxis < 370) {
                yAxis += 5;

            }
            socket.emit('Client yAxis', yAxis);

        }
        else {
            if(yAxis > 0) {
                yAxis -= 5;

            }
            socket.emit('Client yAxis', yAxis);
        }

        // socket.on('server yAxis', serverY => {
        //     ball.style.marginTop = serverY + "px";
        // });




        if (yAxis > 360) {
            jingle.play();
        }
        else if (yAxis < 350) {
            jingle.pause();
        }

        if (yAxis < 10) {
            scat.play();
        }
        else if (yAxis > 20) {
            scat.pause();
        }

        if (xAxis > 260) {
            dance.play();
        }
        else if (xAxis < 250) {
            dance.pause();
        }

        if (xAxis < 10) {
            spoken.play();
        }
        else if (xAxis > 20) {
            spoken.pause();
        }



    };

    if (document.getElementById('button')) {
        const button = document.getElementById('button');
        button.addEventListener('click', () => {
            jingle.play();
            button.classList.add('hidden');
        })
    }



})();



