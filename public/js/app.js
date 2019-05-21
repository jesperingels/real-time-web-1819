(() => {

    // const socket = io();
    let xAxis = 0;
    let yAxis = 0;
    const jingle = document.getElementById('jingle');
    const scat = document.getElementById('scat');
    const dance = document.getElementById('dance');
    const spoken = document.getElementById('spoken');

    let onlineUsers = [];

    // On device rotation
    window.ondeviceorientation = function (e) {

        let alpha = Math.floor(e.alpha);
        let beta = Math.floor(e.beta);
        let gamma = Math.floor(e.gamma);

        const ball = document.getElementById('ball');
        const deviceData = document.querySelector('.device-data');
        deviceData.innerHTML = 'Alpha:' + alpha + ' Beta:' + beta + ' Gamma:' + gamma;


        if(gamma < 0) {
            if(xAxis < 270) {
                xAxis += 5;
            }
        }
        else{
            if(xAxis > 0) {
                xAxis -= 5;

            }
        }
        ball.style.marginLeft = xAxis + "px";

        if(beta < 0) {
            if(yAxis < 370) {
                yAxis += 5;
            }

        }
        else {
            if(yAxis > 0) {
                yAxis -= 5;

            }
        }

        ball.style.marginTop = yAxis + "px";
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
    const button = document.getElementById('button');
    button.addEventListener('click', () => {
        jingle.play();
        button.classList.add('hidden');
    })


})();



// var bal = document.getElementById("bal")
// var horizontaal = 0;
// var verticaal = 0;
//
// window.ondeviceorientation = function rotatie(e){
//     var a = Math.floor(e.alpha);
//     var b = Math.floor(e.beta);
//     var g = Math.floor(e.gamma);
//     var tekst = "Alpha:"+ a + "<br>" + "Beta:" + b + "<br>" + "Gamma:" + g;
//     bericht.innerHTML= tekst;
//
//     var alphaDiv = document.getElementById('alpha');
//     var betaDiv = document.getElementById('beta');
//     var gammaDiv = document.getElementById('gamma');
//
//
//     if(g < 0){
//         if(horizontaal < 300) {
//             horizontaal = horizontaal + 5;
//         }
//     }
//     else{
//         if(horizontaal > 0) {
//             horizontaal = horizontaal - 5;
//
//         }
//     }
//     bal.style.marginLeft = horizontaal + "px";
//
//     if(b < 0) {
//         if(verticaal < 300) {
//             verticaal = verticaal + 5;
//         }
//
//     } else{
//         if(verticaal > 0) {
//             verticaal = verticaal - 5;
//         }
//
//     }
//
//     bal.style.marginTop = verticaal + 'px';
//     if(verticaal > 290) {
//         bal.style.backgroundColor = 'pink';
//     }
//     else {
//         if (verticaal < 10) {
//             bal.style.backgroundColor = 'blue';
//         }
//     }
// }
//

