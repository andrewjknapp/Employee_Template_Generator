const fs = require('fs');
const style = require('./style');
const path = require('path');

//Increases the number of listeners to avoid warning after 11 prompts
require('events').EventEmitter.defaultMaxListeners = 50;

//Builds each path for working with file system
const templateEmp = path.resolve(process.cwd(), 'templates', 'employee.html');
const templateInd = path.resolve(process.cwd(), 'templates', 'index.html');
const outputDes = path.resolve(process.cwd(), 'output', 'index.html');
const templateStyle = path.resolve(process.cwd(), 'templates', 'style.css');
const styleDest = path.resolve(process.cwd(), 'output', 'style.css');

//Stores data from employee template in the variable employee
let employee = '';
fs.readFile(templateEmp, 'utf8', (err, data) => {
    if (err) {
        throw err;
    } else {
        employee = data;
    }
})

//Takes in infoArr from the question.js to create the html page
function pageWritter(infoArr) {

    
    fs.readFile(templateInd, 'utf8', (err, data) => {
        if(err) {
            throw err;
        } else {
            //Replaces first two *% with the project name
            data = data.replace('*%', infoArr[0]);
            data = data.replace('*%', infoArr[0]);

            //Will hold all the information about the team members
            let team = '';
            //Loops through infoArr and replaces *% with corresponding info from infoArr
            for (let i = 1; i < infoArr.length; i++) {
                let current = employee;
                current = current.replace('*%', infoArr[i].name);
                current = current.replace('*%', infoArr[i].icon);
                current = current.replace('*%', infoArr[i].getRole());
                current = current.replace('*%', infoArr[i].id);
                current = current.replace('*%', infoArr[i].email);
                current = current.replace('*%', infoArr[i].email);
                switch (infoArr[i].getRole()) {
                    case 'Manager':
                        current = current.replace('*%', `Office Number: ${infoArr[i].officeNumber}`);
                        break;
                    case 'Engineer':
                        current = current.replace('*%', `GiHub Username: <a href="https://github.com/${infoArr[i].github}" target="_blank">${infoArr[i].github}</a>`);
                        break;
                    case 'Intern':
                        current = current.replace('*%', `School: ${infoArr[i].school}`);
                }
                team += current;
            }

            //Adds team member information to data
            data = data.replace('*%', team);

            //Writes all info from data into an index.html file in output
            fs.writeFile(outputDes, data, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log(style.rAiNbOw("\n----------------\nFile Written\n----------------"));
                }
            })

        }
    })
    
    //Copies the template style.css to the output directory
    fs.copyFile(templateStyle, styleDest, (err) => {
        if (err) {
            throw err;
        }
    })
}

module.exports = {
    pageWritter
}
