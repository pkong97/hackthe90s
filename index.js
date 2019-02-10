const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var bodyParser = require('body-parser')

const port = process.env.PORT || 8080;
// const app = express();
var app = require('express')();


//implement Json file
const json = require('./json');
const questions = require('./question');


var server = require('http').Server(app);
var io = require('socket.io')(server);

//this how we public the folder
// app.use(express.static('/public'));
var publicDir = require('path').join(__dirname,'/views');
app.use(express.static(publicDir));


// hbs.registerPartials(__dirname + '/views/');
// hbs.registerPartials(__dirname + '/');
app.set('view engine', 'hbs');

var user1 = 'jeff';
var user2 = 'gheff';

// bodyparser setup
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded ({
    extended: true
}));
hbs.use(bodyParser.json())


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

chat.on('connection', (socket) => {
    
    socket.on('join', (data) => {
        socket.join(data.room);
        chat.in(data.room).emit('message', `New user joined ${data.room} room!`);

    });
    

    socket.on('message', (data) => {
        answerCount += data.an
        console.log(answerCount)
        if (answerCount == 2) {
            answerCount = 0
            io.sockets.emit('broadcast', 'reset');
            console.log('down')
        }
        

        chat.in(data.room).emit('message', data.msg, data.name, data.an);
    });




    socket.on('disconnect', () => {
        console.log('user disconnected');

        chat.emit('message', 'user disconnected');

});
});


// console.log('Loading...');
// json.getQuestions(questions.getQuestions());
//     })

