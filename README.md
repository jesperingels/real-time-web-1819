# Real-Time Web @cmda-minor-web · 2018-2019

## Concept
**De slimste stad van Nederland:** Meerdere mensen verbinden met de webapp. Hun locatie wordt in een overzicht getoond.
Bijvoorbeeld: Amsterdam, Utrecht, Rotterdam. De mensen uit deze drie steden gaan enkele quizvragen beantwoorden en kunnen 
zien wie de slimste stad van Nederland is. De muispositie van elke client wordt real-time op de server opgeslagen
ook de locatie van de client wordt op de server real-time opgeslagen. Degene die als eerste op het juiste antwoord klikt 
heeft gewonnen en scoort een punt voor zijn/haar stad. De vragen worden opgehaald uit een API die ik zelf aanmaak in Express.js

## API
Zo wordt is de data opgeslagen in mijn `db.js` file:
```javascript
quiz = [
    {
        question: 'Op de albumhoes van welk album van de Red Hot Chili Peppers zit een meisje achter de piano?',
        rightAnswer: 'One Hot Minute',
        incorrect1: 'Blood Suger Sex Magic',
        incorrect2: 'Californication',
        incorrect3: 'Mother\'s Milk'
    },

    {
        question: 'Welke stad ligt het meest noordelijk?',
        rightAnswer: 'Frankfurt',
        incorrect1: 'Stuttgart',
        incorrect2: 'München',
        incorrect3: 'Wenen'
    },

    {
        question: 'Hoe vaak won Michael Schumacher vanaf 2000 achter elkaar het WK Formule 1?',
        rightAnswer: '5 keer',
        incorrect1: '6 keer',
        incorrect2: '4 keer',
        incorrect3: '3 keer'
    },

    {
        question: 'Welke club werd kampioen van de eredivisie in het seizoen 2008/2009?',
        rightAnswer: 'AZ',
        incorrect1: 'PSV',
        incorrect2: 'De Graafschap',
        incorrect3: 'FC Twente'
    },

    {
        question: 'Wie was president van Amerika tijdens de Eerste Wereldoorlog?',
        rightAnswer: 'Wilson',
        incorrect1: 'Harding',
        incorrect2: 'Roosevelt',
        incorrect3: 'Taft',
    },

    {
        question: 'In welke film komt een computerexpert erachter dat de wereld waarin hij leeft niet echt is?',
        rightAnswer: 'The Matrix',
        incorrect1: 'Transformers',
        incorrect2: 'V for Vandetta',
        incorrect3: 'Aeon Flux'
    },

    {
        question: 'Wat is de titel van het debuutalbum van Coldplay?',
        rightAnswer: 'Parachutes',
        incorrect1: 'A rush of blood to the head',
        incorrect2: 'X&Y',
        incorrect3: 'Hot Fuss'
    },

    {
        question: 'Wanneer was de franse revolutie?',
        rightAnswer: '1789-1815',
        incorrect1: '1815-1821',
        incorrect2: '1889-1901',
        incorrect3: '1600-1612'
    },

    {
        question: 'Waar ligt de Nubische woestijn?',
        rightAnswer: 'Egypte',
        incorrect1: 'Turkmenistan',
        incorrect2: 'Irak',
        incorrect3: 'Namibië'
    },

    {
        question: 'Wanneer waren de olympische spelen in Sydney?',
        rightAnswer: '2000',
        incorrect1: '2002',
        incorrect2: '1960',
        incorrect3: '1964'
    }
];

module.exports = quiz;
```

in mijn index.js komt de database binnen en toon ik de data bij een get request met de url: `/api/v1/quiz`:
```javascript
const db = require('../public/db.js');

app.get('/api/v1/quiz', (req, res) => {
    res.status(200).send({
        db: db
    })
});
```




<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->

[rubric]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSd1I4ma8R5mtVMyrbp6PA2qEInWiOialK9Fr2orD3afUBqOyvTg_JaQZ6-P4YGURI-eA7PoHT8TRge/pubhtml