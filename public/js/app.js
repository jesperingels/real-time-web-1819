(() => {
    const socket = io();
    const log = document.querySelector('.log');

    let onlineUsers = [];

    socket.on('user connect', (name) => {

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

    socket.on('user disconnect',(user) => {

        while (log.firstChild) {
            log.removeChild(log.firstChild);
        }

        user.forEach((item)=>{
            const list = document.createElement('li');

            list.innerText = item + ' is connected';
            log.appendChild(list);
        })

    });

    socket.on('start quiz', () => {
        window.location.href = '/quiz';
        console.log('start quiz');
    })


})();

