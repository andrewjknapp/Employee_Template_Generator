const question = require('./lib/question');
const pageMaker = require('./lib/pageMaker');

question.questions
    .then(
        result => pageMaker.pageWritter(result)
    ).catch(
        err => console.log(err)
    );
    
