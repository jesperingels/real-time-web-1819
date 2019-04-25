(() => {
    const socket = io();
    const log = document.querySelector('.log');
    const form = document.querySelector('.form');
    const input = document.getElementById('username');

    let onlineUsers = [];


    if (form) {
        // On form submit
        form.addEventListener('submit', function(e) {
            console.log(input.value);
            const query = input.value;
            // Prevent default form functionality
            e.preventDefault();

            // Send event 'query' to server with input value
            socket.emit('query', query);

            // clear input field
            input.value = "";
            form.submit();
            console.log(query)
        });
    }


    // On received event 'user connect' from server
    socket.on('user connect', (name) => {
        console.log('user connected!');
        console.log(name);

        // clear all HTML in the log
        if (log) {
            while (log.firstChild) {
                log.removeChild(log.firstChild);
            }
            console.log('naam'+name);

            // Check if there are no users connected
            if(name.length === 0) {
                console.log('0 users connected');
            }
            // If users are still connected
            else {
                // For each user, add the user to log
                name.forEach((item) => {
                    // Add "'user' is connected" to log
                    const list = document.createElement('li');
                    list.innerText = item + ' is connected';
                    log.appendChild(list);
                });
            }
        }
    });

    // On received event 'user disconnect' from server
    socket.on('user disconnect', (user) => {
        console.log(user);
        console.log('user disconnected');

        // clear all HTML in the log
        if (log) {
            while (log.firstChild) {
                log.removeChild(log.firstChild);
            }

            // Check if there are no users connected
            if(name.length === 0) {
                console.log('0 users connected');
            }
            // If users are still connected
            else {
                // For each user, add the user to log
                name.forEach((item) => {
                    // Add "'user' is connected" to log
                    const list = document.createElement('li');
                    list.innerText = item + ' is connected';
                    log.appendChild(list);
                });
            }
        }


    });

    socket.on('start quiz', (data) => {
        // // Change URL to quiz
        // if(window.location.href.indexOf('/quiz') > 0) {
        //     console.log('quiz has started!')
        // } else {
        //     window.location.href = '/quiz';
        // }

        const question = document.getElementById('question');
        const subTitle = document.getElementById('subtitle');
        const answers = document.querySelector('.answers');
        const log = document.querySelector('.log');
        answers.style.display = 'block';
        log.style.display = 'none';

        question.innerText = '';
        subTitle.innerText = '';
        // answers.innerHTML = '';

        initQuiz(data);
        console.log('start quiz');
    });

    function initQuiz (data) {
        console.log('initquiz is started');
        console.log(data);
        const question = document.getElementById('question');
        const answerList = document.querySelector('.answers');

        // const list1 = document.getElementById('list1');
        // const list2 = document.getElementById('list2');
        // const list3 = document.getElementById('list3');
        // const list4 = document.getElementById('list4');

        const list = document.querySelectorAll('listItem');

        const listArr = [data[0].rightAnswer, data[0].incorrect3, data[0].incorrect2, data[0].incorrect1];

        // const listArr = [
        //     {
        //         list: document.createElement('li'),
        //         button1: document.createElement('input')
        //     },
        //     {
        //         list: document.createElement('li'),
        //         button2: document.createElement('input')
        //     },
        //     {
        //         list3: document.createElement('li'),
        //         button3: document.createElement('input')
        //     },
        //     {
        //         list4: document.createElement('li'),
        //         button4: document.createElement('input')
        //     }];

        question.innerText = data[0].question;
        // list1.innerText = data[0].rightAnswer;
        // list2.innerText = data[0].incorrect3;
        // list3.innerText = data[0].incorrect2;
        // list4.innerText = data[0].incorrect1;

        const ranList = shuffle(listArr);

        console.log(ranList);
        console.log(list);

        // list.forEach((item) => {
        //     answerList.appendChild(item);
        // })

        for (let i = 0; i > list.length; i++) {
            list[i].innerText = 'test';
            console.log(list);
            answerList.appendChild(list[i]);
        }

    }

    function shuffle(array) {
        var i = array.length,
            j = 0,
            temp;
        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            // swap randomly chosen element with current element
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


})();

