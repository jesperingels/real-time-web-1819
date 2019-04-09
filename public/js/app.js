(() => {
    const form = document.querySelector('form');
    const socket = io();
    const input = document.getElementById('m');
    const output = document.getElementById('messages');

    form.addEventListener('submit', function(e) {
        const query = input.value;
        e.preventDefault();
        socket.emit('query', query);

        fetch();

        input.value = "";
    });

    socket.on('query', (msg) => {

        console.log('message', msg);

        msg.data.forEach((prop)=>{
            console.log(prop.url);

            const img = document.createElement('img');
            console.log(img);
            img.src = prop.url;
            const outputHTML = document.createElement('li');
            outputHTML.appendChild(img);
        });
    });

    socket.on("giphy init",(e)=>{
        console.log(e);
        e.forEach(el=>{
            let newImg = document.createElement("img");
            newImg.src = el.original.url;
            document.querySelector("#messages").appendChild(newImg)
        })
    })


})();

