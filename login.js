const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var bodyParser = require('body-parser');
const db = require('./backend/queries');

// create new user
app.post('/users', db.createUser);

var app = express();

