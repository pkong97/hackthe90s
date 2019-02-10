const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var bodyParser = require('body-parser')

const port = process.env.PORT || 8000;
// const app = express();
var app = require('express')();


//implement Json file
const jsonj = require('./json');
const questions = require('./question');
const checkAnswers = require('./check-answers');

var server = require('http').Server(app);
var io = require('socket.io')(server);


//this how we public the folder
// app.use(express.static('/public'));
var publicDir = require('path').join(__dirname,'/views');
app.use(express.static(publicDir));



// hbs.registerPartials(__dirname + '/views/');
// hbs.registerPartials(__dirname + '/');
//do post method, redirect to questions page, and change user1 name


app.set('view engine', 'hbs');

var user1 = 'jeff';
var user2 = 'gheff';
var sq = []


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    sq = JSON.stringify(jsonj.getQuestions(questions.getQuestions()))
});



app.get('/', (request, response) => {
    response.render('home.hbs')
});
app.post("/", function (req, res) {
    console.log(req.body.user.name)
    user1 = req.body.user.name
});

app.get('/loading', (request, response) => {
    response.render('loading.hbs')
});

app.get('/congrats', (request, response) => {
    score += 10;
    response.render('congrats.hbs', {
        score: score
    })
});

app.get('/chatroom', (request, response) => {
    console.log(user1)
    response.render('chatroom.hbs', {
        name: user1
    })

});

app.get('/questions', (request, response) => {

    response.render('questions.hbs', {
        user1: user1,
        user2: user2,
        questions: sq
    })

});

app.post('/questions', (request, respon2se) => {
    console.log(request.body)
})

const chat = io.of('/chat');
var answers = [];
var score = 0;

chat.on('connection', (socket) => {

    socket.on('join', (data) => {
        socket.join(data.room);
        chat.in(data.room).emit('message', `New user joined ${data.room} room!`);

    });

    socket.on('message', (data) => {
        if (data.room == 'questions') {
            answers.push(data.msg)
            if (answers.length == 2) {
                if (checkAnswers.matchAnswers(answers[0], answers[1])) {
                    chat.in(data.room).emit('answer', 'true')
                } else {
                    chat.in(data.room).emit('answer', 'false')
                }
                answers = []
                chat.in(data.room).emit('broadcast', 'reset')
                console.log('down')
            }
        }

        score = data.an;

        chat.in(data.room).emit('message', data.msg, data.name, data.an);
    });




    socket.on('disconnect', () => {
        console.log('user disconnected');

        chat.emit('message', 'user disconnected');

    });
});



