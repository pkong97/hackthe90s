//write 10 official questions in JSON file 
const fs = require('fs');
const question =require('./question');

var getQuestions = () => {
    var q = question.getQuestions();
    var resultString = JSON.stringify(q);
    fs.writeFileSync('test.json',resultString);
    console.log(resultString);

//open the file and change it
    var readQuestion = fs.readFileSync('test.json');
    var questionObject = JSON.parse(readQuestion);

};

module.exports={
    getQuestions,
}