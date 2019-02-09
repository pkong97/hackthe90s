const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var bodyParser = require('body-parser')

const port = process.env.PORT || 8080;
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

const checkAnswers = require('./check-answers.js');

hbs.registerPartials(__dirname + '/views');
hbs.registerPartials(__dirname + '/');
app.set('view engine', 'hbs');

var user1 = 'jeff';
var user2 = 'gheff';

// bodyparser setup
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded ({
    extended: true
}));
app.use(bodyParser.json())


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



app.get('/', (request, response) => {
    response.render('home.hbs')
});

app.get('/chatroom', (request, response) => {
    response.render('chatroom.hbs')

});

app.get('/questions', (request, response) => {
    var json = fs.readFileSync('q.json');
    
    var qs = JSON.parse(json)
    var sq = JSON.stringify(qs)
    console.log(sq)
    response.render('questions.hbs', {
        user1: user1,
        user2: user2,
        questions: sq
    })
    
});

app.post('/questions', (request, response) => {
    console.log(request.body)
})

const chat = io.of('/chat');

var answerCount = 0;
var answers = [];

chat.on('connection', (socket) => {
    
    socket.on('join', (data) => {
        socket.join(data.room);
        chat.in(data.room).emit('message', `New user joined ${data.room} room!`);

    });
    

    socket.on('message', (data) => {
        answerCount += data.an
        console.log(answerCount)
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
        

        chat.in(data.room).emit('message', data.msg, data.name, data.an);
    });




    socket.on('disconnect', () => {
        console.log('user disconnected');

        chat.emit('message', 'user disconnected');

    })
})
