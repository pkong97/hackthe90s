const yargs = require('yargs');
const _ = require('lodash');
const json = require('./json');

//generate a list of questions
var questions_list = {
    easy: ["What is your favorite pet?",
            "Coffee or tea?",
            "Your dream vacation would be in",
            "Who is your idol?",
            "Rate yourself on scale 10 when dating",
            "What is your favorite fruit?",
            "Instagram, spapchat, or Facebook or none",
            "What is your favorite Holidays?",
            "Your favorite color?",
            "Are you here to date or make friends?",
            "Are you closed to family or friends more?"],

    med : ["What do you do in your free time?",
           "What did you do last summer?",
           "Your favorite restaurant",
           "What is your favorite movie?",
           "If you can send a present to your mom, what will you buy?"],

    hard: ["What type of music you like?",
          "Disgusting food that you have ever had in your life",
          "What was your favorite age?",
          "If you can travel in time, you will go to the past or future?",
          ]
}
//get random questions 
// array.push(_.dropRight(easy,3),_.dropRight(med,2),_.dropRight(hard,3));
// console.log(array);
//create random questions as a function
var getQuestions  = () => {
       var easy = _.shuffle(questions_list.easy);
       var med = _.shuffle(questions_list.med);
       var hard = _.shuffle(questions_list.hard);
       var official_question = _.dropRight(easy,1);
       official_question.concat(_.dropRight(med,1),_.dropRight(hard,1));
       return official_question;
};

module.exports = {
       getQuestions,
   };




       
