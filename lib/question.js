const inquirer = require('inquirer');
const { Employee, Manager, Engineer, Intern } = require('./class');
//const util = require('util');

const teamArr = [];

//const questionStart = util.promisify(promptUser);

function promptUser() {
    manager();
}

function manager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Manager name:",
            name: "name"
        },
        {
            type: "input",
            message: "Email:",
            name: "email"
        },
        {
            type: "input",
            message: "Office Number:",
            name: "office"
        }
    ]).then(function(ans) {
        teamArr.push(new Manager(ans.name, 1, ans.email, ans.office));
        another();
        //return new Manager(ans.name, 1, ans.email, ans.office);
    })
}

function teamMember() {
    inquirer.prompt([
        {
            type: "input",
            message: "Member Name:",
            name: "name"
        },
        {
            type: "rawlist",
            message: "Member Role:",
            name: "role",
            choices: [
                "Engineer",
                "Intern"
            ]
        }
    ]).then(function(ans) {
        teamArr.push(ans.name);
        another();
    })
}

function another() {
    inquirer.prompt(
        {
            type: "input",
            message: "Add another team member?",
            default: "yes",
            name: "continue"
        }
    ).then(function(ans) {
        
        if(ans.continue === 'yes') {
            teamMember();
        }//else call the make html function
        else {
            console.log(teamArr);
        }
    })
}

module.exports = {
    promptUser,
    teamArr
}

//manager();