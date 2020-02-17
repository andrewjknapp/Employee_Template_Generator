const fs = require('fs');
const chalk = require('chalk');
const question = require('./lib/question');

question.questions.then(result => console.log(result));
    
