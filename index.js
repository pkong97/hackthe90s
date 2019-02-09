const express = require('express');
const port = process.env.PORT || 8080;
var app = express();
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.get('/', (request, response) => {
    response.render('home.hbs')
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);

});