const fs = require('fs');
const style = require('./style');
const path = require('path');

require('events').EventEmitter.defaultMaxListeners = 50;
const templateEmp = path.resolve(process.cwd(), 'templates', 'employee.html');
const templateInd = path.resolve(process.cwd(), 'templates', 'index.html');
const outputDes = path.resolve(process.cwd(), 'output', 'index.html');
const templateStyle = path.resolve(process.cwd(), 'templates', 'style.css');
const styleDest = path.resolve(process.cwd(), 'output', 'style.css');

let employee = '';
fs.readFile(templateEmp, 'utf8', (err, data) => {
    if (err) {
        throw err;
    } else {
        employee = data;
    }
})

function pageWritter(infoArr) {
    let page = ``;
    //page += JSON.stringify(infoArr, null, 1);

    fs.readFile(templateInd, 'utf8', (err, data) => {
        if(err) {
            throw err;
        } else {
            data = data.replace('*%', infoArr[0]);
            data = data.replace('*%', infoArr[0]);
            let team = '';
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

            data = data.replace('*%', team);

            fs.writeFile(outputDes, data, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log(style.rAiNbOw("\n----------------\nFile Written\n----------------"));
                }
            })

        }
    })
    

    fs.copyFile(templateStyle, styleDest, (err) => {
        if (err) {
            throw err;
        }
    })
}

module.exports = {
    pageWritter
}
