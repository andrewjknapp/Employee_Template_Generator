const fs = require('fs');
const question = require('./lib/question');
const pageMaker = requre('./lib/pageMaker');

question.questions
    .then(
        result => pageMaker.pageWritter(result)
    ).catch(
        err => console.log(err)
    );
    
