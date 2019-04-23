(() => {
    const socket = io();
    const log = document.querySelector('.log');
    const form = document.querySelector('.form');
    const input = document.getElementById('username');

    let onlineUsers = [];

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            socket.emit('newUser', input.value);
            window.location.replace('/lobby')
        });
    }



    socket.on('user connect', (name) => {
        if (log) {
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
        }

    });

    socket.on('user disconnect',(user) => {
        console.log(user);

        if (log) {
            while (log.firstChild) {
                log.removeChild(log.firstChild);
            }

            user.forEach((item)=>{
                const list = document.createElement('li');

                list.innerText = item + ' is connected';
                log.appendChild(list);
            })
        }


    });

    socket.on('start quiz', (data) => {
        // Change URL to quiz
        if(window.location.href.indexOf('/quiz') > 0) {
            console.log('quiz has started!')
        } else {
            window.location.replace('/quiz')
        }
        initQuiz(data);
        console.log('start quiz');
    });

    function initQuiz (data) {
        const question = document.getElementById('question');
        const answerList = document.querySelector('.answers');
        const list1 = document.createElement('li');
        const list2 = document.createElement('li');
        const list3 = document.createElement('li');
        const list4 = document.createElement('li');
        question.innerText = data[0].question;
        list1.innerText = data[0].rightAnswer;
        list2.innerText = data[0].incorrect3;
        list3.innerText = data[0].incorrect2;
        list4.innerText = data[0].incorrect1;
        const listArr = [list1, list2, list3, list4];

        const ranList = shuffle(listArr);

        ranList.forEach((item)=>{
            answerList.appendChild(item);
        })

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

