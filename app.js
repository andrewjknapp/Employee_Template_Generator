const fs = require('fs');
const question = require('./lib/question');

question.questions.then(result => console.log(result)).catch(err => console.log(err));
    
