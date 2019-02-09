const express = require('express');
const port = process.env.PORT || 8080;
var app = express();
const hbs = require('hbs');
//implement Json file
const json = require('./json');
const questions = require('./question');
const yargs = require('yargs');

//import lodash and yargs


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.get('/', (request, response) => {
    response.render('home.hbs')
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);

});


console.log('Loading...');
json.getQuestions(questions.getQuestions());
